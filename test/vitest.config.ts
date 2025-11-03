import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./setup.ts"],
    include: ["**/*.test.ts"],
    exclude: [
      "node_modules",
      "../dist",
      "../src/generated",
      "**/node_modules/**",
    ],
    testTimeout: 120000, // 120 seconds for real API calls (project provisioning takes 30-60s)
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "../src",
    },
  },
});
