import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client/core/index.js";

import type {
  OperationVariables,
  ApolloQueryResult,
  FetchResult,
  NormalizedCacheObject,
} from "@apollo/client/core/index.js";

import { DocumentNode } from "graphql";
import * as Types from "./generated/graphql-types.js";
import * as Documents from "./generated/graphql-documents.js";

/**
 * Configuration options for the Graphlit Portal Client
 */
export interface GraphlitPortalClientOptions {
  /**
   * Organization API key (glk_live_...)
   * Use this for server-to-server org-scoped access.
   * Requires organizationId to be set.
   */
  apiKey?: string;
  /**
   * Bearer token (e.g., Clerk JWT) for user-scoped access.
   * Use this when authenticating on behalf of a user.
   * Does not require organizationId - user identity comes from the token.
   */
  bearerToken?: string;
  /**
   * Organization GUID (required when using apiKey, not needed for bearerToken)
   */
  organizationId?: string;
  /**
   * Portal API URI
   * - https://portal.graphlit.io/api/v1/graphql
   * Can also be set via GRAPHLIT_PORTAL_URI environment variable
   */
  portalUri?: string;
}

/**
 * Input for creating a new project
 * Platform and region are automatically configured to Azure/South Central US
 */
export type CreateProjectInput = Omit<Types.ProjectInput, 'platform' | 'region'>;

/**
 * Graphlit Portal Client for Control Plane API
 * Manages projects, environments, billing, and organization settings
 */
export class GraphlitPortalClient {
  private client: ApolloClient<NormalizedCacheObject>;
  private portalUri: string;
  private apiKey: string | undefined;
  private bearerToken: string | undefined;
  private organizationId: string | undefined;

  constructor(
    apiKeyOrOptions?: string | GraphlitPortalClientOptions,
    organizationId?: string,
    portalUri?: string,
  ) {
    // Handle both old constructor signature and new options object
    let options: GraphlitPortalClientOptions;
    if (typeof apiKeyOrOptions === "object" && apiKeyOrOptions !== null) {
      // New constructor with options object
      options = apiKeyOrOptions;
    } else {
      // Legacy constructor with individual parameters
      options = {
        apiKey: apiKeyOrOptions as string,
        organizationId,
        portalUri,
      };
    }

    // Set portalUri with fallback chain
    this.portalUri =
      options.portalUri ||
      (typeof process !== "undefined"
        ? process.env.GRAPHLIT_PORTAL_URI
        : undefined) ||
      "https://portal.graphlit.io/api/v1/graphql";

    // Support bearer token for user-scoped auth (e.g., Clerk JWT)
    this.bearerToken = options.bearerToken;

    // Support environment variables for API key credentials
    this.apiKey =
      options.apiKey ||
      (typeof process !== "undefined"
        ? process.env.GRAPHLIT_API_KEY
        : undefined);

    this.organizationId =
      options.organizationId ||
      (typeof process !== "undefined"
        ? process.env.GRAPHLIT_ORGANIZATION_ID
        : undefined);

    // Validate authentication: bearerToken takes precedence over apiKey
    // If both are provided, bearerToken is used
    if (!this.bearerToken && !this.apiKey) {
      throw new Error(
        "Authentication required. Provide either options.bearerToken (for user auth) or options.apiKey (for org auth)",
      );
    }
    // organizationId only required when using apiKey (not bearerToken)
    if (!this.bearerToken && this.apiKey && !this.organizationId) {
      throw new Error(
        "Organization ID is required when using API key. Provide via options.organizationId or GRAPHLIT_ORGANIZATION_ID environment variable",
      );
    }

    // Create HTTP link with auth headers
    const httpLink = createHttpLink({
      uri: this.portalUri,
      fetch,
    });

    // Add auth headers based on auth type
    const authLink = new ApolloLink((operation, forward) => {
      const headers: Record<string, string> = {};

      if (this.bearerToken) {
        // User-scoped auth via bearer token (e.g., Clerk JWT)
        headers["Authorization"] = `Bearer ${this.bearerToken}`;
      } else if (this.apiKey) {
        // Org-scoped auth via API key
        headers["Authorization"] = `Bearer ${this.apiKey}`;
        headers["X-Organization-Id"] = this.organizationId!;
      }

      operation.setContext({ headers });
      return forward(operation);
    });

    this.client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "no-cache",
        },
        mutate: {
          fetchPolicy: "no-cache",
        },
      },
    });
  }

  /**
   * Create a new Graphlit project.
   * Platform is automatically set to Azure and region to South Central US (scus).
   * @param input - Project input with name and optional description
   * @returns Created project details
   */
  public async createProject(
    input: CreateProjectInput,
  ): Promise<Types.CreateProjectMutation> {
    const project: Types.ProjectInput = {
      name: input.name,
      description: input.description,
      platform: Types.ResourceConnectorTypes.Azure,
      region: "southcentralus",
    };

    const result = await this.client.mutate<Types.CreateProjectMutation>({
      mutation: Documents.CreateProject,
      variables: { project },
    });

    if (!result.data) {
      throw new Error("Failed to create project");
    }

    return result.data;
  }

  /**
   * Update an existing project's metadata.
   * @param project - Project update input with id and fields to update
   * @returns Updated project details
   */
  public async updateProject(
    project: Types.ProjectUpdateInput,
  ): Promise<Types.UpdateProjectMutation> {
    const result = await this.client.mutate<Types.UpdateProjectMutation>({
      mutation: Documents.UpdateProject,
      variables: { project },
    });

    if (!result.data) {
      throw new Error("Failed to update project");
    }

    return result.data;
  }

  /**
   * Delete a project and all its data.
   * @param id - Project ID to delete
   * @returns Deleted project details
   */
  public async deleteProject(id: string): Promise<Types.DeleteProjectMutation> {
    const result = await this.client.mutate<Types.DeleteProjectMutation>({
      mutation: Documents.DeleteProject,
      variables: { id },
    });

    if (!result.data) {
      throw new Error("Failed to delete project");
    }

    return result.data;
  }

  /**
   * Get a specific project by ID.
   * @param id - Project ID
   * @returns Project details including quota and subscription
   */
  public async getProject(id: string): Promise<Types.GetProjectQuery> {
    const result = await this.client.query<Types.GetProjectQuery>({
      query: Documents.GetProject,
      variables: { id },
    });

    if (!result.data) {
      throw new Error("Failed to get project");
    }

    if (!result.data.project) {
      throw new Error(`Project not found: ${id}`);
    }

    return result.data;
  }

  /**
   * Query projects with optional filters.
   * @param filter - Optional filter criteria
   * @returns Projects matching the filter
   */
  public async queryProjects(
    filter?: Types.ProjectFilter,
  ): Promise<Types.QueryProjectsQuery> {
    const result = await this.client.query<Types.QueryProjectsQuery>({
      query: Documents.QueryProjects,
      variables: { filter },
    });

    if (!result.data) {
      throw new Error("Failed to query projects");
    }

    return result.data;
  }

  /**
   * Get project invoices including upcoming invoice with line items.
   * Use this to get billing-period credit usage from upcomingInvoice.lines.
   * @param id - Project ID
   * @returns Project invoices and upcoming invoice details
   */
  public async getProjectInvoices(
    id: string,
  ): Promise<Types.GetProjectInvoicesQuery> {
    const result = await this.client.query<Types.GetProjectInvoicesQuery>({
      query: Documents.GetProjectInvoices,
      variables: { id },
    });

    if (!result.data) {
      throw new Error("Failed to get project invoices");
    }

    if (!result.data.project) {
      throw new Error(`Project not found: ${id}`);
    }

    return result.data;
  }

  /**
   * Update a project's subscription tier.
   * @param id - Project ID
   * @param productIdentifier - Stripe product identifier
   * @returns Updated project with new subscription
   */
  public async updateProjectSubscription(
    id: string,
    productIdentifier: string,
  ): Promise<Types.UpdateProjectSubscriptionMutation> {
    const result =
      await this.client.mutate<Types.UpdateProjectSubscriptionMutation>({
        mutation: Documents.UpdateProjectSubscription,
        variables: { id, productIdentifier },
      });

    if (!result.data) {
      throw new Error("Failed to update project subscription");
    }

    return result.data;
  }
}

// Export types for consumers
export * from "./generated/graphql-types.js";
