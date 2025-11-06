import { GraphlitPortalClient } from "../src/client.js";

async function main() {
  // Initialize client - uses environment variables
  // GRAPHLIT_API_KEY, GRAPHLIT_ORGANIZATION_ID
  const client = new GraphlitPortalClient();

  try {
    // List all projects
    console.log("Fetching all projects...");
    const results = await client.queryProjects();
    const projects = results.projects?.results || [];
    console.log(`Found ${projects.length} projects:`);
    projects.forEach((p) => {
      console.log(`  - ${p.name} (${p.id})`);
    });

    // Create a new project (platform and region are automatically configured)
    console.log("\nCreating new project...");
    const newProject = await client.createProject({
      name: "Test Project",
      description: "Created via SDK",
    });
    console.log(
      `Created project: ${newProject.createProject?.name} (${newProject.createProject?.id})`,
    );

    // Get project details
    if (newProject.createProject?.id) {
      console.log("\nFetching project details...");
      const projectDetails = await client.getProject(
        newProject.createProject.id,
      );
      console.log(`Project: ${projectDetails.project?.name}`);
      console.log(`Platform: ${projectDetails.project?.platform}`);
      console.log(`Region: ${projectDetails.project?.region}`);
      console.log(`URI: ${projectDetails.project?.uri}`);

      // Update project
      console.log("\nUpdating project...");
      await client.updateProject({
        id: newProject.createProject.id,
        name: "Updated Test Project",
        description: "Updated via SDK",
      });
      console.log("Project updated successfully");

      // Delete project
      console.log("\nDeleting project...");
      await client.deleteProject(newProject.createProject.id);
      console.log("Project deleted successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
