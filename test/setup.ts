import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from test/.env
config({ path: resolve(__dirname, ".env") });

// Global test setup
console.log("🔧 Test environment loaded");
console.log(`🔑 API Key: ${process.env.GRAPHLIT_API_KEY?.slice(0, 12)}...`);
console.log(
  `📍 Org ID: ${process.env.GRAPHLIT_ORGANIZATION_ID?.slice(0, 8)}...`,
);
console.log(
  `🌍 Portal URI: ${process.env.GRAPHLIT_PORTAL_URI || "Production"}`,
);
