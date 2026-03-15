import { CaseStudy } from '../src/modules/content/case-studies/entities/case-study.entity';
import { AppDataSource } from '../src/config/data-source';

const caseStudiesData = [
  {
    title: 'WhatsApp AI Agent for European Markets',
    slug: 'whatsapp-ai-agent-europe',
    introduction: 'An intelligent conversational agent built on the WhatsApp Business API, leveraging OpenAI function-calling and retrieval-augmented generation to automate multilingual customer engagement across European markets.',
    challenge: 'The client operated a consumer goods business spanning 8 European countries with customer inquiries arriving in 6 languages around the clock. Their manual support team was drowning — average response time exceeded 14 hours, CSAT had dropped to 52%, and hiring multilingual agents at scale was economically unviable. They needed an always-on, culturally-aware conversational system that could handle order tracking, returns, product recommendations, and escalation — all within WhatsApp, which accounted for 78% of their customer interactions.',
    solution: 'We engineered a production-grade WhatsApp AI Agent using the Meta Cloud API integrated with an OpenAI GPT-4o backbone. The system uses function-calling to orchestrate real-time lookups against the client\'s Shopify and SAP ERP instances — order status, inventory checks, and return initiation happen inside the conversation flow without human intervention. A retrieval-augmented generation (RAG) pipeline backed by pgvector serves product knowledge from a continuously-updated vector store. Language detection and response generation happen natively within the model context, eliminating the need for separate translation layers. The architecture runs on a NestJS microservice deployed to AWS ECS Fargate with Redis-backed session state, handling 50+ concurrent conversation threads per container.',
    results: 'Average response time collapsed from 14 hours to under 90 seconds. Customer satisfaction climbed from 52% to 89% within the first quarter. The agent autonomously resolves 74% of all inquiries without human escalation. Support operational costs dropped by 61%, and the system processes over 12,000 conversations per week across all 8 markets with 99.7% uptime.',
    clientName: 'European Consumer Goods Company',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Claude MCP Multi-Server GCP Deployment',
    slug: 'claude-mcp-gcp-integration',
    introduction: 'A large-scale deployment and integration of multiple Anthropic Model Context Protocol (MCP) servers on Google Cloud Platform, enabling Claude to securely interact with enterprise data lakes, internal APIs, and DevOps infrastructure through a unified tool orchestration layer.',
    challenge: 'A Series B SaaS company had adopted Claude as their core AI backbone but hit a wall: connecting the model to their fragmented internal tooling — a BigQuery data warehouse, a custom-built ticketing system, a Terraform-managed infrastructure layer, and a Confluence knowledge base — required bespoke integration code for each system. Every new tool connection took 2-3 weeks of engineering time, and there was no standardized way to manage permissions, audit tool usage, or scale the integrations horizontally. The company needed a protocol-driven approach to unify all AI-tool interactions under a single, secure, and extensible architecture.',
    solution: 'We deployed a fleet of purpose-built MCP servers on GCP Cloud Run, each handling a specific domain: a BigQuery MCP server for analytical queries, a Ticketing MCP server wrapping the internal REST API, a Terraform MCP server for infrastructure state inspection, and a Confluence MCP server for knowledge retrieval. All servers implement the full MCP specification with typed tool schemas, capability discovery, and provenance-stamped audit trails. An API Gateway with IAM-based authentication enforces per-tool authorization scopes. Service-to-service communication flows through Cloud Run\'s built-in service mesh. The entire stack is defined in Terraform and deployed via Cloud Build pipelines. Claude interacts with the unified tool surface through a single MCP client SDK integrated into the company\'s Next.js dashboard.',
    results: 'New tool integrations now take 2 days instead of 3 weeks — a 90% reduction in integration time. Claude successfully executes cross-domain workflows (e.g., querying BigQuery, creating a ticket from the findings, and updating Confluence documentation) in single conversation turns. The system processes 4,200+ tool calls daily with a p99 latency of 340ms. Security audit compliance improved to 100% with full provenance logging across every AI-initiated action.',
    clientName: 'Series B SaaS Platform',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'Myannuity.org — Automated Blog & News Platform',
    slug: 'myannuity-automated-blog-platform',
    introduction: 'A high-performance, fully automated blog and financial news platform built on Next.js 15 with server-side rendering, AI-assisted content generation pipelines, and a headless CMS architecture designed for SEO dominance in the annuity and retirement planning space.',
    challenge: 'Myannuity.org needed to establish authority in the competitive financial advisory content market. Their existing WordPress site loaded in 6+ seconds, ranked poorly on Core Web Vitals, and required manual content creation that couldn\'t keep pace with daily regulatory changes and market movements. The editorial team of two people was producing 3 articles per week — insufficient to compete with established financial publishers pushing 5-10 pieces daily. They needed a platform that was blazing fast, SEO-optimized out of the box, and capable of scaling content production 10x without proportionally scaling headcount.',
    solution: 'We rebuilt the entire platform from scratch using Next.js 15 App Router with React Server Components for zero-JS content pages. Static generation with incremental static regeneration ensures sub-second page loads. The content pipeline uses an AI-assisted workflow: a GPT-4o-powered research agent monitors regulatory feeds, market data APIs, and financial news sources, then generates structured draft outlines that human editors review and publish through a custom Sanity.io CMS integration. Structured data (JSON-LD) and dynamic sitemap generation are automated. The platform runs on Vercel Edge with image optimization through next/image and asset caching at the CDN edge. A PostgreSQL-backed analytics dashboard tracks keyword rankings, traffic, and content performance in real-time.',
    results: 'Page load times dropped from 6.2 seconds to 0.8 seconds (87% improvement). Core Web Vitals passed Google\'s thresholds across 100% of pages. Organic search traffic increased 340% within 6 months. Content output scaled from 3 to 25+ articles per week with the same two-person editorial team. Domain authority climbed from 12 to 41. The site now ranks on page one for 180+ high-intent annuity-related keywords.',
    clientName: 'Myannuity.org',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'PBA Korea — WordPress to Next.js Migration',
    slug: 'pba-korea-nextjs-migration',
    introduction: 'A massive architectural migration of pbakorea.org from a legacy WordPress multisite installation to a modern Next.js 15 application with a headless CMS, internationalization support, and a custom event management system serving the Korean professional bowling community.',
    challenge: 'PBA Korea\'s WordPress site had accumulated 6 years of technical debt across a multisite installation with 14 plugins, a custom theme riddled with PHP spaghetti code, and a MySQL database approaching 2GB of poorly-indexed content. Page load times averaged 8 seconds on Korean mobile networks. The admin panel crashed regularly during tournament season when 50+ editors simultaneously updated scores and schedules. Internationalization relied on a fragile plugin that broke with every WordPress core update. The organization needed a complete architectural overhaul that preserved all existing content, supported Korean/English bilingual content natively, and could handle 100x traffic spikes during major tournament broadcasts.',
    solution: 'We executed a phased migration strategy. Phase 1: extracted and normalized all WordPress content (4,200+ posts, 12,000+ media assets, 800+ pages) into a structured PostgreSQL database using custom ETL scripts. Phase 2: built the new frontend on Next.js 15 with App Router, leveraging React Server Components for tournament pages and ISR for news articles. The i18n system uses next-intl with server-side locale detection and URL-based routing (pbakorea.org/ko, pbakorea.org/en). Phase 3: built a custom event management module with real-time score updates via WebSockets, tournament bracket generation, and player profile pages with career statistics. The CMS backend runs on NestJS with a custom admin dashboard. Deployment targets Vercel with edge functions and a Korean CDN node for sub-200ms TTFB domestically.',
    results: 'Page load times improved from 8 seconds to 1.1 seconds (86% faster). Zero downtime during the migration — traffic was cut over via DNS with the old site maintained as a read-only fallback for 30 days. The admin panel handles 200+ concurrent editors without degradation. Tournament broadcast pages sustained 45,000 concurrent users during the Korean PBA Championship without performance issues. Lighthouse scores across all pages average 96/100.',
    clientName: 'PBA Korea (pbakorea.org)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'tuoCaf — Digital Italian CAF Services Platform',
    slug: 'tuocaf-digital-caf-platform',
    introduction: 'A digital-first platform that modernizes access to traditional Italian CAF (Centro di Assistenza Fiscale) services, enabling citizens to submit tax declarations, ISEE certifications, and social benefit applications through an intuitive web interface backed by automated document processing and AI-powered form validation.',
    challenge: 'Italian CAF offices handle millions of tax and social service filings annually, but the process remained stubbornly analog — citizens queued for hours, filled paper forms that were manually keyed into legacy systems, and waited weeks for processing confirmations. The client CAF network of 120+ offices faced declining foot traffic as younger demographics avoided the in-person process entirely. Error rates on manually-processed forms exceeded 12%, causing costly resubmissions and compliance penalties. They needed a digital platform that preserved the trusted CAF advisor relationship while eliminating the friction of physical paperwork.',
    solution: 'We built tuoCaf as a full-stack Next.js application with a NestJS backend running on AWS. The document processing pipeline uses OCR (Tesseract + custom-trained models for Italian fiscal documents) to extract data from uploaded documents — CUD forms, pay slips, property deeds. An AI validation engine cross-references extracted data against fiscal code databases and historical filings to flag inconsistencies before submission. The citizen-facing interface guides users through multi-step filing workflows with real-time progress tracking and digital signature integration via SPID (Italy\'s national digital identity). CAF advisors access a back-office dashboard for review, annotation, and final submission to the Agenzia delle Entrate. The platform supports offline-first PWA mode for areas with unreliable connectivity.',
    results: 'Digitized 67% of all filings across the CAF network within the first year. Processing time per filing dropped from 45 minutes to 12 minutes. Form error rates fell from 12% to 2.3%. The platform processes 8,500+ filings monthly with 99.4% uptime. Citizen satisfaction scores reached 4.6/5.0, and the client CAF network saw a 28% increase in new registrations from the 25-40 age demographic.',
    clientName: 'tuoCaf (Italian CAF Network)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop'
    ],
    isPublished: true
  },
  {
    title: 'The World Ambassador — Media Agency Digital Platform',
    slug: 'the-world-ambassador-media-platform',
    introduction: 'A modern digital platform for The World Ambassador (TWA), a media agency based in Pakistan, featuring a content management system, multimedia portfolio showcase, and an integrated client engagement portal designed to position TWA as a leading digital media voice in the South Asian market.',
    challenge: 'TWA operated as a respected media agency with strong offline relationships but virtually no digital presence. Their brand identity was fragmented across disconnected social media accounts with no central hub for their journalism, editorial content, and media production portfolio. Client acquisition relied entirely on word-of-mouth, and they had no system for managing editorial workflows, scheduling content, or tracking audience engagement. Competing agencies with modern digital platforms were capturing the growing online media budget allocation. TWA needed a unified digital identity that showcased their portfolio, streamlined editorial operations, and opened new revenue channels through digital advertising and sponsored content.',
    solution: 'We delivered a comprehensive digital platform built on Next.js with a custom headless CMS backend on NestJS. The public-facing site features a responsive multimedia portfolio with video embedding, image galleries with lazy-loading and progressive enhancement, and a magazine-style editorial section with category-based navigation and full-text search. The editorial workflow system supports multi-author content pipelines with draft → review → publish states, scheduled publishing, and SEO optimization tools. A client portal allows advertising partners to view campaign performance metrics, submit briefs, and manage contracts. The platform integrates with YouTube, Facebook, and Twitter APIs for cross-platform content distribution. Analytics are powered by a custom dashboard pulling from Google Analytics 4 and platform-native insights.',
    results: 'TWA\'s organic website traffic grew from zero to 45,000 monthly visitors within 4 months of launch. The editorial team increased output from 5 to 30+ pieces per week using the streamlined workflow. Client acquisition through digital channels accounted for 35% of new business within 6 months — a channel that previously didn\'t exist. Ad revenue from the digital platform now contributes 22% of total agency revenue. The site maintains a 94/100 Lighthouse performance score and sub-2-second load times across Pakistani mobile networks.',
    clientName: 'The World Ambassador (TWA)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&h=600&fit=crop',
    projectImages: [
      'https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop'
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
