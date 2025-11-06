# Graphlit Portal Client SDK

[![npm version](https://badge.fury.io/js/graphlit-portal-client.svg)](https://badge.fury.io/js/graphlit-portal-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official TypeScript/JavaScript SDK for the [Graphlit Platform](https://www.graphlit.com) Control Plane API - programmatically manage your infrastructure, projects, and organization.

## 🚀 What is the Graphlit Portal Client?

The Portal Client SDK enables **infrastructure-as-code** for Graphlit - automate project management, billing, and organization settings through a clean TypeScript/JavaScript API.

**Use Cases:**

- **DevOps Automation** - Create/destroy projects in CI/CD pipelines
- **Multi-tenant Apps** - Provision projects per customer
- **Infrastructure Management** - Manage environments, billing, and quotas
- **Testing** - Spin up ephemeral test projects
- **Monitoring** - Query project status and usage

## ✨ Key Features

- 🏗️ **Project Management** - Full CRUD operations for Graphlit projects
- 💳 **Subscription Control** - Upgrade/downgrade project tiers programmatically
- 🔐 **API Key Auth** - Secure organization-level access with API keys
- 🌍 **Multi-Environment** - Switch between production and development APIs
- 📘 **Full TypeScript** - Auto-generated types from GraphQL schema
- 🔄 **GraphQL Native** - Built on Apollo Client for reliability

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Getting API Keys](#getting-api-keys)
- [Configuration](#configuration)
- [Basic Examples](#basic-examples)
- [API Reference](#api-reference)
  - [Project Operations](#project-operations)
  - [Subscription Management](#subscription-management)
- [Environment Support](#environment-support)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [Related SDKs](#related-sdks)
- [Development](#development)
- [Support](#support)

## Quick Start

Get started in 2 minutes:

```bash
# Install the SDK
npm install graphlit-portal-client

# Set your credentials (from https://portal.graphlit.dev/api-keys)
export GRAPHLIT_API_KEY=glk_live_your_key_here
export GRAPHLIT_ORGANIZATION_ID=your_org_guid_here
```

```typescript
import { GraphlitPortalClient } from "graphlit-portal-client";

// Initialize client (uses env vars automatically)
const client = new GraphlitPortalClient();

// Create a project
const project = await client.createProject({
  name: "My Production App",
  description: "Production environment",
  platform: "AZURE",
  region: "eastus",
});

console.log(`Created project: ${project.createProject?.name}`);
console.log(`Project ID: ${project.createProject?.id}`);
console.log(`Data API: ${project.createProject?.uri}`);
```

## Installation

```bash
npm install graphlit-portal-client
```

**Requirements:**

- Node.js 18.0 or higher
- TypeScript 5.0 or higher (for TypeScript projects)

## Getting API Keys

To use this SDK, you need an organization API key:

1. Go to [Graphlit Portal](https://portal.graphlit.dev)
2. Navigate to your organization → **API Keys**
3. Click **Create API Key**
4. Give it a name (e.g., "CI/CD Pipeline", "Production Server")
5. **Copy the key immediately** - it's shown only once!
6. Store it securely (environment variables, secrets manager, etc.)

**⚠️ Security Note:** API keys have full access to your organization. Treat them like passwords:

- Never commit them to version control
- Use environment variables or secret management
- Rotate keys periodically
- Revoke immediately if compromised

## Configuration

### Option 1: Environment Variables (Recommended)

Create a `.env` file:

```env
# Required
GRAPHLIT_API_KEY=glk_live_your_key_here
GRAPHLIT_ORGANIZATION_ID=your_org_guid_here
```

```typescript
import { GraphlitPortalClient } from "graphlit-portal-client";

const client = new GraphlitPortalClient();
// Automatically uses environment variables
```

### Option 2: Explicit Configuration

```typescript
import { GraphlitPortalClient } from "graphlit-portal-client";

const client = new GraphlitPortalClient({
  apiKey: "glk_live_...",
  organizationId: "your-org-guid",
});
```

### Option 3: Legacy Constructor (Backward Compatible)

```typescript
const client = new GraphlitPortalClient(
  "glk_live_...", // apiKey
  "your-org-guid", // organizationId
  "https://portal.graphlit.io/api/v1/graphql", // portalUri (optional)
);
```

## Basic Examples

### Creating Your First Project

```typescript
import { GraphlitPortalClient } from "graphlit-portal-client";

const client = new GraphlitPortalClient();

const project = await client.createProject({
  name: "Analytics Platform",
  description: "Customer analytics with AI",
  platform: "AZURE", // AZURE, AWS, or GCP
  region: "eastus", // Cloud region
});

console.log("Project created:", project.createProject);
```

### Listing All Projects

```typescript
// Query all projects
const results = await client.queryProjects();

results.projects?.results?.forEach((p) => {
  console.log(`${p.name} (${p.id})`);
  console.log(`  Platform: ${p.platform}`);
  console.log(`  Region: ${p.region}`);
  console.log(`  Data API: ${p.uri}`);
});

// With filtering
const filtered = await client.queryProjects({
  ids: ["project-id-1", "project-id-2"],
});
```

### Getting Project Details

```typescript
const project = await client.getProject("project-id");

console.log("Project:", project.project?.name);
console.log("Created:", project.project?.creationDate);
console.log("Platform:", project.project?.platform);
console.log("State:", project.project?.state);

// Check quota usage
if (project.project?.quota) {
  console.log("Credits:", project.project.quota.credits);
}
```

### Updating a Project

```typescript
await client.updateProject({
  id: "project-id",
  name: "Updated Project Name",
  description: "New description",
});

console.log("Project updated successfully");
```

### Upgrading Project Subscription

```typescript
// Upgrade to Enterprise tier
await client.updateProjectSubscription("project-id", "prod_enterprise_monthly");

console.log("Subscription upgraded to Enterprise");
```

### Deleting a Project

```typescript
await client.deleteProject("project-id");
console.log("Project deleted");
```

## API Reference

### Project Operations

#### `createProject(input: ProjectInput): Promise<CreateProjectMutation>`

Create a new Graphlit project.

**Parameters:**

- `name` (string, required) - Project name
- `description` (string, optional) - Project description
- `platform` (ResourceConnectorTypes, required) - Cloud platform: `AZURE`, `AWS`, or `GCP`
- `region` (string, required) - Cloud region (e.g., `eastus`, `us-west-2`, `europe-west1`)

**Returns:** Created project with `id`, `name`, `uri`, etc.

**Example:**

```typescript
const project = await client.createProject({
  name: "Production App",
  description: "Main production environment",
  platform: "AZURE",
  region: "eastus",
});
```

---

#### `updateProject(input: ProjectUpdateInput): Promise<UpdateProjectMutation>`

Update an existing project's metadata.

**Parameters:**

- `id` (string, required) - Project ID
- `name` (string, optional) - New project name
- `description` (string, optional) - New description

**Example:**

```typescript
await client.updateProject({
  id: "proj_abc123",
  name: "Updated Name",
});
```

---

#### `deleteProject(id: string): Promise<DeleteProjectMutation>`

Permanently delete a project and all its data.

**⚠️ Warning:** This action is irreversible. All environments, data, and configurations will be deleted.

**Parameters:**

- `id` (string, required) - Project ID to delete

**Example:**

```typescript
await client.deleteProject("proj_abc123");
```

---

#### `getProject(id: string): Promise<GetProjectQuery>`

Retrieve detailed information about a specific project.

**Parameters:**

- `id` (string, required) - Project ID

**Returns:** Project details including quota, subscription, and configuration

**Example:**

```typescript
const result = await client.getProject("proj_abc123");
console.log(result.project?.name);
```

---

#### `queryProjects(filter?: ProjectFilter): Promise<QueryProjectsQuery>`

Query projects with optional filtering.

**Parameters:**

- `filter` (ProjectFilter, optional) - Filter criteria
  - `ids` (string[]) - Filter by specific project IDs
  - Additional filters available in schema

**Returns:** Array of projects matching the filter

**Example:**

```typescript
const results = await client.queryProjects({
  ids: ["proj_1", "proj_2"],
});
```

---

### Subscription Management

#### `updateProjectSubscription(id: string, productIdentifier: string): Promise<UpdateProjectSubscriptionMutation>`

Upgrade or change a project's subscription tier.

**Parameters:**

- `id` (string, required) - Project ID
- `productIdentifier` (string, required) - Stripe product identifier (e.g., `prod_starter_monthly`, `prod_enterprise_yearly`)

**Example:**

```typescript
await client.updateProjectSubscription(
  "proj_abc123",
  "prod_enterprise_monthly",
);
```

---

## Environment Support

The SDK supports multiple environments for development, staging, and production workflows.

### Available Endpoints

| Environment              | URL                                             | Use Case                     |
| ------------------------ | ----------------------------------------------- | ---------------------------- |
| **Production** | `https://portal.graphlit.io/api/v1/graphql`     | Live production applications |

### Switching Environments

**Via Constructor:**

```typescript
const devClient = new GraphlitPortalClient({
  apiKey: process.env.GRAPHLIT_API_KEY,
  organizationId: process.env.GRAPHLIT_ORGANIZATION_ID,
  portalUri: "https://portal.graphlit.io/api/v1/graphql",
});
```

**Via Environment Variable:**

```bash
export GRAPHLIT_PORTAL_URI=https://portal.graphlit.io/api/v1/graphql
```

## Error Handling

Handle errors gracefully in your applications:

```typescript
import { GraphlitPortalClient } from "graphlit-portal-client";

const client = new GraphlitPortalClient();

try {
  const project = await client.createProject({
    name: "New Project",
    platform: "AZURE",
    region: "eastus",
  });

  console.log("Success:", project.createProject?.id);
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to create project:", error.message);

    // Check for specific error types
    if (error.message.includes("quota")) {
      console.error("Project quota exceeded");
    } else if (error.message.includes("authentication")) {
      console.error("Invalid API key or organization ID");
    }
  }
}
```

### Common Error Scenarios

| Error                         | Cause                                | Solution                                        |
| ----------------------------- | ------------------------------------ | ----------------------------------------------- |
| `API key is required`         | Missing `GRAPHLIT_API_KEY`           | Set environment variable or pass to constructor |
| `Organization ID is required` | Missing `GRAPHLIT_ORGANIZATION_ID`   | Set environment variable or pass to constructor |
| `Failed to create project`    | Invalid parameters or quota exceeded | Check parameters and organization limits        |
| `Authentication failed`       | Invalid API key                      | Generate new API key in portal                  |
| `Project not found`           | Invalid project ID                   | Verify project ID exists                        |

## TypeScript Support

The SDK is built with TypeScript and provides full type safety:

```typescript
import {
  GraphlitPortalClient,
  ProjectInput,
  ResourceConnectorTypes,
  Project,
} from "graphlit-portal-client";

const client = new GraphlitPortalClient();

// Type-safe project creation
const input: ProjectInput = {
  name: "My Project",
  description: "Description",
  platform: ResourceConnectorTypes.Azure, // Autocomplete available
  region: "eastus",
};

const result = await client.createProject(input);

// Type-safe access to result
const project: Project | null | undefined = result.createProject;
if (project) {
  console.log(project.id); // TypeScript knows these properties exist
  console.log(project.name);
  console.log(project.uri);
}
```

### Available Types

All types are auto-generated from the GraphQL schema:

```typescript
import type {
  // Input types
  ProjectInput,
  ProjectUpdateInput,
  ProjectFilter,

  // Return types
  Project,
  ProjectQuota,
  Subscription,

  // Enums
  ResourceConnectorTypes,
  EntityState,
  SubscriptionStatus,

  // Mutation results
  CreateProjectMutation,
  UpdateProjectMutation,
  DeleteProjectMutation,

  // Query results
  GetProjectQuery,
  QueryProjectsQuery,
} from "graphlit-portal-client";
```

## Related SDKs

The Graphlit Platform has two complementary SDKs:

| SDK                                                                    | Purpose                   | Auth                 | Scope             |
| ---------------------------------------------------------------------- | ------------------------- | -------------------- | ----------------- |
| **`graphlit-portal-client`** (this SDK)                                | Infrastructure management | Organization API key | Organization-wide |
| **[`graphlit-client`](https://www.npmjs.com/package/graphlit-client)** | Data operations & AI      | Project JWT          | Single project    |

### Typical Workflow

1. **Use Portal Client** to provision infrastructure:

   ```typescript
   import { GraphlitPortalClient } from 'graphlit-portal-client';

   const portal = new GraphlitPortalClient();
   const project = await portal.createProject({ ... });
   ```

2. **Use Data Client** for application operations:

   ```typescript
   import { Graphlit } from "graphlit-client";

   const client = new Graphlit({
     organizationId: process.env.GRAPHLIT_ORGANIZATION_ID,
     environmentId: project.productionEnvId,
     jwtSecret: project.jwtSecret,
   });

   // Now ingest content, chat with AI, etc.
   await client.ingestUri({ uri: "https://example.com/doc.pdf" });
   ```

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/graphlit/graphlit-portal-client-typescript.git
cd graphlit-portal-client-typescript

# Install dependencies
npm install

# Generate GraphQL types from schema
npm run generate

# Build the SDK
npm run build

# Format code
npm run format
```

### Project Structure

```
graphlit-portal-client-typescript/
├── src/
│   ├── client.ts                 # Main SDK client
│   ├── documents/                # GraphQL operations
│   │   └── project/
│   │       ├── createProject.graphql
│   │       ├── updateProject.graphql
│   │       └── ...
│   └── generated/                # Auto-generated types
│       ├── graphql-types.ts
│       └── graphql-documents.ts
├── examples/
│   └── basic-usage.ts           # Usage examples
├── dist/                        # Compiled output
├── package.json
├── codegen.yml                  # GraphQL code generation config
└── tsconfig.json
```

### Running Examples

```bash
# Set up environment
cp examples/.env.example .env
# Edit .env with your credentials

# Run example
npx ts-node examples/basic-usage.ts
```

## Support

### Documentation

- 📚 [Graphlit Documentation](https://docs.graphlit.io)
- 🔐 [API Keys Guide](https://docs.graphlit.io/api-keys)
- 🏗️ [Control Plane API Reference](https://docs.graphlit.io/control-plane-api)

### Community & Help

- 💬 [Discord Community](https://discord.gg/graphlit) - Get help from the team and community
- 🐛 [GitHub Issues](https://github.com/graphlit/graphlit-portal-client-typescript/issues) - Report bugs or request features
- 📧 [Email Support](mailto:support@graphlit.com) - Enterprise support

### Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details

---

**Built with ❤️ by [Unstruk Data Inc.](https://www.graphlit.com)**
