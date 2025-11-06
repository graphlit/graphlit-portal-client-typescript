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
  let sharedProject: Types.CreateProjectMutation["createProject"];

  beforeAll(async () => {
    client = new GraphlitPortalClient({
      apiKey,
      organizationId,
      portalUri,
    });
    console.log("✅ GraphlitPortalClient initialized");

    // Create one shared project for most tests
    console.log(
      "⏳ Creating shared test project (may take 30-60s for cloud provisioning)...",
    );
    const result = await client.createProject({
      name: `Shared Test Project ${Date.now()}`,
      description: "Shared project for integration tests",
    });
    sharedProject = result.createProject;
    if (sharedProject?.id) {
      createdProjectIds.push(sharedProject.id);
      console.log(`✅ Created shared project: ${sharedProject.id}`);
    }
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

    const projectName = `Test Project ${Date.now()}`;
    const projectDescription = "Created by vitest integration test";

    const result = await client.createProject({
      name: projectName,
      description: projectDescription,
    });

    expect(result.createProject).toBeDefined();
    expect(result.createProject?.name).toBe(projectName);
    expect(result.createProject?.description).toBe(projectDescription);
    expect(result.createProject?.platform).toBe(Types.ResourceConnectorTypes.Azure);
    expect(result.createProject?.region).toBe("southcentralus");
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
    expect(sharedProject?.id).toBeDefined();
    const projectId = sharedProject!.id;

    const getResult = await client.getProject(projectId);

    expect(getResult.project).toBeDefined();
    expect(getResult.project?.id).toBe(projectId);
    expect(getResult.project?.name).toBe(sharedProject?.name);
    expect(getResult.project?.owner).toBeDefined();
    expect(getResult.project?.creationDate).toBeDefined();

    console.log(`✅ Retrieved project: ${getResult.project?.name}`);
  });

  it("should update a project", async () => {
    expect(sharedProject?.id).toBeDefined();
    const projectId = sharedProject!.id;

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
    // Create a dedicated project for filtering tests (not the shared one that gets updated)
    const filterProjectName = `Filter Test Project ${Date.now()}`;
    const createResult = await client.createProject({
      name: filterProjectName,
      description: "Project for filter testing",
    });

    expect(createResult.createProject?.id).toBeDefined();
    const projectId = createResult.createProject!.id;
    createdProjectIds.push(projectId);

    // Query with name filter (fuzzy matching - may return multiple results)
    const resultByName = await client.queryProjects({
      name: filterProjectName,
    });

    expect(resultByName.projects?.results).toBeDefined();
    const foundByName = resultByName.projects?.results?.find(
      (p) => p.id === projectId,
    );
    expect(foundByName).toBeDefined();
    expect(foundByName?.name).toBe(filterProjectName);

    console.log(
      `✅ Name filter returned ${resultByName.projects?.results?.length} projects, found our project: ${foundByName?.name}`,
    );

    // Query with search filter (partial match - fuzzy, may return multiple results)
    const searchTerm = "Filter Test";
    const resultBySearch = await client.queryProjects({
      search: searchTerm,
    });

    expect(resultBySearch.projects?.results).toBeDefined();
    expect(resultBySearch.projects?.results!.length).toBeGreaterThan(0);
    const foundBySearch = resultBySearch.projects?.results?.find(
      (p) => p.id === projectId,
    );
    expect(foundBySearch).toBeDefined();

    console.log(
      `✅ Search by '${searchTerm}' found ${resultBySearch.projects?.results?.length} projects including ours`,
    );
  });

  it("should delete a project", async () => {
    console.log("⏳ Creating project for delete test...");

    // Create a project
    const createResult = await client.createProject({
      name: `Delete Test ${Date.now()}`,
      description: "Will be deleted",
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
    // State will transition during deletion, just verify it's defined
    expect(deleteResult.deleteProject?.state).toBeDefined();

    console.log(`✅ Deleted project: ${deleteResult.deleteProject?.id} (state: ${deleteResult.deleteProject?.state})`);

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
