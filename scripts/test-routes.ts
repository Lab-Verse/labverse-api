import * as http from 'http';

interface TestResult {
  route: string;
  method: string;
  status: number;
  success: boolean;
  error?: string;
}

class RoutesTester {
  private baseUrl: string = 'http://localhost:3000';
  private results: TestResult[] = [];

  private makeRequest(method: string, path: string, data?: any): Promise<TestResult> {
    return new Promise((resolve) => {
      const postData = data ? JSON.stringify(data) : '';
      
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          resolve({
            route: path,
            method,
            status: res.statusCode || 0,
            success: (res.statusCode || 0) < 500
          });
        });
      });

      req.on('error', (error) => {
        resolve({
          route: path,
          method,
          status: 0,
          success: false,
          error: error.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          route: path,
          method,
          status: 0,
          success: false,
          error: 'Timeout'
        });
      });

      if (postData) req.write(postData);
      req.end();
    });
  }

  async testAllRoutes(): Promise<void> {
    console.log('🚀 Testing API Routes...\n');

    const routes = [
      // Basic
      { method: 'GET', path: '/' },
      
      // Auth
      { method: 'POST', path: '/auth/login', data: { email: 'test@test.com', password: 'test' } },
      { method: 'POST', path: '/auth/register', data: { email: 'test@test.com', password: 'Password123', fullName: 'Test User' } },
      { method: 'POST', path: '/auth/refresh', data: { refreshToken: 'test-token' } },
      { method: 'POST', path: '/auth/logout', data: { refreshToken: 'test-token' } },
      { method: 'POST', path: '/auth/password-forgot', data: { email: 'test@test.com' } },
      
      // Users
      { method: 'GET', path: '/users' },
      { method: 'POST', path: '/users', data: { email: 'new@test.com', password: 'Password123', fullName: 'New User' } },
      { method: 'GET', path: '/users/available-features' },
      
      // Content - Categories
      { method: 'GET', path: '/categories' },
      { method: 'POST', path: '/categories', data: { name: 'Test Category', description: 'Test description' } },
      
      // Content - Blog Posts
      { method: 'GET', path: '/blog-posts' },
      { method: 'POST', path: '/blog-posts', data: { title: 'Test Post', slug: 'test-post', content: 'Test content' } },
      
      // Content - Case Studies
      { method: 'GET', path: '/case-studies' },
      { method: 'POST', path: '/case-studies', data: { title: 'Test Case', slug: 'test-case', challenge: 'Test', solution: 'Test', results: 'Test' } },
      
      // Content - Testimonials
      { method: 'GET', path: '/testimonials' },
      { method: 'POST', path: '/testimonials', data: { clientName: 'Test Client', content: 'Great!', rating: 5 } },
      
      // Content - Q&A
      { method: 'GET', path: '/questions' },
      { method: 'POST', path: '/questions', data: { title: 'Test Question', content: 'What is this?' } },
      { method: 'GET', path: '/answers' },
      { method: 'POST', path: '/answers', data: { content: 'Test answer', questionId: 'test-id' } },
      
      // CRM - Clients
      { method: 'GET', path: '/clients' },
      { method: 'POST', path: '/clients', data: { companyName: 'Test Co', email: 'client@test.com', phone: '123456789' } },
      
      // CRM - Leads
      { method: 'GET', path: '/leads' },
      { method: 'POST', path: '/leads', data: { name: 'Test Lead', email: 'lead@test.com', source: 'Website' } },
      
      // CRM - Contact Inquiries
      { method: 'GET', path: '/contact-inquiries' },
      { method: 'POST', path: '/contact-inquiries', data: { name: 'Test Contact', email: 'contact@test.com', message: 'Hello' } },
      
      // CRM - Other
      { method: 'GET', path: '/client-notes' },
      { method: 'POST', path: '/client-notes', data: { clientId: 'test-id', content: 'Test note' } },
      { method: 'GET', path: '/client-interactions' },
      { method: 'POST', path: '/client-interactions', data: { clientId: 'test-id', type: 'call', notes: 'Test' } },
      { method: 'GET', path: '/client-approvals' },
      { method: 'POST', path: '/client-approvals', data: { clientId: 'test-id', projectId: 'test-id', status: 'pending' } },
      
      // Projects
      { method: 'GET', path: '/projects' },
      { method: 'POST', path: '/projects', data: { name: 'Test Project', description: 'Test project description' } },
      { method: 'GET', path: '/tasks' },
      { method: 'POST', path: '/tasks', data: { title: 'Test Task', description: 'Test desc', status: 'pending' } },
      { method: 'GET', path: '/project-members' },
      { method: 'POST', path: '/project-members', data: { projectId: 'test-id', userId: 'test-id', role: 'developer' } },
      { method: 'GET', path: '/project-milestones' },
      { method: 'POST', path: '/project-milestones', data: { projectId: 'test-id', title: 'Test Milestone', dueDate: '2024-12-31' } },
      { method: 'GET', path: '/project-updates' },
      { method: 'POST', path: '/project-updates', data: { projectId: 'test-id', title: 'Update', content: 'Progress update' } },

      { method: 'GET', path: '/task-comments' },
      { method: 'POST', path: '/task-comments', data: { taskId: 'test-id', content: 'Test comment' } },
      { method: 'GET', path: '/project-technologies' },
      { method: 'POST', path: '/project-technologies', data: { projectId: 'test-id', technologyId: 'test-id' } },
      
      // HR
      { method: 'GET', path: '/employee-profiles' },
      { method: 'POST', path: '/employee-profiles', data: { firstName: 'Test', lastName: 'Employee', email: 'emp@test.com' } },
      { method: 'GET', path: '/skills' },
      { method: 'POST', path: '/skills', data: { name: 'JavaScript', category: 'Programming' } },
      { method: 'GET', path: '/employee-skills' },
      { method: 'POST', path: '/employee-skills', data: { employeeId: 'test-id', skillId: 'test-id', level: 'intermediate' } },
      
      // Billing
      { method: 'GET', path: '/invoices' },
      { method: 'POST', path: '/invoices', data: { clientId: 'test-id', amount: 1000, dueDate: '2024-12-31' } },
      { method: 'GET', path: '/invoice-items' },
      { method: 'POST', path: '/invoice-items', data: { invoiceId: 'test-id', description: 'Service', amount: 500 } },
      { method: 'GET', path: '/payments' },
      { method: 'POST', path: '/payments', data: { invoiceId: 'test-id', amount: 1000, method: 'credit_card' } },
      
      // Technology
      { method: 'GET', path: '/technologies' },
      { method: 'POST', path: '/technologies', data: { name: 'React', category: 'Frontend', description: 'JS Library' } },
      
      // Services
      { method: 'GET', path: '/services' },
      { method: 'POST', path: '/services', data: { name: 'Web Development', description: 'Custom web apps', price: 5000 } },
      { method: 'GET', path: '/plan-features' },
      { method: 'POST', path: '/plan-features', data: { name: 'Custom Design', description: 'Unique design' } },
      { method: 'GET', path: '/development-plans' },
      { method: 'POST', path: '/development-plans', data: { name: 'Starter Plan', description: 'Basic plan', price: 1000 } },
      { method: 'GET', path: '/development-plan-features' },
      { method: 'POST', path: '/development-plan-features', data: { planId: 'test-id', featureId: 'test-id' } },
      { method: 'GET', path: '/development-plan-services' },
      { method: 'POST', path: '/development-plan-services', data: { planId: 'test-id', serviceId: 'test-id' } },
      { method: 'GET', path: '/development-plan-technologies' },
      { method: 'POST', path: '/development-plan-technologies', data: { planId: 'test-id', technologyId: 'test-id' } },
      { method: 'GET', path: '/client-plan-quotations' },
      { method: 'POST', path: '/client-plan-quotations', data: { clientId: 'test-id', planId: 'test-id', totalPrice: 5000 } },
      
      // Admin
      { method: 'GET', path: '/roles' },
      { method: 'POST', path: '/roles', data: { name: 'Test Role', description: 'Test role desc' } },
      { method: 'GET', path: '/permissions' },
      { method: 'POST', path: '/permissions', data: { name: 'test.create', description: 'Test permission' } },
      { method: 'GET', path: '/role-permissions/test-role-id' },
      { method: 'POST', path: '/role-permissions/test-role-id', data: { permissionIds: ['test-permission-id'] } },
      
      // Support
      { method: 'GET', path: '/support-tickets' },
      { method: 'POST', path: '/support-tickets', data: { title: 'Test Ticket', description: 'Need help', priority: 'medium' } },
      { method: 'POST', path: '/messaging/conversations', data: { title: 'Test Chat', participantUserIds: ['test-id'] } },
      { method: 'POST', path: '/messaging/messages', data: { conversationId: 'test-id', senderId: 'test-id', content: 'Hello' } }
    ];

    for (const route of routes) {
      const result = await this.makeRequest(route.method, route.path, route.data);
      this.results.push(result);
      
      const icon = result.success ? '✅' : '❌';
      const status = result.status === 0 ? 'ERROR' : result.status.toString();
      console.log(`${icon} ${route.method.padEnd(4)} ${route.path.padEnd(35)} - ${status}`);
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    this.showSummary();
  }

  private showSummary(): void {
    console.log('\n📊 Summary:');
    console.log('===========');
    
    const total = this.results.length;
    const success = this.results.filter(r => r.success).length;
    const failed = total - success;
    
    console.log(`Total: ${total}`);
    console.log(`✅ Success: ${success}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Rate: ${((success / total) * 100).toFixed(1)}%`);
    
    const statusCounts: { [key: string]: number } = {};
    this.results.forEach(r => {
      const status = r.status === 0 ? 'ERROR' : r.status.toString();
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    console.log('\nStatus Codes:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
    
    const failedRoutes = this.results.filter(r => !r.success);
    const errorRoutes = this.results.filter(r => r.status === 404 || r.status === 400);
    
    if (errorRoutes.length > 0) {
      console.log('\n🔍 Routes needing attention:');
      errorRoutes.forEach(r => {
        console.log(`  ${r.status === 404 ? '🚫' : '⚠️ '} ${r.method} ${r.route} - ${r.status}`);
      });
    }
    
    if (failedRoutes.length > 0) {
      console.log('\n❌ Failed:');
      failedRoutes.forEach(r => {
        console.log(`  ${r.method} ${r.route} - ${r.error || r.status}`);
      });
    }
  }
}

new RoutesTester().testAllRoutes().catch(console.error);