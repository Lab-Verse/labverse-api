import { Technology } from '../src/modules/technology/entities/technology.entity';
import { Service } from '../src/modules/services/entities/service.entity';
import { AppDataSource } from '../src/config/data-source';

const technologiesData = [
  // Frontend
  { name: 'React', description: 'Component-based UI library for building interactive interfaces', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', description: 'Full-stack React framework with SSR, RSC, and edge runtime', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', description: 'Typed superset of JavaScript for scalable applications', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Three.js', description: 'JavaScript 3D library for WebGL-powered visual experiences', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'Vue.js', description: 'Progressive JavaScript framework for building user interfaces', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Angular', description: 'Platform for building mobile and desktop web applications', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  // Backend
  { name: 'Node.js', description: 'Server-side JavaScript runtime built on V8 engine', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'NestJS', description: 'Progressive Node.js framework for enterprise server-side applications', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
  { name: 'Python', description: 'Versatile programming language for AI, data science, and web development', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', description: 'Modern, high-performance Python web framework for building APIs', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'GraphQL', description: 'Query language for APIs and runtime for fulfilling queries', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  // Database
  { name: 'PostgreSQL', description: 'Advanced open-source relational database with JSON and vector support', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', description: 'NoSQL document database for flexible data modeling', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Redis', description: 'In-memory data store for caching, sessions, and real-time analytics', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  // Cloud & DevOps
  { name: 'AWS', description: 'Comprehensive cloud platform — EC2, Lambda, S3, RDS, ECS, and 200+ services', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Google Cloud', description: 'Cloud platform with AI/ML, Kubernetes Engine, and BigQuery', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Docker', description: 'Containerization platform for consistent deployments', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', description: 'Container orchestration platform for automated deployment and scaling', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Terraform', description: 'Infrastructure as Code tool for provisioning cloud resources', category: 'Cloud & DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  // AI & ML
  { name: 'PyTorch', description: 'Deep learning framework for building and training neural networks', category: 'AI & Machine Learning', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow', description: 'End-to-end platform for machine learning workflows', category: 'AI & Machine Learning', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'LangChain', description: 'Framework for building applications powered by language models', category: 'AI & Machine Learning', logo: null },
  { name: 'OpenAI API', description: 'GPT-4, DALL-E, and Whisper integration for AI-powered features', category: 'AI & Machine Learning', logo: null },
  // Mobile
  { name: 'React Native', description: 'Cross-platform mobile development with React', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Flutter', description: 'Google UI toolkit for natively compiled mobile applications', category: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
];

const servicesData = [
  { name: 'Full-Stack Web Development', description: 'End-to-end web application development using modern frameworks like Next.js, React, NestJS, and PostgreSQL. From MVPs to enterprise-grade platforms.', base_price: 15000, duration_in_days: 60, category: 'Development' },
  { name: 'AI & Machine Learning Solutions', description: 'Custom AI solutions including agentic systems, RAG pipelines, intelligent chatbots, and ML model deployment on scalable cloud infrastructure.', base_price: 25000, duration_in_days: 90, category: 'AI' },
  { name: 'Cloud Architecture & DevOps', description: 'Cloud-native infrastructure design, CI/CD pipeline automation, Kubernetes orchestration, and Infrastructure as Code with Terraform on AWS and GCP.', base_price: 12000, duration_in_days: 45, category: 'Infrastructure' },
  { name: 'Mobile App Development', description: 'Native and cross-platform mobile applications using React Native and Flutter. From concept to App Store submission with ongoing maintenance.', base_price: 20000, duration_in_days: 75, category: 'Development' },
  { name: 'UI/UX Design & Prototyping', description: 'Human-centered design with interactive prototypes, design systems, and WebGL-enhanced experiences that win awards and convert users.', base_price: 8000, duration_in_days: 30, category: 'Design' },
  { name: 'MCP Agent Development', description: 'Custom Model Context Protocol server development for connecting AI models to your enterprise tools, databases, and workflows with secure, auditable integrations.', base_price: 18000, duration_in_days: 45, category: 'AI' },
  { name: 'Data Engineering & Analytics', description: 'Data pipeline design, data warehouse architecture, real-time analytics dashboards, and business intelligence solutions at scale.', base_price: 15000, duration_in_days: 60, category: 'Data' },
  { name: 'Cybersecurity Consulting', description: 'Security audits, vulnerability assessments, compliance implementation (SOC 2, HIPAA, GDPR), and AI application security hardening.', base_price: 10000, duration_in_days: 30, category: 'Security' },
];

async function seedTechAndServices() {
  let shouldCloseConnection = false;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      shouldCloseConnection = true;
      console.log('Database connected for tech & services seeding');
    }

    const techRepo = AppDataSource.getRepository(Technology);
    const serviceRepo = AppDataSource.getRepository(Service);

    // Seed technologies (upsert to avoid duplicates)
    for (const techData of technologiesData) {
      const existing = await techRepo.findOne({ where: { name: techData.name } });
      if (!existing) {
        const tech = techRepo.create(techData);
        await techRepo.save(tech);
        console.log(`Created technology: ${techData.name}`);
      } else {
        console.log(`Technology "${techData.name}" already exists, skipping`);
      }
    }
    console.log(`✅ Technologies seeding complete (${technologiesData.length} items)`);

    // Seed services (upsert)
    for (const svcData of servicesData) {
      const existing = await serviceRepo.findOne({ where: { name: svcData.name } });
      if (!existing) {
        const svc = serviceRepo.create(svcData);
        await serviceRepo.save(svc);
        console.log(`Created service: ${svcData.name}`);
      } else {
        console.log(`Service "${svcData.name}" already exists, skipping`);
      }
    }
    console.log(`✅ Services seeding complete (${servicesData.length} items)`);

  } catch (error) {
    console.error('❌ Error seeding tech & services:', error);
  } finally {
    if (shouldCloseConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

if (require.main === module) {
  seedTechAndServices();
}

export { seedTechAndServices };
