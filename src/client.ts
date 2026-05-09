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
   * Creates a project.
   * Platform is automatically set to Azure and region to South Central US (scus).
   * @param input - The properties for the new project (name and optional description)
   * @returns The created project
   */
  public async createProject(
    input: CreateProjectInput,
  ): Promise<Types.CreateProjectMutation> {
    const project: Types.ProjectInput = {
      name: input.name,
      description: input.description,
      platform: Types.ResourceConnectorTypes.Azure,
      region: "southcentralus",
      quota: input.quota,
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
   * Updates a project.
   * @param project - The updated properties for the project
   * @returns The updated project
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
   * Deletes a project.
   * @param id - The ID of the project
   * @returns The deleted project
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
   * Lookup a project given its ID.
   * @param id - ID of the project
   * @returns The project
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
   * Retrieves projects based on the provided filter criteria.
   * @param filter - The filter criteria to apply when retrieving projects
   * @returns The project results
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
   * Creates a service client for an environment.
   * @param id - The ID of the environment
   * @param input - The properties for the new service client
   * @returns The updated environment
   */
  public async createServiceClient(
    id: string,
    input: Types.ServiceClientInput,
  ): Promise<Types.CreateServiceClientMutation> {
    const result = await this.client.mutate<Types.CreateServiceClientMutation>({
      mutation: Documents.CreateServiceClient,
      variables: { id, input },
    });

    if (!result.data) {
      throw new Error("Failed to create service client");
    }

    return result.data;
  }

  /**
   * Updates a service client for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @param input - The updated service client properties
   * @returns The updated environment
   */
  public async updateServiceClient(
    id: string,
    clientId: string,
    input: Types.ServiceClientUpdateInput,
  ): Promise<Types.UpdateServiceClientMutation> {
    const result = await this.client.mutate<Types.UpdateServiceClientMutation>({
      mutation: Documents.UpdateServiceClient,
      variables: { id, clientId, input },
    });

    if (!result.data) {
      throw new Error("Failed to update service client");
    }

    return result.data;
  }

  /**
   * Enables a service client for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @returns The updated environment
   */
  public async enableServiceClient(
    id: string,
    clientId: string,
  ): Promise<Types.EnableServiceClientMutation> {
    const result = await this.client.mutate<Types.EnableServiceClientMutation>({
      mutation: Documents.EnableServiceClient,
      variables: { id, clientId },
    });

    if (!result.data) {
      throw new Error("Failed to enable service client");
    }

    return result.data;
  }

  /**
   * Disables a service client for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @returns The updated environment
   */
  public async disableServiceClient(
    id: string,
    clientId: string,
  ): Promise<Types.DisableServiceClientMutation> {
    const result = await this.client.mutate<Types.DisableServiceClientMutation>({
      mutation: Documents.DisableServiceClient,
      variables: { id, clientId },
    });

    if (!result.data) {
      throw new Error("Failed to disable service client");
    }

    return result.data;
  }

  /**
   * Revokes a service client for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @returns The updated environment
   */
  public async revokeServiceClient(
    id: string,
    clientId: string,
  ): Promise<Types.RevokeServiceClientMutation> {
    const result = await this.client.mutate<Types.RevokeServiceClientMutation>({
      mutation: Documents.RevokeServiceClient,
      variables: { id, clientId },
    });

    if (!result.data) {
      throw new Error("Failed to revoke service client");
    }

    return result.data;
  }

  /**
   * Adds a key to a service client for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @param key - The public key to add
   * @returns The updated environment
   */
  public async addServiceClientKey(
    id: string,
    clientId: string,
    key: Types.ServiceClientKeyInput,
  ): Promise<Types.AddServiceClientKeyMutation> {
    const result = await this.client.mutate<Types.AddServiceClientKeyMutation>({
      mutation: Documents.AddServiceClientKey,
      variables: { id, clientId, key },
    });

    if (!result.data) {
      throw new Error("Failed to add service client key");
    }

    return result.data;
  }

  /**
   * Enables a service client key for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @param kid - The key identifier
   * @returns The updated environment
   */
  public async enableServiceClientKey(
    id: string,
    clientId: string,
    kid: string,
  ): Promise<Types.EnableServiceClientKeyMutation> {
    const result =
      await this.client.mutate<Types.EnableServiceClientKeyMutation>({
        mutation: Documents.EnableServiceClientKey,
        variables: { id, clientId, kid },
      });

    if (!result.data) {
      throw new Error("Failed to enable service client key");
    }

    return result.data;
  }

  /**
   * Disables a service client key for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @param kid - The key identifier
   * @returns The updated environment
   */
  public async disableServiceClientKey(
    id: string,
    clientId: string,
    kid: string,
  ): Promise<Types.DisableServiceClientKeyMutation> {
    const result =
      await this.client.mutate<Types.DisableServiceClientKeyMutation>({
        mutation: Documents.DisableServiceClientKey,
        variables: { id, clientId, kid },
      });

    if (!result.data) {
      throw new Error("Failed to disable service client key");
    }

    return result.data;
  }

  /**
   * Revokes a service client key for an environment.
   * @param id - The ID of the environment
   * @param clientId - The service client identifier
   * @param kid - The key identifier
   * @returns The updated environment
   */
  public async revokeServiceClientKey(
    id: string,
    clientId: string,
    kid: string,
  ): Promise<Types.RevokeServiceClientKeyMutation> {
    const result =
      await this.client.mutate<Types.RevokeServiceClientKeyMutation>({
        mutation: Documents.RevokeServiceClientKey,
        variables: { id, clientId, kid },
      });

    if (!result.data) {
      throw new Error("Failed to revoke service client key");
    }

    return result.data;
  }

  /**
   * Lookup a project given its ID, including subscription invoices and upcoming invoice.
   * @param id - ID of the project
   * @returns The project with invoices
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
   * Updates a project subscription.
   * @param id - The ID of the project
   * @param productIdentifier - The Stripe product identifier
   * @returns The updated project
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

  /**
     * Updates a project subscription to Pay As You Go.
     * @param id - The ID of the project
     * @returns The updated project
     */
  public async upgradePayAsYouGo(
    id: string,
  ): Promise<Types.UpgradePayAsYouGoMutation> {
    const result =
      await this.client.mutate<Types.UpgradePayAsYouGoMutation>({
        mutation: Documents.UpgradePayAsYouGo,
        variables: { id },
      });

    if (!result.data) {
      throw new Error("Failed to upgrade project to Pay As You Go");
    }

    return result.data;
  }

  /**
   * Fetch logged-in organization.
   * @returns The organization
   */
  public async getOrganization(): Promise<Types.GetOrganizationQuery> {
    const result = await this.client.query<Types.GetOrganizationQuery>({
      query: Documents.GetOrganization,
    });

    if (!result.data) {
      throw new Error("Failed to get organization");
    }

    if (!result.data.organization) {
      throw new Error("Organization not found");
    }

    return result.data;
  }
}

// Export types for consumers
export * from "./generated/graphql-types.js";
