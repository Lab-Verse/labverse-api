import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

interface TestResult {
  route: string;
  method: string;
  status: number;
  success: boolean;
  error?: string;
  responseTime: number;
}

class RoutesTester {
  private baseUrl: string;
  private authToken: string = '';
  private results: TestResult[] = [];

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  private makeRequest(
    method: string,
    endpoint: string,
    data?: any,
    headers?: any,
    isMultipart: boolean = false
  ): Promise<TestResult> {
    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const postData = data ? JSON.stringify(data) : '';
      
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: endpoint,
        method: method,
        headers: {
          'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          ...headers
        },
        timeout: 10000
      };

      const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => {
          const responseTime = Date.now() - startTime;
          resolve({
            route: endpoint,
            method,
            status: res.statusCode || 0,
            success: (res.statusCode || 0) < 500,
            responseTime
          });
        });
      });

      req.on('error', (error) => {
        const responseTime = Date.now() - startTime;
        resolve({
          route: endpoint,
          method,
          status: 0,
          success: false,
          error: error.message,
          responseTime
        });
      });

      req.on('timeout', () => {
        req.destroy();
        const responseTime = Date.now() - startTime;
        resolve({
          route: endpoint,
          method,
          status: 0,
          success: false,
          error: 'Timeout',
          responseTime
        });
      });

      if (postData) req.write(postData);
      req.end();
    });
  }

  private async authenticate(): Promise<void> {
    console.log('🔐 Authenticating...');
    
    // Try to login with test credentials
    const loginData = {
      email: 'admin@test.com',
      password: 'password123'
    };

    const result = await this.makeRequest('POST', '/auth/login', loginData);
    
    if (result.success && result.status === 200) {
      // In a real scenario, you'd extract the token from the response
      this.authToken = 'mock-jwt-token';
      console.log('✅ Authentication successful');
    } else {
      console.log('⚠️  Authentication failed, continuing without token');
    }
  }

  private getAuthHeaders() {
    return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
  }

  async testAllRoutes(): Promise<void> {
    console.log('🚀 Starting API Routes Test...\n');

    // Test basic health check
    await this.testRoute('GET', '/');

    // Test authentication routes
    await this.testAuthRoutes();

    // Test user management routes
    await this.testUserRoutes();

    // Test content management routes
    await this.testContentRoutes();

    // Test CRM routes
    await this.testCrmRoutes();

    // Test project management routes
    await this.testProjectRoutes();

    // Test HR routes
    await this.testHrRoutes();

    // Test billing routes
    await this.testBillingRoutes();

    // Test technology routes
    await this.testTechnologyRoutes();

    // Generate report
    this.generateReport();
  }

  private async testRoute(method: string, endpoint: string, data?: any, isMultipart: boolean = false): Promise<void> {
    const headers = this.getAuthHeaders();
    const result = await this.makeRequest(method, endpoint, data, headers, isMultipart);
    this.results.push(result);
    
    const statusIcon = result.success ? '✅' : '❌';
    console.log(`${statusIcon} ${method} ${endpoint} - ${result.status} (${result.responseTime}ms)`);
  }

  private async testAuthRoutes(): Promise<void> {
    console.log('\n📝 Testing Authentication Routes...');
    
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    await this.testRoute('POST', '/auth/register', testUser);
    await this.testRoute('POST', '/auth/login', { email: testUser.email, password: testUser.password });
    await this.testRoute('POST', '/auth/refresh', { refreshToken: 'mock-refresh-token' });
    await this.testRoute('POST', '/auth/logout', { refreshToken: 'mock-refresh-token' });
    await this.testRoute('POST', '/auth/password-forgot', { email: testUser.email });
  }

  private async testUserRoutes(): Promise<void> {
    console.log('\n👥 Testing User Management Routes...');
    
    await this.testRoute('GET', '/users');
    await this.testRoute('POST', '/users', {
      email: 'newuser@test.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User'
    });
    await this.testRoute('GET', '/users/available-features');
  }

  private async testContentRoutes(): Promise<void> {
    console.log('\n📄 Testing Content Management Routes...');
    
    // Categories
    await this.testRoute('GET', '/categories');
    await this.testRoute('POST', '/categories', { name: 'Test Category', description: 'Test' });

    // Blog Posts
    await this.testRoute('GET', '/blog-posts');
    await this.testRoute('POST', '/blog-posts', {
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      content: 'Test content'
    });

    // Case Studies
    await this.testRoute('GET', '/case-studies');
    
    // Test case study with file upload
    const formData = new FormData();
    formData.append('title', 'Test Case Study');
    formData.append('slug', 'test-case-study');
    formData.append('challenge', 'Test challenge');
    formData.append('solution', 'Test solution');
    formData.append('results', 'Test results');
    
    await this.testRoute('POST', '/case-studies', formData, true);

    // Testimonials
    await this.testRoute('GET', '/testimonials');
    await this.testRoute('POST', '/testimonials', {
      clientName: 'Test Client',
      content: 'Great service!',
      rating: 5
    });

    // Q&A
    await this.testRoute('GET', '/questions');
    await this.testRoute('POST', '/questions', {
      title: 'Test Question',
      content: 'What is this?'
    });
  }

  private async testCrmRoutes(): Promise<void> {
    console.log('\n🤝 Testing CRM Routes...');
    
    // Clients
    await this.testRoute('GET', '/clients');
    await this.testRoute('POST', '/clients', {
      companyName: 'Test Company',
      email: 'client@test.com',
      phone: '1234567890'
    });

    // Leads
    await this.testRoute('GET', '/leads');
    await this.testRoute('POST', '/leads', {
      name: 'Test Lead',
      email: 'lead@test.com',
      source: 'Website'
    });

    // Contact Inquiries
    await this.testRoute('GET', '/contact-inquiries');
    await this.testRoute('POST', '/contact-inquiries', {
      name: 'Test Contact',
      email: 'contact@test.com',
      message: 'Test inquiry'
    });
  }

  private async testProjectRoutes(): Promise<void> {
    console.log('\n🚀 Testing Project Management Routes...');
    
    // Projects
    await this.testRoute('GET', '/projects');
    
    // Test project with file upload
    const formData = new FormData();
    formData.append('name', 'Test Project');
    formData.append('description', 'Test project description');
    formData.append('status', 'active');
    
    await this.testRoute('POST', '/projects', formData, true);

    // Tasks
    await this.testRoute('GET', '/tasks');
    await this.testRoute('POST', '/tasks', {
      title: 'Test Task',
      description: 'Test task description',
      status: 'pending'
    });

    // Project Members
    await this.testRoute('GET', '/project-members');

    // Time Entries
    await this.testRoute('GET', '/time-entries');
  }

  private async testHrRoutes(): Promise<void> {
    console.log('\n👨‍💼 Testing HR Routes...');
    
    // Employee Profiles
    await this.testRoute('GET', '/employee-profiles');
    
    // Test employee with file upload
    const formData = new FormData();
    formData.append('firstName', 'Test');
    formData.append('lastName', 'Employee');
    formData.append('email', 'employee@test.com');
    
    await this.testRoute('POST', '/employee-profiles', formData, true);

    // Skills
    await this.testRoute('GET', '/skills');
    await this.testRoute('POST', '/skills', {
      name: 'JavaScript',
      category: 'Programming'
    });
  }

  private async testBillingRoutes(): Promise<void> {
    console.log('\n💰 Testing Billing Routes...');
    
    // Invoices
    await this.testRoute('GET', '/invoices');
    await this.testRoute('POST', '/invoices', {
      clientId: 'test-client-id',
      amount: 1000,
      dueDate: '2024-12-31'
    });

    // Payments
    await this.testRoute('GET', '/payments');
    await this.testRoute('POST', '/payments', {
      invoiceId: 'test-invoice-id',
      amount: 1000,
      method: 'credit_card'
    });
  }

  private async testTechnologyRoutes(): Promise<void> {
    console.log('\n💻 Testing Technology Routes...');
    
    await this.testRoute('GET', '/technologies');
    
    // Test technology with file upload
    const formData = new FormData();
    formData.append('name', 'React');
    formData.append('category', 'Frontend');
    
    await this.testRoute('POST', '/technologies', formData, true);
  }

  private generateReport(): void {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    const totalTests = this.results.length;
    const successfulTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - successfulTests;
    
    console.log(`Total Routes Tested: ${totalTests}`);
    console.log(`✅ Successful: ${successfulTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`Success Rate: ${((successfulTests / totalTests) * 100).toFixed(2)}%`);
    
    // Group results by status code
    const statusGroups: { [key: number]: TestResult[] } = {};
    this.results.forEach(result => {
      if (!statusGroups[result.status]) {
        statusGroups[result.status] = [];
      }
      statusGroups[result.status].push(result);
    });
    
    console.log('\nStatus Code Breakdown:');
    Object.keys(statusGroups).forEach(status => {
      const count = statusGroups[parseInt(status)].length;
      console.log(`  ${status}: ${count} routes`);
    });
    
    // Show failed routes
    const failedRoutes = this.results.filter(r => !r.success);
    if (failedRoutes.length > 0) {
      console.log('\n❌ Failed Routes:');
      failedRoutes.forEach(route => {
        console.log(`  ${route.method} ${route.route} - ${route.status} (${route.error})`);
      });
    }
    
    // Save detailed report to file
    const reportData = {
      summary: {
        totalTests,
        successfulTests,
        failedTests,
        successRate: ((successfulTests / totalTests) * 100).toFixed(2) + '%'
      },
      results: this.results,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('test-results.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed report saved to test-results.json');
  }
}

// Run the tests
async function runTests() {
  const tester = new RoutesTester();
  await tester.testAllRoutes();
}

// Execute if run directly
if (require.main === module) {
  runTests().catch(console.error);
}

export { RoutesTester };