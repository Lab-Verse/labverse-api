import { BlogPost } from '../src/modules/content/blog-posts/entities/blog-post.entity';
import { AppDataSource } from '../src/config/data-source';

const blogPostsData = [
  {
    title: 'The Rise of Agentic AI: Why Autonomous Systems Are Reshaping Enterprise Software',
    slug: 'rise-of-agentic-ai-enterprise-software',
    content: `The software industry is undergoing a fundamental shift. Where traditional AI systems wait for explicit instructions, agentic AI operates with genuine autonomy — setting sub-goals, selecting tools, and adapting strategies mid-execution. This is not incremental improvement; it is a category change in what software can accomplish without human intervention.

At Labverse, we have been building agentic pipelines for enterprise clients since early 2025. The pattern is consistent: a planner module decomposes a high-level objective into tasks, a retrieval layer surfaces relevant context from vector stores and structured databases, and an executor module chains tool calls together — API integrations, database writes, file generation — while a critic module evaluates outputs before they reach the user.

What makes this architecture powerful is composability. Each agent can delegate to sub-agents. A customer service agent might spawn a billing-lookup agent, a policy-retrieval agent, and a sentiment-analysis agent in parallel, then synthesize their outputs into a single coherent response. The latency overhead is minimal when you architect the orchestration layer correctly.

The technical challenges are real. State management across multi-turn agent conversations requires careful design. We use event-sourced state machines that persist every tool call, every LLM response, and every decision branch. This makes debugging deterministic and enables replay for testing. Error boundaries must be explicit — an agent that silently fails and continues is worse than one that crashes loudly.

Memory is the other frontier. Short-term working memory (the conversation context), medium-term episodic memory (what happened in this session), and long-term semantic memory (what the system has learned over time) all require different storage and retrieval strategies. We combine pgvector for semantic search with Redis for session state and PostgreSQL for structured facts.

The business impact is measurable. One logistics client reduced their manual exception-handling workload by 73% within twelve weeks of deploying our agentic dispatch system. The agents handle route re-optimization, carrier communication, and customer notifications autonomously. Human operators now focus on genuinely novel situations that require judgment.

The key lesson: agentic AI is not about replacing humans. It is about eliminating the cognitive overhead of routine decision-making so that skilled professionals can focus on work that actually requires their expertise.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-12-15'),
  },
  {
    title: 'Model Context Protocol: Building Interoperable AI Tool Ecosystems',
    slug: 'model-context-protocol-ai-tool-ecosystems',
    content: `Anthropic's Model Context Protocol has quietly become one of the most consequential standards in the AI tooling ecosystem. MCP defines a universal interface for connecting language models to external tools, data sources, and services — and it solves a problem that every serious AI engineering team has encountered.

Before MCP, every tool integration was bespoke. Connecting an LLM to a database required custom function definitions, serialization logic, and error handling. Connecting it to a second tool meant duplicating that effort. Multiply by dozens of tools and you have an unmaintainable tangle of custom plumbing.

MCP standardizes this. A tool server exposes capabilities through a typed schema — inputs, outputs, descriptions for the model to reason about. The client (your AI application) discovers available tools at runtime through a capability handshake. This means you can swap tool implementations, add new data sources, or upgrade model providers without rewriting integration code.

We have deployed MCP servers for clients across multiple domains. A legal tech firm uses our MCP server to connect Claude to their document management system, case law databases, and billing platform simultaneously. The model can search precedents, draft contract clauses, and log billable time in a single conversation turn. Before MCP, this required three separate integrations with three different prompt engineering approaches.

The architecture matters. We run MCP servers as containerized microservices on AWS ECS, with service discovery through the MCP registry pattern. Each server handles authentication, rate limiting, and audit logging independently. The AI application sees a unified tool surface. Horizontal scaling is straightforward — each MCP server is stateless and can replicate behind a load balancer.

Security is built into the protocol. Tool calls include provenance metadata — which model requested the action, which user initiated the conversation, what the authorization scope is. This creates an auditable chain of custody for every AI-initiated action in your infrastructure.

The trajectory is clear. MCP is doing for AI tool integration what REST did for web APIs — creating a shared language that reduces friction and accelerates ecosystem growth.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-11-28'),
  },
  {
    title: 'Next.js 15 Server Components in Production: Lessons From Scaling to Millions of Requests',
    slug: 'nextjs-15-server-components-production-scale',
    content: `When React Server Components (RSC) landed as a stable feature in Next.js, the promise was clear: move rendering logic to the server, reduce client-side JavaScript, and achieve faster time-to-interactive. After deploying RSC-heavy architectures for three enterprise clients handling between 2 and 12 million monthly page views, we can report that the promise largely delivers — with important caveats.

The performance wins are substantial. Our e-commerce client saw a 62% reduction in JavaScript bundle size after migrating product listing pages to server components. Time-to-first-byte improved by 340 milliseconds on average. Largest Contentful Paint dropped below 1.2 seconds for 90th percentile users. These are not synthetic benchmarks — they are real-user metrics from a production deployment serving traffic across 40 countries.

The mental model shift is significant. You must think carefully about the component boundary between server and client. Data fetching, transformation, and initial rendering happen on the server. Interactivity — click handlers, form state, animations — stays on the client. The 'use client' boundary is not just a directive; it is an architectural decision that affects how data flows through your component tree.

Caching strategy becomes central. Next.js provides multiple caching layers: full route cache, data cache, and client-side router cache. Misconfiguring any of these leads to stale data in production. We use explicit cache tags with on-demand revalidation through webhook-triggered ISR. Every mutation endpoint in our NestJS API fires a revalidation request to the Next.js application. The result is consistently fresh content without the overhead of SSR on every request.

Streaming is where RSC truly shines. For pages with multiple independent data dependencies — a dashboard with user profile, recent activity, analytics widgets, and notification feed — streaming allows each section to render as its data becomes available. The user sees content progressively rather than waiting for the slowest query. We implement this with Suspense boundaries around each data-fetching server component.

The tooling ecosystem has caught up. TypeScript inference across the server-client boundary works correctly. Error boundaries propagate as expected. The development experience with Turbopack in Next.js 15 has eliminated the slow compilation times that plagued earlier versions.

Our recommendation: if you are building a content-heavy or data-dense application, the migration cost to RSC pays for itself within two release cycles through reduced infrastructure costs and improved user-experience metrics.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-11-10'),
  },
  {
    title: 'Designing Cloud-Native Architectures: From Monolith to Event-Driven Microservices',
    slug: 'cloud-native-monolith-to-event-driven-microservices',
    content: `The decision to decompose a monolith into microservices should never be ideological. It should be driven by concrete engineering constraints: deployment velocity, team autonomy, scaling granularity, and fault isolation requirements. At Labverse, we have guided seven organizations through this transition over the past two years, and the most important lesson is that premature decomposition creates more problems than it solves.

The migration pattern we recommend starts with the Strangler Fig approach. You identify bounded contexts within the existing monolith — domains with high change frequency, independent scaling requirements, or distinct data ownership. These become the first extraction candidates. The monolith continues handling everything else while you incrementally route traffic through the new services.

Event-driven architecture is the connective tissue. When Service A updates an order status, it publishes a domain event to Apache Kafka. Service B (notifications), Service C (analytics), and Service D (inventory) each consume that event independently. This decouples the services temporally and allows each team to deploy, scale, and fail independently. The event log also serves as an audit trail and enables event replay for disaster recovery.

We standardize on a specific infrastructure stack for cloud-native deployments: Kubernetes on AWS EKS for orchestration, Istio for service mesh (mTLS, traffic management, observability), PostgreSQL with read replicas for structured data, Redis for caching and session management, and Kafka for asynchronous messaging. Each service runs in its own namespace with resource quotas and network policies.

Observability is non-negotiable. Every service emits structured logs (JSON), exposes Prometheus metrics, and propagates distributed traces through OpenTelemetry. We use Grafana for dashboards and PagerDuty for alerting. Without this observability foundation, debugging production issues in a distributed system becomes an exercise in guesswork.

The database-per-service pattern is essential but creates data consistency challenges. We use the Saga pattern for distributed transactions — each service completes its local transaction and publishes a completion event. If any step fails, compensating transactions roll back the previous steps. This is more complex than a single database transaction, but it eliminates the shared-database bottleneck that prevents independent deployment.

The results speak for themselves. Our largest client went from bi-weekly deployments to continuous deployment across 14 services. Mean time to recovery dropped from hours to minutes. Their platform now handles 5x the traffic without proportional infrastructure cost increases.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-10-22'),
  },
  {
    title: 'Building Intelligent Chatbots with RAG: Beyond Basic Document Retrieval',
    slug: 'intelligent-chatbots-rag-beyond-basic-retrieval',
    content: `Retrieval-Augmented Generation has matured from a research technique into a production-ready architecture pattern. But the gap between a RAG prototype and a production RAG system is enormous. Most tutorials show you how to chunk documents, embed them, and retrieve the top-K results. Production systems require recursive retrieval, re-ranking, query decomposition, and hybrid search — and getting these right determines whether your chatbot is useful or frustrating.

The chunking strategy matters more than the embedding model. We have tested fixed-size chunking, semantic chunking, sliding-window chunking with overlap, and hierarchical chunking across multiple client deployments. The winner, consistently, is hierarchical chunking: documents are split into sections, subsections, and paragraphs, each maintaining parent-child relationships. When the retriever finds a relevant paragraph, it can pull the surrounding section for context. This eliminates the common failure mode where a chunk contains a sentence fragment that lacks sufficient context for the model to reason about.

Query decomposition transforms retrieval accuracy. When a user asks "How does our cancellation policy differ for enterprise clients versus standard subscriptions?", a naive system embeds this single query and hopes for relevance. Our system decomposes it into three sub-queries: "cancellation policy enterprise clients", "cancellation policy standard subscriptions", and "differences between enterprise and standard plans". Each sub-query retrieves independently, and the results are merged and de-duplicated before being passed to the generation model.

Re-ranking is the secret weapon. After the initial vector search returns candidates, a cross-encoder re-ranker scores each candidate against the original query. This is computationally more expensive than vector similarity but dramatically more accurate. We use a fine-tuned re-ranker deployed on GPU instances and see a consistent 15-25% improvement in answer relevance compared to vector search alone.

Hybrid search combines vector similarity with traditional full-text search (BM25). Some queries benefit from semantic understanding ("what is our approach to data privacy"), while others benefit from exact keyword matching ("error code E-4012"). Our retrieval pipeline runs both searches in parallel, normalizes scores, and merges results with configurable weighting.

The evaluation framework is critical. We maintain a golden dataset of question-answer pairs for each client deployment. Every code change triggers an automated evaluation that measures retrieval precision, answer faithfulness (does the answer match the retrieved context), and answer relevance. Regressions block deployment.

Production RAG is not a solved problem, but the engineering patterns are well-established. The investment in retrieval quality pays compound dividends as your knowledge base grows.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-10-08'),
  },
  {
    title: 'PostgreSQL at Scale: Advanced Techniques for High-Throughput Applications',
    slug: 'postgresql-at-scale-advanced-techniques',
    content: `PostgreSQL remains our default choice for relational data — and increasingly for semi-structured data, vector embeddings, and time-series workloads. Its versatility is remarkable, but extracting maximum performance at scale requires techniques that go beyond basic indexing and query optimization.

Connection pooling is the foundation. At high concurrency, each PostgreSQL connection consumes approximately 10MB of memory. Our standard deployment uses PgBouncer in transaction-mode pooling with a pool size calibrated to 2x the CPU core count. This allows hundreds of application-level connections to share a smaller pool of actual database connections. For our highest-traffic deployment — a fintech platform processing 15,000 transactions per second — this reduced memory usage by 74% and eliminated connection timeout errors entirely.

Partitioning transforms query performance for large tables. We partition transaction tables by month using PostgreSQL's native declarative partitioning. A query that scans transactions for a specific month touches a single partition (typically 20-40 million rows) instead of the full table (hundreds of millions). Partition pruning happens at plan time based on the WHERE clause, so no code changes are needed — the performance improvement is automatic.

The pgvector extension has made PostgreSQL a viable vector database. We store embeddings alongside structured data in the same database, eliminating the need for a separate vector store. For a knowledge base with 2 million document chunks, IVFFlat indexes provide sub-100ms approximate nearest-neighbor search. HNSW indexes are more accurate but consume more memory. We benchmark both for each deployment and choose based on the accuracy-latency tradeoff.

Materialized views with concurrent refresh solve the read-heavy analytics problem. Dashboard queries that would otherwise perform expensive joins and aggregations across millions of rows instead read from pre-computed views refreshed on a configurable schedule. The REFRESH MATERIALIZED VIEW CONCURRENTLY command allows reads during refresh, so dashboards never show stale-because-refreshing data.

Write-ahead log (WAL) tuning is essential for write-heavy workloads. We increase wal_buffers, configure synchronous_commit based on durability requirements, and use WAL archiving for point-in-time recovery. For applications that can tolerate minimal data loss in a catastrophic failure, asynchronous commit reduces write latency by 40-60%.

Monitoring drives continuous optimization. We instrument every query with pg_stat_statements and alert on queries that exceed latency thresholds or perform excessive sequential scans. Slow query analysis is a weekly engineering ritual, not an ad-hoc debugging exercise.

PostgreSQL scales further than most teams realize. Before reaching for a distributed database, exhaust the optimization techniques available in a single well-tuned PostgreSQL instance — you will be surprised how far it can take you.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-09-18'),
  },
  {
    title: 'WebGL Shaders and Generative Art: Creating Immersive Digital Experiences',
    slug: 'webgl-shaders-generative-art-immersive-experiences',
    content: `The web browser has become a serious creative computing platform. With WebGL2 universally supported and WebGPU gaining traction, fragment shaders can render mathematically-generated visual experiences that rival dedicated graphics applications. At Labverse, we use generative shader art as both a design medium and a branding differentiator.

Fragment shaders execute per-pixel on the GPU, which means complex mathematical functions render in real-time at 60fps even on modest hardware. A Mandelbrot set fractal, a Voronoi diagram, or a domain-warped noise field — each pixel computes independently, making the GPU's parallel architecture the perfect execution target. The constraint is that you must think in terms of mathematical functions rather than imperative drawing commands.

Noise functions are the foundational building block. Simplex noise generates smooth, organic-looking patterns from any coordinate input. By layering multiple octaves of noise at different frequencies and amplitudes — a technique called fractal Brownian motion (fBm) — you create rich, natural-looking textures. Adding time as a parameter makes the pattern animate. Adding mouse position creates interactivity.

Domain warping takes this further. Instead of sampling noise at coordinate (x, y), you sample it at (x + noise(x,y), y + noise(x,y)). The result is a fluid, smoke-like distortion that creates mesmerizing organic patterns. Stack multiple layers of domain warping and you get visuals that look like turbulent fluid dynamics simulations — but they render in a single shader pass with no physics simulation.

We use React Three Fiber to bridge the gap between React's component model and Three.js's rendering pipeline. Custom shader materials receive uniform values — time, mouse position, scroll progress, color palettes — as React props. When the user scrolls, the shader morphs. When they move their mouse, the pattern responds. The entire experience feels alive and responsive.

Performance optimization is critical for production deployment. We use half-precision floats where full precision is unnecessary, limit iteration counts in fractal computations based on device capability detection, and implement level-of-detail scaling that reduces shader complexity on mobile devices. A user on a flagship phone gets the full visual experience; a user on a budget device gets a gracefully degraded version that maintains 30fps.

The aesthetic impact is significant. Clients consistently report that their WebGL-enhanced websites receive higher engagement metrics — longer session durations, lower bounce rates, and more social shares. When the visual design is mathematically generated and responds to user input, it creates a sense of uniqueness that static imagery cannot match.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-09-02'),
  },
  {
    title: 'Securing AI Applications: Prompt Injection, Data Leakage, and Defense Strategies',
    slug: 'securing-ai-applications-prompt-injection-defense',
    content: `AI application security is a rapidly evolving field with novel attack vectors that traditional security frameworks do not address. Prompt injection, training data extraction, and jailbreaking are real threats that require purpose-built defenses. Every production AI system we build at Labverse includes a security layer designed specifically for language model interactions.

Prompt injection is the SQL injection of the AI era. An attacker crafts input that causes the model to ignore its system instructions and follow attacker-supplied instructions instead. This can result in data exfiltration, unauthorized actions, or reputational damage if the model generates inappropriate content. The attack surface exists in any system that concatenates user input with system prompts.

Our defense is multi-layered. First, input sanitization: we detect and flag known injection patterns before they reach the model. Second, output validation: we run model outputs through a classifier that detects instruction-following behavior inconsistent with the system prompt. Third, architectural isolation: we separate the user-facing model from the tool-calling model. The user-facing model generates a structured intent representation, which a separate system validates before passing to the agentic execution layer.

Data leakage is the second major risk. RAG systems that retrieve from sensitive corpora can inadvertently include confidential information in responses. Our approach uses permission-aware retrieval: every document chunk inherits the access control list of its parent document. At retrieval time, we filter results based on the requesting user's permissions. This ensures that a junior employee cannot extract information from executive-level documents through clever questioning.

Rate limiting and abuse detection are essential but often overlooked. We monitor conversation patterns for anomalies: unusually long inputs, rapid-fire queries that appear to be probing system behavior, and sequences that match known attack playbooks. Suspicious sessions are flagged for human review and optionally throttled or terminated.

Model output monitoring creates an audit trail. Every model response is logged with the full input context, retrieved documents, and system prompt. This enables post-incident analysis and supports compliance requirements for regulated industries. We use structured logging with OpenTelemetry spans so that security events can be correlated with the broader request lifecycle.

The security landscape for AI applications will continue to evolve as models become more capable and adversaries more sophisticated. Building security into the architecture from the start — rather than bolting it on after deployment — is the only sustainable approach.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-08-19'),
  },
  {
    title: 'Infrastructure as Code with Terraform and AWS: Lessons From 50+ Production Deployments',
    slug: 'infrastructure-as-code-terraform-aws-production',
    content: `After managing infrastructure for over fifty production environments, our infrastructure-as-code practices have crystallized into patterns that consistently reduce deployment failures, accelerate environment provisioning, and eliminate configuration drift.

Module composition is the organizing principle. We maintain a private Terraform module registry with battle-tested modules for common patterns: VPC with public/private subnets and NAT gateways, ECS Fargate services with auto-scaling and ALB integration, RDS PostgreSQL with Multi-AZ failover and automated backups, and ElastiCache Redis clusters. Each module encodes our operational best practices — security group rules, monitoring configuration, backup retention policies — so that every new deployment starts with a production-ready baseline.

State management requires deliberate design. We use S3 backend with DynamoDB state locking, with one state file per environment per service boundary. This prevents state file conflicts in CI/CD pipelines and limits the blast radius of state corruption. State file encryption is enabled by default using AWS KMS, and state access is restricted through IAM policies.

The deployment pipeline is opinionated. Every infrastructure change follows the same flow: author change → open pull request → automated format and validate → plan output posted as PR comment → human review → merge → automated apply. The plan output in the PR comment shows exactly what will change before it happens. This eliminates surprises and creates an auditable change history in version control.

Environment parity is enforced through variable composition. The same Terraform modules are used across development, staging, and production. Only the variable values differ: instance sizes, replica counts, domain names. This guarantees that a feature tested in staging will behave identically in production, because the infrastructure definitions are literally the same code.

Cost optimization is built into the module defaults. Development environments use smaller instance types, single-AZ deployments, and shorter backup retention. Staging mirrors production topology but at reduced scale. Production uses Multi-AZ, larger instances, and aggressive auto-scaling policies. The cost difference between environments is predictable and intentional.

Drift detection runs on a daily schedule. A CI job performs terraform plan in each environment and alerts if the actual infrastructure has diverged from the declared state. Manual changes made through the AWS console — which we strongly discourage but cannot completely prevent — are detected within 24 hours and either codified or reverted.

The investment in infrastructure as code has a measurable ROI: provisioning a new environment takes 45 minutes instead of days, deployment failures from configuration errors have dropped to near zero, and our infrastructure team can confidently make changes knowing that every environment is defined, versioned, and reproducible.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-08-01'),
  },
  {
    title: 'The Future of Full-Stack Development: AI Copilots, Edge Computing, and Real-Time Collaboration',
    slug: 'future-full-stack-ai-copilots-edge-computing',
    content: `The full-stack development landscape is changing faster than at any point in the past decade. Three converging trends — AI-augmented development workflows, edge-first architectures, and real-time collaborative applications — are redefining what it means to build modern web applications.

AI copilots have moved from novelty to necessity. Our engineering team uses AI assistance at every stage of the development lifecycle: code generation for boilerplate and repetitive patterns, automated test generation from implementation code, PR review automation that catches bugs and style violations, and natural-language-to-SQL for complex analytical queries. The productivity improvement is approximately 25-35% for experienced developers — not from writing code faster, but from spending less time on low-value tasks and more time on architecture, design, and problem-solving.

Edge computing is reshaping application architecture. With platforms like Cloudflare Workers, Vercel Edge Functions, and AWS Lambda@Edge, computation can run within milliseconds of the end user. We deploy authentication middleware, personalization logic, and A/B testing at the edge. The latency reduction is most dramatic for users far from the origin server — a user in Singapore accessing a US-hosted application sees 200-400ms improvement in time-to-first-byte when critical logic runs at the edge.

Real-time collaboration has evolved beyond basic presence indicators. Modern applications require conflict-free replicated data types (CRDTs) for concurrent editing, operational transformation for document collaboration, and WebSocket-based event streams for live updates. We use Yjs as our CRDT library — it integrates cleanly with React and handles offline-first scenarios gracefully. Two users editing the same document see each other's changes within 50-100ms with zero data loss.

The TypeScript ecosystem has matured to support true end-to-end type safety. With tRPC or typed API specifications, the type of your database column propagates through your API handler, across the network boundary, and into your React component — all without manual type synchronization. Schema changes in the database are caught at compile time in the frontend. This eliminates entire categories of runtime errors.

Server-sent events and WebSocket connections require a different operational model than request-response APIs. Connection pooling, graceful reconnection, backpressure handling, and heartbeat mechanisms all need explicit implementation. We have standardized on a pattern where the WebSocket connection shares authentication with the HTTP session, and real-time events are fan-out from the same domain event bus that drives our asynchronous processing.

The full-stack role is expanding in scope. A modern full-stack engineer needs to understand database optimization, API design, frontend performance, DevOps automation, and increasingly AI integration. Specialization still matters, but the connective tissue between specialties — the ability to make informed architectural decisions across the entire stack — is what separates good engineers from great ones.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop',
    isPublished: true,
    publishedAt: new Date('2025-07-14'),
  },
];

async function seedBlogPosts() {
  let shouldCloseConnection = false;

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      shouldCloseConnection = true;
      console.log('Database connected for blog posts seeding');
    }

    const blogPostRepository = AppDataSource.getRepository(BlogPost);

    // Clear existing blog posts
    await blogPostRepository.query('TRUNCATE TABLE blog_posts CASCADE');
    console.log('Cleared existing blog posts');

    for (const postData of blogPostsData) {
      const post = blogPostRepository.create(postData);
      await blogPostRepository.save(post);
      console.log(`Created blog post: ${postData.title}`);
    }

    console.log(`✅ Successfully seeded ${blogPostsData.length} blog posts`);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
  } finally {
    if (shouldCloseConnection && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

if (require.main === module) {
  seedBlogPosts();
}

export { seedBlogPosts };
