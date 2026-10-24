// src/server/index.ts
import express from "express";
import { existsSync } from "node:fs";
import { resolve as resolve2 } from "node:path";

// src/content/lab.ts
var statuses = [
  {
    status: "ACTIVE",
    meaning: "Exists and is usable.",
    claim: "Features, demos, pricing."
  },
  {
    status: "BUILDING",
    meaning: "In development with something showable.",
    claim: "Architecture, progress."
  },
  {
    status: "RESEARCHING",
    meaning: "Investigating, no product.",
    claim: "Questions, hypotheses."
  },
  {
    status: "PLANNED",
    meaning: "Intended, not started.",
    claim: "Problem and direction only."
  }
];
var lab = {
  name: "Xylvanthrex Labs",
  kicker: "Independent research lab",
  location: "Karachi, Pakistan",
  positioning: "We research what doesn't exist yet, then build the companies to ship it.",
  modelLine: "Research / Ventures / Products",
  about: "Xylvanthrex Labs is an independent research lab working across systems, AI, infrastructure, hardware, and security. When research produces something that can stand alone, we spin it into a company. One venture is active today. The rest are in research or planned, and we label each one honestly.",
  aboutNote: "The lab is a producer. It does not sell a single product; it produces companies and holds them. Today it holds five units: four ventures and one research division."
};
var ventures = [
  {
    slug: "menseries",
    index: "01",
    name: "Menseries",
    kind: "AI Venture",
    layer: "Venture",
    status: "ACTIVE",
    buildOrder: 1,
    summary: "An advanced AI system and a studio family.",
    problem: "Most AI products are thin wrappers, and most software is built slowly with inconsistent quality.",
    direction: "One venture ships an advanced AI system, and uses the same capability to build software through one studio family with three offers.",
    thesis: "The AI system is the research. The studio family is the same capability pointed at other people\u2019s software. One venture does both, so the tooling and the work improve each other.",
    state: "Web Studio is first to market. The Advanced AI Chatbot is in development; there is no public demo yet.",
    is: [
      "One venture with one AI system and one studio family.",
      "Three offers under one identity: Web Studio, App Studio, Software Studio.",
      "Software Studio is a service and a system for building software, with dedicated setups per domain."
    ],
    isNot: [
      "Not three separate companies.",
      "Not an IDE, an editor, or an all-in-one tool.",
      "Not a claim that the chatbot is finished."
    ],
    exists: [
      "The studio family. Web Studio is first to market.",
      "The Advanced AI Chatbot, in development. There is no public demo yet.",
      "A separate venture site, to be published later."
    ],
    offerings: [
      {
        name: "Advanced AI Chatbot",
        kind: "Product",
        status: "BUILDING",
        note: "The flagship. Demonstrations are arranged on request; there is no public demo yet."
      },
      {
        name: "Studio family",
        kind: "Studio family",
        status: "ACTIVE",
        note: "Web Studio, App Studio and Software Studio. One identity, three offers. Web Studio is first to market."
      }
    ],
    siteNote: "This venture will have its own site later. Until then, this introduction is the whole public record.",
    featured: true
  },
  {
    slug: "cloud",
    index: "02",
    name: "Cloud Venture",
    kind: "Cloud infrastructure",
    layer: "Venture",
    status: "PLANNED",
    buildOrder: 2,
    summary: "Infrastructure shaped by the lab\u2019s own systems.",
    problem: "Infrastructure is built for generic workloads, while the lab\u2019s own systems have specific needs.",
    direction: "Infrastructure designed around the lab\u2019s own products first, then offered to others.",
    thesis: "The first customer is the lab. If the infrastructure is right for the systems the lab actually runs, it may be right for others with the same shape of problem.",
    state: "Not started. No product, no site, no date.",
    is: ["A research direction for infrastructure shaped by the lab\u2019s own products."],
    isNot: ["Not another hyperscaler.", "Not a hosting reseller."],
    exists: ["Nothing public. This is a problem statement and a direction, not a product."],
    siteNote: "No site, no product and no date. It is not started."
  },
  {
    slug: "hardware",
    index: "03",
    name: "Hardware Venture",
    kind: "Compute",
    layer: "Venture",
    status: "PLANNED",
    buildOrder: 3,
    summary: "Compute designed with the software that runs on it.",
    problem: "Compute is designed apart from the software that runs on it.",
    direction: "Compute designed alongside the software that runs on it.",
    thesis: "When hardware and software are designed together, the constraints are shared instead of discovered late.",
    state: "Not started. No product, no site, no date.",
    is: ["A research direction for compute designed with its software."],
    isNot: [
      "Not a promise to manufacture.",
      "No chips, products, or timelines are announced."
    ],
    exists: ["Nothing public. Problem and direction only."],
    siteNote: "No site, no product and no date. It is not started."
  },
  {
    slug: "post-quantum-security",
    index: "04",
    name: "Post-Quantum Security",
    kind: "Security",
    layer: "Venture",
    status: "PLANNED",
    buildOrder: 4,
    summary: "Systems that stay secure after today\u2019s cryptography breaks.",
    problem: "Data encrypted today has to stay unreadable after quantum computers can break today\u2019s cryptography.",
    direction: "Systems that stay secure after quantum computers can break today\u2019s cryptography.",
    thesis: "Security has to be designed for the machine that arrives later, not only the one that exists now.",
    state: "Not started. No product, no site, no date.",
    is: ["Research into post-quantum security for systems that must outlive today\u2019s cryptography."],
    isNot: [
      "Not security that uses quantum hardware.",
      "Not \u201Cquantum cybersecurity\u201D or \u201Cquantum-powered\u201D anything."
    ],
    exists: ["Nothing public. Problem and direction only."],
    siteNote: "No site, no product and no date. It is not started."
  },
  {
    slug: "quantum-research",
    index: "05",
    name: "Quantum Research",
    kind: "Research division",
    layer: "Division",
    status: "RESEARCHING",
    buildOrder: 5,
    summary: "Open questions, notes, and later papers.",
    problem: "The questions quantum technology raises are ahead of the systems that will answer them.",
    direction: "Open questions, notes, and later papers. A research arm, not a company.",
    thesis: "Research comes before the venture. If a question produces something that can stand alone, it can be spun out later.",
    state: "No papers yet. The first three questions are being written.",
    is: ["A division: open questions, notes, and later papers."],
    isNot: ["Not a venture.", "Not a startup.", "Not a product announcement."],
    exists: [
      "A research agenda. The first three questions are being written; they will be published when they exist.",
      "No papers yet. No findings yet."
    ],
    siteNote: "This is a division, not a company. It will never be listed with the ventures\u2019 statuses."
  }
];
var boardRows = [
  {
    name: "Menseries",
    layer: "Venture",
    status: "ACTIVE",
    meta: "Advanced AI system and studio family",
    href: "/ventures#menseries"
  },
  {
    name: "Advanced AI Chatbot",
    layer: "Product",
    status: "BUILDING",
    meta: "No public demo yet",
    href: "/ventures#menseries"
  },
  {
    name: "Studio family",
    layer: "Studio",
    status: "ACTIVE",
    meta: "Web \xB7 App \xB7 Software",
    href: "/ventures#menseries"
  },
  {
    name: "Cloud Venture",
    layer: "Venture",
    status: "PLANNED",
    meta: "Problem and direction",
    href: "/ventures#cloud"
  },
  {
    name: "Hardware Venture",
    layer: "Venture",
    status: "PLANNED",
    meta: "Problem and direction",
    href: "/ventures#hardware"
  },
  {
    name: "Post-Quantum Security",
    layer: "Venture",
    status: "PLANNED",
    meta: "Problem and direction",
    href: "/ventures#post-quantum-security"
  },
  {
    name: "Quantum Research",
    layer: "Division",
    status: "RESEARCHING",
    meta: "Agenda; questions in progress",
    href: "/ventures#quantum-research"
  }
];
var pageDescriptions = {
  "/": lab.positioning,
  "/ventures": "Introductions to the five units Xylvanthrex Labs holds: four ventures and one research division, each with an honest status.",
  "/research": "The lab\u2019s research agenda: eight areas, the Quantum Research division, and how research becomes a venture.",
  "/philosophy": "How the lab works. Problem first, one claim per sentence, and the refusals that keep the site honest.",
  "/about": "Xylvanthrex Labs is an independent research lab in Karachi, Pakistan. One founder, five units, honest labels.",
  "/contact": "Register interest in a venture or write to the lab. One list, five units, no invented response times."
};
function statusCounts() {
  const counts = {
    ACTIVE: 0,
    BUILDING: 0,
    RESEARCHING: 0,
    PLANNED: 0
  };
  for (const row of boardRows) counts[row.status] += 1;
  return counts;
}
var nav = [
  { label: "Ventures", href: "/ventures" },
  { label: "Research", href: "/research" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

// src/server/db.ts
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
var dataDir = resolve(process.cwd(), "data");
mkdirSync(dataDir, { recursive: true });
var db = new DatabaseSync(resolve(dataDir, "xylvanthrex.sqlite"));
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS waitlist (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT    NOT NULL,
    venture    TEXT    NOT NULL,
    note       TEXT    NOT NULL DEFAULT '',
    source     TEXT    NOT NULL DEFAULT 'lab',
    created_at TEXT    NOT NULL
  );

  CREATE INDEX IF NOT EXISTS waitlist_venture_idx ON waitlist (venture);
  CREATE INDEX IF NOT EXISTS waitlist_created_idx ON waitlist (created_at);
`);
function addWaitlistEntry(entry) {
  const statement = db.prepare(`
    INSERT INTO waitlist (email, venture, note, source, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = statement.run(
    entry.email,
    entry.venture,
    entry.note,
    entry.source,
    (/* @__PURE__ */ new Date()).toISOString()
  );
  return Number(result.lastInsertRowid);
}

// src/server/index.ts
var PORT = Number(process.env.PORT ?? 8787);
var IS_PROD = process.env.NODE_ENV === "production";
var CLIENT_DIR = resolve2(process.cwd(), "dist/client");
var HAS_CLIENT_BUILD = existsSync(resolve2(CLIENT_DIR, "index.html"));
var app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  if (IS_PROD) {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self'",
        "img-src 'self' data:",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ].join("; ")
    );
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});
app.use((req, res, next) => {
  const started = performance.now();
  res.on("finish", () => {
    const ms = Math.round(performance.now() - started);
    console.log(`${req.method} ${req.path} ${res.statusCode} ${ms}ms`);
  });
  next();
});
var RATE_WINDOW_MS = 10 * 60 * 1e3;
var RATE_MAX = 6;
var rateBuckets = /* @__PURE__ */ new Map();
function isRateLimited(key) {
  const now = Date.now();
  const hits = (rateBuckets.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateBuckets.set(key, hits);
  if (rateBuckets.size > 5e3) {
    for (const [k, v] of rateBuckets) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) rateBuckets.delete(k);
    }
  }
  return hits.length > RATE_MAX;
}
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var ALLOWED_VENTURES = /* @__PURE__ */ new Set([...ventures.map((v) => v.slug), "any"]);
function asString(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "xylvanthrex-labs",
    storage: "sqlite",
    time: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get("/api/statuses", (_req, res) => {
  res.json({ statuses, counts: statusCounts() });
});
app.get("/api/board", (_req, res) => {
  res.json({
    rows: boardRows,
    counts: statusCounts(),
    total: boardRows.length,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get("/api/ventures", (_req, res) => {
  res.json({ ventures, count: ventures.length });
});
app.get("/api/ventures/:slug", (req, res) => {
  const venture = ventures.find((v) => v.slug === req.params.slug);
  if (!venture) {
    res.status(404).json({ ok: false, error: "No unit with that slug." });
    return;
  }
  res.json({ venture });
});
app.get("/api/lab", (_req, res) => {
  res.json({
    lab,
    nav,
    statuses,
    counts: statusCounts(),
    units: ventures.map((v) => ({
      slug: v.slug,
      name: v.name,
      kind: v.kind,
      layer: v.layer,
      status: v.status
    }))
  });
});
app.post("/api/waitlist", (req, res) => {
  const body = req.body ?? {};
  const honeypot = asString(body.company_website, 200);
  if (honeypot) {
    res.status(201).json({ ok: true, message: "Saved. We only write when there is something real to share." });
    return;
  }
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  if (isRateLimited(`waitlist:${ip}`)) {
    res.status(429).json({
      ok: false,
      error: "Too many attempts. Try again later, or come back tomorrow."
    });
    return;
  }
  const email = asString(body.email, 254).toLowerCase();
  const venture = asString(body.venture, 60) || "any";
  const note = asString(body.note, 1200);
  const source = asString(body.source, 40) || "lab";
  const errors = {};
  if (!email) errors.email = "An email address is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "That does not look like an email address.";
  if (!ALLOWED_VENTURES.has(venture)) errors.venture = "Choose one of the listed units.";
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }
  try {
    const id = addWaitlistEntry({ email, venture, note, source });
    res.status(201).json({
      ok: true,
      id,
      message: "Saved. We only write when there is something real to share."
    });
  } catch (error) {
    console.error("waitlist insert failed", error);
    res.status(500).json({ ok: false, error: "The entry could not be saved. Try again." });
  }
});
app.use("/api", (_req, res) => {
  res.status(404).json({ ok: false, error: "Unknown API route." });
});
if (HAS_CLIENT_BUILD) {
  app.use(
    express.static(CLIENT_DIR, {
      index: false,
      setHeaders: (res, path) => {
        if (path.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
        else if (path.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }
      }
    })
  );
  app.get("*", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(resolve2(CLIENT_DIR, "index.html"));
  });
} else {
  app.get("*", (_req, res) => {
    res.status(503).type("text/plain").send(
      "The client build is missing. Run `npm run dev` for the development server, or `npm run build` and `npm start` for production."
    );
  });
}
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ ok: false, error: "The request body is not valid JSON." });
    return;
  }
  console.error("unhandled error", error);
  res.status(500).json({ ok: false, error: "Something failed on the server." });
});
app.listen(PORT, () => {
  console.log(
    `Xylvanthrex Labs API listening on http://localhost:${PORT} (${IS_PROD ? "production" : "development"}${HAS_CLIENT_BUILD ? ", serving dist/client" : ", client served by Vite"})`
  );
});
