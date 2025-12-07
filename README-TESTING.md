# API Routes Testing

## Quick Test Script

A comprehensive test script has been created to verify all API routes are working correctly.

### Usage

1. **Start the API server:**
   ```bash
   npm run start:dev
   ```

2. **Run the route tests (in another terminal):**
   ```bash
   npm run test:routes
   ```

3. **Or wait 10 seconds and test automatically:**
   ```bash
   npm run test:routes:wait
   ```

### What it tests

The script tests all major API endpoints:

- **Authentication**: login, register, refresh, logout
- **Users**: CRUD operations, permissions
- **Content**: blog posts, case studies, testimonials, Q&A
- **CRM**: clients, leads, contact inquiries, notes
- **Projects**: projects, tasks, milestones, time tracking
- **HR**: employees, skills management
- **Billing**: invoices, payments
- **Technology**: technology stack management
- **Services**: development plans, features
- **Admin**: roles, permissions management
- **Support**: tickets, messaging

### Output

The script provides:
- ✅/❌ status for each route
- HTTP status codes
- Success rate percentage
- Summary of failed routes
- Status code breakdown

### Expected Results

- **200**: Successful GET requests
- **401**: Unauthorized (expected for protected routes)
- **403**: Forbidden (expected for permission-protected routes)
- **404**: Not found (some routes may not exist)
- **422**: Validation errors (expected for POST requests without proper data)

### File Locations

- Test script: `scripts/test-routes.ts`
- This guide: `README-TESTING.md`

### Notes

- The script uses basic HTTP requests without authentication
- Many routes will return 401/403 which is expected behavior
- File upload routes are tested with basic data (not actual files)
- The script includes a small delay between requests to avoid overwhelming the server