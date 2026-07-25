module.exports = [
  {
    slug: "spendly",
    name: "Spendly",
    index: "01",
    tagline: "Track every rupee. Own your finances.",
    summary: "A personal expense tracker built around real bookkeeping, not just a log of numbers.",
    description:
      "Register, log in, record expenses and income, link them to accounts, and see an always-accurate picture of your spending by category and date range — amounts rendered in ₹.",
    features: [
      "Auth — secure registration and login, session-based, passwords hashed with Werkzeug",
      "Profile dashboard — date-range filtering (this month / 3 months / 6 months / all-time), income vs. expense stats, net balance, top spending category, full category breakdown",
      "Expense tracking — full CRUD, categorized, tagged with payment method, optionally linked to an account",
      "Income tracking — full CRUD, categorized, linked to an account",
      "Accounts — multiple accounts with running balances that reconcile automatically on every add, edit, or delete",
      "Analytics — on the roadmap; currently a “Coming Soon” placeholder page"
    ],
    process:
      "Developed as a disciplined, spec-driven project: every feature starts as a written spec with a testable definition of done, and black-box tests are written against that spec — not the implementation — before the feature ships.",
    whoFor:
      "Anyone who wants a simple, self-hosted expense tracker with real account-balance bookkeeping under the hood rather than just a spreadsheet of transactions.",
    stack: ["Python", "Flask", "SQLite", "Jinja2", "Vanilla CSS/JS", "Werkzeug", "pytest"],
    repo: "https://github.com/tejash5489-lang/spendly",
    color: "#c8ff4d",
    images: [
      { src: "/images/projects/spendly-1.png", caption: "Profile dashboard — spending stats, account balances, category breakdown" },
      { src: "/images/projects/spendly-2.png", caption: "Accounts — running balances that reconcile automatically" }
    ]
  },
  {
    slug: "rag-roadmap",
    name: "RAG Roadmap",
    index: "02",
    tagline: "Chat with your PDFs — powered by a production-grade retrieval pipeline, not a toy demo.",
    summary: "Upload a PDF, ask it questions in plain English, get concise answers with source passages cited.",
    description:
      "Upload a PDF, ask it questions in plain English, and get back concise answers with the source passages cited — no manual searching through pages required.",
    features: [
      "Ingestion — PDFs parsed with PyMuPDF and split into overlapping chunks (1,000 chars, 200 overlap) via LlamaIndex's sentence splitter",
      "Embeddings — each chunk embedded with Google's gemini-embedding-001 model (3,072 dimensions)",
      "Vector search — embeddings stored and queried in Qdrant using cosine similarity",
      "Answer generation — retrieved context passed to Groq-hosted Llama 3.3 70B for grounded, cited answers",
      "Orchestration — ingestion and query modeled as durable, event-driven functions via Inngest — each step can be retried, logged, and observed",
      "Interface — a Streamlit front end for upload, ingestion status, and a simple Q&A form with sources listed"
    ],
    process:
      "Built as an event-driven pipeline rather than a fire-and-forget script — every ingestion and query step is independently retryable and observable via Inngest.",
    whoFor:
      "Developers or teams who want to search and query long documents (manuals, reports, research papers) conversationally, with an architecture built to scale past a single notebook demo.",
    stack: ["Python", "FastAPI", "Inngest", "Qdrant", "Gemini Embeddings", "Groq / Llama 3.3 70B", "LlamaIndex", "PyMuPDF", "Streamlit"],
    repo: "https://github.com/tejash5489-lang/RAGprodapp",
    color: "#ff5b3d",
    images: [
      { src: "/images/projects/rag-roadmap-1.png", caption: "Upload a PDF, watch it get ingested into the knowledge base" },
      { src: "/images/projects/rag-roadmap-2.png", caption: "A grounded answer generated live via Groq, with sources cited" }
    ]
  },
  {
    slug: "finance-planner",
    name: "Finance Planner",
    index: "03",
    tagline: "One place to see where your money goes, plan where it should go next, and track your net worth over time.",
    summary: "A full personal finance web app — dashboard, transactions, budgets, goals, net worth, alerts.",
    description:
      "A full personal finance web app covering the core loop of managing money: log in securely, see a dashboard of your finances, record transactions, set budgets, track goals, monitor net worth, and get alerts — all in one interface.",
    features: [
      "Dashboard — at-a-glance overview of your finances",
      "Transactions — log and review spending and income",
      "Budgets — set and track spending limits by category",
      "Goals — define savings/financial targets and track progress",
      "Net Worth — track assets vs. liabilities over time",
      "Alerts — get notified of things that need attention",
      "Dedicated Auth flow, plus account Settings"
    ],
    process:
      "Built as a React SPA on a separate Express/MongoDB backend — a broader, multi-user-capable counterpart to Spendly's single-user, server-rendered approach.",
    whoFor:
      "Anyone who wants a single, self-hosted dashboard for budgeting, goal-tracking, and net-worth monitoring — with full control over their own financial data rather than relying on a third-party app.",
    stack: ["React 19", "TypeScript", "React Router", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Mongoose"],
    repo: "https://github.com/tejash5489-lang/finance-planner",
    color: "#7dd3fc",
    images: [
      { src: "/images/projects/finance-planner-1.png", caption: "Dashboard — net cash flow, budget usage, wealth mix" },
      { src: "/images/projects/finance-planner-2.png", caption: "Transactions — the single source of truth driving budgets and net worth" },
      { src: "/images/projects/finance-planner-3.png", caption: "Net Worth — assets vs. liabilities, built automatically from transactions" }
    ]
  }
];
