import { CaseStudy } from '../src/modules/content/case-studies/entities/case-study.entity';
import { AppDataSource } from '../src/config/data-source';

const caseStudiesData = [
  {
    title: 'AI-Powered Customer Service Automation',
    slug: 'ai-customer-service-automation',
    introduction: 'Revolutionizing customer support with intelligent AI chatbots and automated response systems.',
    challenge: 'The client was overwhelmed with 10,000+ daily customer inquiries, leading to long response times and customer dissatisfaction.',
    solution: 'We implemented an AI-powered chatbot using NLP and machine learning to handle 80% of common queries automatically, with seamless handoff to human agents for complex issues.',
    results: 'Reduced response time by 90%, increased customer satisfaction by 65%, and decreased support costs by 40%.',
    clientName: 'TechCorp Solutions',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'E-commerce Platform Scalability Enhancement',
    slug: 'ecommerce-platform-scalability',
    introduction: 'Scaling an e-commerce platform to handle Black Friday traffic with zero downtime.',
    challenge: 'The existing platform crashed during peak traffic, losing $2M in sales during the previous Black Friday.',
    solution: 'Migrated to microservices architecture with auto-scaling, implemented CDN, and optimized database queries with Redis caching.',
    results: 'Handled 10x traffic increase with 99.9% uptime, processed $15M in sales during Black Friday, and improved page load times by 75%.',
    clientName: 'ShopMax Retail',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Mobile Banking App Security Overhaul',
    slug: 'mobile-banking-app-security',
    introduction: 'Implementing bank-grade security features in a mobile banking application.',
    challenge: 'Security vulnerabilities and compliance issues were preventing the app from launching in regulated markets.',
    solution: 'Implemented end-to-end encryption, biometric authentication, fraud detection algorithms, and achieved SOC 2 compliance.',
    results: 'Passed all security audits, launched in 15 countries, acquired 500K users in first 6 months with zero security incidents.',
    clientName: 'SecureBank Digital',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Healthcare Data Analytics Platform',
    slug: 'healthcare-data-analytics-platform',
    introduction: 'Building a comprehensive analytics platform for healthcare providers to improve patient outcomes.',
    challenge: 'Hospital struggled with fragmented data across multiple systems, making it impossible to get actionable insights.',
    solution: 'Developed a unified analytics platform with real-time dashboards, predictive modeling, and HIPAA-compliant data processing.',
    results: 'Reduced patient readmission rates by 25%, improved diagnosis accuracy by 30%, and saved $5M annually in operational costs.',
    clientName: 'Metropolitan Health System',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Real Estate CRM Web Application',
    slug: 'real-estate-crm-web-app',
    introduction: 'Streamlining real estate operations with a comprehensive CRM and property management system.',
    challenge: 'Real estate agency was losing leads due to poor follow-up processes and lack of centralized client management.',
    solution: 'Built a custom CRM with automated lead nurturing, property matching algorithms, and integrated communication tools.',
    results: 'Increased lead conversion by 45%, reduced response time to 2 minutes, and grew revenue by 60% in first year.',
    clientName: 'Prime Properties Group',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'IoT Smart Manufacturing System',
    slug: 'iot-smart-manufacturing-system',
    introduction: 'Transforming traditional manufacturing with IoT sensors and predictive maintenance.',
    challenge: 'Manufacturing plant experienced frequent equipment failures, causing $3M in annual downtime costs.',
    solution: 'Deployed IoT sensors across all equipment, built predictive maintenance algorithms, and created real-time monitoring dashboards.',
    results: 'Reduced unplanned downtime by 80%, increased equipment efficiency by 35%, and saved $2.5M in maintenance costs.',
    clientName: 'Industrial Dynamics Corp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'EdTech Learning Management Platform',
    slug: 'edtech-learning-management-platform',
    introduction: 'Creating an engaging online learning platform for K-12 education with interactive features.',
    challenge: 'School district needed to transition to remote learning but lacked engaging digital tools for students.',
    solution: 'Developed an LMS with gamification, virtual classrooms, progress tracking, and parent-teacher communication tools.',
    results: 'Improved student engagement by 70%, increased completion rates by 50%, and supported 50,000+ students during remote learning.',
    clientName: 'Metro School District',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Blockchain Supply Chain Tracking',
    slug: 'blockchain-supply-chain-tracking',
    introduction: 'Implementing blockchain technology for transparent and secure supply chain management.',
    challenge: 'Food company faced challenges with supply chain transparency and food safety traceability.',
    solution: 'Built a blockchain-based tracking system that records every step from farm to consumer, ensuring transparency and authenticity.',
    results: 'Achieved 100% supply chain visibility, reduced food safety incidents by 95%, and increased consumer trust by 40%.',
    clientName: 'FreshFarm Foods',
    thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Fintech Payment Gateway Integration',
    slug: 'fintech-payment-gateway-integration',
    introduction: 'Building a secure and scalable payment processing system for emerging markets.',
    challenge: 'Startup needed to process payments across 20 countries with different currencies and regulations.',
    solution: 'Developed a unified payment gateway with multi-currency support, fraud detection, and compliance with local regulations.',
    results: 'Processed $100M in transactions, achieved 99.99% uptime, and expanded to 25 countries with zero compliance issues.',
    clientName: 'GlobalPay Solutions',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Social Media Analytics Dashboard',
    slug: 'social-media-analytics-dashboard',
    introduction: 'Creating comprehensive social media analytics and management platform for marketing agencies.',
    challenge: 'Marketing agency managed 200+ client accounts across multiple platforms without unified reporting.',
    solution: 'Built an all-in-one dashboard with real-time analytics, automated reporting, and AI-powered content recommendations.',
    results: 'Reduced reporting time by 85%, increased client retention by 30%, and improved campaign ROI by 50% across all clients.',
    clientName: 'Digital Marketing Pro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  }
];

async function seedCaseStudies() {
  let shouldCloseConnection = false;
  
  try {
    // Check if connection is already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      shouldCloseConnection = true;
      console.log('Database connected for case studies seeding');
    }

    const caseStudyRepository = AppDataSource.getRepository(CaseStudy);

    // Clear existing case studies
    await caseStudyRepository.clear();
    console.log('Cleared existing case studies');

    // Insert new case studies
    for (const caseStudyData of caseStudiesData) {
      const caseStudy = caseStudyRepository.create(caseStudyData);
      await caseStudyRepository.save(caseStudy);
      console.log(`Created case study: ${caseStudyData.title}`);
    }

    console.log(`✅ Successfully seeded ${caseStudiesData.length} case studies`);
  } catch (error) {
    console.error('❌ Error seeding case studies:', error);
  } finally {
    if (shouldCloseConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Run if called directly
if (require.main === module) {
  seedCaseStudies();
}

export { seedCaseStudies };