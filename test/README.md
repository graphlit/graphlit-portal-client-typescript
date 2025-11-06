# Portal Client SDK Tests

Integration tests for the Graphlit Portal Client SDK.

## Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials:

   ```env
   GRAPHLIT_API_KEY=glk_live_your_key
   GRAPHLIT_ORGANIZATION_ID=your_org_guid
   ```

3. Get your credentials from [Graphlit Portal](https://portal.graphlit.dev/api-keys)

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test project-operations
```

## What's Tested

### Project Operations (`project-operations.test.ts`)

- ✅ Create project
- ✅ Query all projects
- ✅ Get project by ID
- ✅ Update project
- ✅ Query with filters
- ✅ Delete project
- ✅ Error handling

## Test Behavior

- Tests run **sequentially** (not in parallel) to avoid race conditions
- All created projects are **automatically cleaned up** after tests
- Tests use **real API calls** to the Control Plane API
- Timeout set to 120 seconds per test
- ⏳ **Be patient** - project creation and deletion take 30-60s each (provisions/cleans up cloud resources)

## Environment Variables

| Variable                   | Required | Description                           |
| -------------------------- | -------- | ------------------------------------- |
| `GRAPHLIT_API_KEY`         | Yes      | Organization API key from portal      |
| `GRAPHLIT_ORGANIZATION_ID` | Yes      | Organization GUID                     |
| `GRAPHLIT_PORTAL_URI`      | No       | API endpoint (defaults to production) |

## Notes

⚠️ **Warning**: Tests will create and delete real projects in your organization.
