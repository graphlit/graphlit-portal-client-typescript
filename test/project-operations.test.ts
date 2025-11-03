import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { GraphlitPortalClient } from "../src/client";
import * as Types from "../src/generated/graphql-types";

/**
 * Integration test for project operations
 *
 * Tests CRUD operations on projects to ensure the SDK works correctly
 * with the Control Plane API
 */
describe("Project Operations Integration Tests", () => {
  const apiKey = process.env.GRAPHLIT_API_KEY;
  const organizationId = process.env.GRAPHLIT_ORGANIZATION_ID;
  const portalUri = process.env.GRAPHLIT_PORTAL_URI;

  if (!apiKey || !organizationId) {
    console.warn(
      "⚠️  Skipping project tests - missing GRAPHLIT_API_KEY or GRAPHLIT_ORGANIZATION_ID",
    );
    return;
  }

  let client: GraphlitPortalClient;
  const createdProjectIds: string[] = [];

  beforeAll(() => {
    client = new GraphlitPortalClient({
      apiKey,
      organizationId,
      portalUri,
    });
    console.log("✅ GraphlitPortalClient initialized");
  });

  afterAll(async () => {
    // Clean up created projects
    if (createdProjectIds.length > 0) {
      console.log(
        `\n🧹 Cleaning up ${createdProjectIds.length} test projects (may take several minutes)...`,
      );
      let cleanupCount = 0;
      for (const projectId of createdProjectIds) {
        try {
          console.log(`  ⏳ Deleting project ${projectId}...`);
          await client.deleteProject(projectId);
          cleanupCount++;
          console.log(`  ✅ Deleted project ${projectId}`);
        } catch (error) {
          console.warn(`  ⚠️  Failed to delete project ${projectId}`);
        }
      }
      console.log(
        `✅ Successfully cleaned up ${cleanupCount}/${createdProjectIds.length} projects\n`,
      );
    }
  });

  it("should create a new project", async () => {
    console.log(
      "⏳ Creating project (may take 30-60s for cloud provisioning)...",
    );

    const projectInput: Types.ProjectInput = {
      name: `Test Project ${Date.now()}`,
      description: "Created by vitest integration test",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "eastus",
    };

    const result = await client.createProject(projectInput);

    expect(result.createProject).toBeDefined();
    expect(result.createProject?.name).toBe(projectInput.name);
    expect(result.createProject?.description).toBe(projectInput.description);
    expect(result.createProject?.platform).toBe(projectInput.platform);
    expect(result.createProject?.region).toBe(projectInput.region);
    expect(result.createProject?.id).toBeDefined();

    // Track for cleanup
    if (result.createProject?.id) {
      createdProjectIds.push(result.createProject.id);
    }

    console.log(
      `✅ Created project: ${result.createProject?.name} (${result.createProject?.id})`,
    );
  });

  it("should query all projects", async () => {
    const result = await client.queryProjects();

    expect(result.projects).toBeDefined();
    expect(result.projects?.results).toBeDefined();
    expect(Array.isArray(result.projects?.results)).toBe(true);

    const projectCount = result.projects?.results?.length || 0;
    console.log(`✅ Found ${projectCount} projects in organization`);
  });

  it("should get a specific project by ID", async () => {
    console.log("⏳ Creating project for get test...");

    // First create a project
    const createResult = await client.createProject({
      name: `Get Test Project ${Date.now()}`,
      description: "For testing getProject",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "westus",
    });

    expect(createResult.createProject?.id).toBeDefined();
    const projectId = createResult.createProject!.id;
    createdProjectIds.push(projectId);

    // Now get it
    const getResult = await client.getProject(projectId);

    expect(getResult.project).toBeDefined();
    expect(getResult.project?.id).toBe(projectId);
    expect(getResult.project?.name).toBe(createResult.createProject?.name);
    expect(getResult.project?.owner).toBeDefined();
    expect(getResult.project?.creationDate).toBeDefined();

    console.log(`✅ Retrieved project: ${getResult.project?.name}`);
  });

  it("should update a project", async () => {
    console.log("⏳ Creating project for update test...");

    // Create a project
    const createResult = await client.createProject({
      name: `Update Test ${Date.now()}`,
      description: "Original description",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "centralus",
    });

    expect(createResult.createProject?.id).toBeDefined();
    const projectId = createResult.createProject!.id;
    createdProjectIds.push(projectId);

    // Update it
    const updatedName = `Updated Project ${Date.now()}`;
    const updatedDescription = "Updated description";

    const updateResult = await client.updateProject({
      id: projectId,
      name: updatedName,
      description: updatedDescription,
    });

    expect(updateResult.updateProject).toBeDefined();
    expect(updateResult.updateProject?.id).toBe(projectId);
    expect(updateResult.updateProject?.name).toBe(updatedName);
    expect(updateResult.updateProject?.description).toBe(updatedDescription);

    console.log(`✅ Updated project: ${updateResult.updateProject?.name}`);
  });

  it("should query projects with filter", async () => {
    console.log(
      "⏳ Creating 2 projects for filter test (may take up to 2 minutes)...",
    );

    // Create two projects
    const project1 = await client.createProject({
      name: `Filter Test 1 ${Date.now()}`,
      description: "First test project",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "eastus2",
    });

    const project2 = await client.createProject({
      name: `Filter Test 2 ${Date.now()}`,
      description: "Second test project",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "westus2",
    });

    expect(project1.createProject?.id).toBeDefined();
    expect(project2.createProject?.id).toBeDefined();

    const id1 = project1.createProject!.id;
    const id2 = project2.createProject!.id;
    createdProjectIds.push(id1, id2);

    // Query with filter
    const result = await client.queryProjects({
      ids: [id1, id2],
    });

    expect(result.projects?.results).toBeDefined();
    expect(result.projects?.results?.length).toBe(2);

    const returnedIds = result.projects?.results?.map((p) => p.id) || [];
    expect(returnedIds).toContain(id1);
    expect(returnedIds).toContain(id2);

    console.log(
      `✅ Filtered query returned ${result.projects?.results?.length} projects`,
    );
  });

  it("should delete a project", async () => {
    console.log("⏳ Creating project for delete test...");

    // Create a project
    const createResult = await client.createProject({
      name: `Delete Test ${Date.now()}`,
      description: "Will be deleted",
      platform: Types.ResourceConnectorTypes.Azure,
      region: "southcentralus",
    });

    expect(createResult.createProject?.id).toBeDefined();
    const projectId = createResult.createProject!.id;

    // Delete it
    console.log(
      "⏳ Deleting project (may take 30-60s to clean up cloud resources)...",
    );
    const deleteResult = await client.deleteProject(projectId);

    expect(deleteResult.deleteProject).toBeDefined();
    expect(deleteResult.deleteProject?.id).toBe(projectId);
    expect(deleteResult.deleteProject?.state).toBe(Types.EntityState.Deleting);

    console.log(`✅ Deleted project: ${deleteResult.deleteProject?.id}`);

    // Remove from cleanup list since already deleted
    const index = createdProjectIds.indexOf(projectId);
    if (index > -1) {
      createdProjectIds.splice(index, 1);
    }
  });

  it("should handle errors for invalid project ID", async () => {
    const invalidId = "invalid-project-id-12345";

    await expect(async () => {
      await client.getProject(invalidId);
    }).rejects.toThrow();

    console.log(`✅ Correctly threw error for invalid project ID`);
  });
});
