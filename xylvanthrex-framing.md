# XYLVANTHREX LABS: FRAMING SPEC (AI-READABLE)

Purpose of this file: give any AI system complete, unambiguous context to write copy, design, or build websites for Xylvanthrex Labs and its ventures. Treat everything here as the source of truth. If something is missing, use the marker `[TBD]` and ask the founder. Never invent facts, products, customers, dates, metrics, or team members.

---

## 1. ENTITY DEFINITIONS

```yaml
founder:
  handle: dedsd
  role: solo founder and systems engineer
  location: Karachi, Pakistan
  note: only one person works on this today. Do not imply a team.

lab:
  name: Xylvanthrex Labs
  type: independent research lab that produces companies (holding/producer structure)
  is_not: [a startup, an agency, a "tech company", a consultancy]
  positioning_line: "We research what doesn't exist yet, then build the companies to ship it."
  research_areas: [computer architecture, OS internals, compilers, distributed systems, databases, cybersecurity, cloud engineering, AI]
```

### Hierarchy (four layers; never mix them in copy or navigation)

| Layer | Definition | Visitor question it answers |
|---|---|---|
| Lab | Research thesis and philosophy | What do they believe and investigate? |
| Division | A research area that is not yet a company | What are they exploring? |
| Venture | A company the lab produced | What does this company sell? |
| Product / Studio | A specific offering of a venture | What can I use or buy? |

```
Xylvanthrex Labs (Lab)
├── AI Venture                      status: ACTIVE
│   ├── Advanced AI Chatbot         (Product)
│   ├── Web Studio                  (Studio, specialized web development)
│   ├── App Studio                  (Studio, specialized app development)
│   └── Software Studio             (Studio, a system and setup for building software)
├── Cloud Venture                   status: PLANNED
├── Hardware Venture                status: PLANNED
├── Post-Quantum Security Venture   status: PLANNED
└── Quantum Research (Division)     status: RESEARCHING (not a venture)
```

Venture build order (founder's stated sequence): 1) AI, 2) Cloud, 3) Hardware, 4) Quantum security, 5) Quantum technology research. Only #1 is being worked on now. More products may be added later as research progresses; do not list unannounced ones.

---

## 2. UNIT SPECIFICATIONS

### 2.1 AI Venture (ACTIVE)
- Problem: most AI products are thin wrappers; most software is built slowly with inconsistent quality.
- Thesis: one venture ships an advanced AI system and uses the same capability to build software for others faster and better.
- Offerings:
  - **Advanced AI Chatbot**: flagship product. Differentiator: `[TBD, ask founder; if absent, do not make the chatbot the hero claim]`.
  - **Web Studio**, **App Studio**, **Software Studio**: ONE studio family under one identity, three offers. Not three companies.
  - **Software Studio** is a *service and system for building software with dedicated setups per domain* (web, app, other). It is NOT an IDE and NOT an all-in-one tool like VS Code. Never describe it as an editor.
- Revenue logic (internal, do not state publicly): studios earn; chatbot is the showcase and R&D proof.
- Public brand name: `[TBD]`. Endorsement line: "A Xylvanthrex Labs venture."

### 2.2 Cloud Venture (PLANNED)
- Problem (draft): infrastructure is built for generic workloads, while the lab's own systems have specific needs.
- Thesis: infrastructure designed around the lab's own products first, then offered to others.
- Is not: another hyperscaler or a hosting reseller.

### 2.3 Hardware Venture (PLANNED)
- Thesis: compute designed alongside the software that runs on it.
- Is not: a promise to manufacture. Do not mention chips, products, or timelines.

### 2.4 Post-Quantum Security Venture (PLANNED)
- Use the term **"post-quantum security"** in public copy. Do NOT use "quantum cybersecurity" or "quantum-powered".
- Thesis: systems that must stay secure after quantum computers can break today's cryptography.
- Is not: security that uses quantum hardware (unless the founder states it does).

### 2.5 Quantum Research (DIVISION)
- The lab's research arm, not a startup. Content is open questions, notes, later papers.
- Research questions: `[TBD, founder to supply 3 specific questions]`. Do not invent questions or findings.

---

## 3. STATUS SYSTEM (MANDATORY)

Every venture, product, and division carries exactly one status. Use these exact words.

| Status | Meaning | Allowed claims |
|---|---|---|
| ACTIVE | Exists and is usable | features, demos, pricing |
| BUILDING | In development with something showable | architecture, progress |
| RESEARCHING | Investigating, no product | questions, hypotheses |
| PLANNED | Intended, not started | problem and direction only |

Rules:
1. Never write "coming soon" without a status next to it.
2. Never give dates or timelines for non-ACTIVE units.
3. Never imply a PLANNED or RESEARCHING unit has users, customers, or a product.
4. Never invent testimonials, logos, metrics, case studies, or press.

---

## 4. WEBSITE ARCHITECTURE

Build exactly two sites for now.

### Site 1: Lab (`xylvanthrexlabs.com` or `[TBD]`)

| Page | Purpose | Required blocks |
|---|---|---|
| Home | Explain the model in 10 seconds | positioning line; Lab → Venture → Product diagram; venture cards with status badges; one research highlight |
| Ventures | Overview | card per venture: problem, thesis, status |
| Venture detail (`/ventures/cloud`, `/ventures/hardware`, `/ventures/post-quantum-security`) | Depth | problem, thesis, is/is-not, what exists so far, waitlist |
| Research | Show seriousness | agenda, open questions, notes |
| Philosophy | Differentiate | how the lab works, principles, refusals |
| About | Trust | founder background and why |
| Contact / Waitlist | Capture | email + "which venture" dropdown |

### Site 2: AI Venture (own domain `[TBD]`)

| Page | Purpose | Required blocks |
|---|---|---|
| Home | Convert | chatbot demo as hero (only if demo exists; else studio work leads), studio overview, 2-3 proof points |
| Chatbot | Product | what it does, demo, differentiator, pricing or waitlist |
| Studios | Services | one page, three offers, shared process |
| Web / App / Software Studio | Per-offer detail | offer, audience, process, deliverables, pricing model |
| Work | Proof | case studies: problem, approach, result |
| Contact | Leads | project brief form |

Linking: Lab site links to AI site. AI site shows "A Xylvanthrex Labs venture" in footer and About. No other cross-links.

### Spin-out rule
A venture gets its own site only when at least ONE is true: (a) working product or demo, (b) paying customer, (c) someone besides the founder works on it. Otherwise it remains a section on the lab site. Do not create separate sites for Cloud, Hardware, Post-Quantum Security, or Quantum Research.

---

## 5. VOICE AND STYLE

Do:
- Plain, specific, problem-first. Start each venture description with what is broken.
- Honest about stage. "We haven't built this yet" is acceptable and preferred over inflation.
- Technical but readable by a smart non-specialist.
- Short sentences. One claim per sentence.

Do not use these words: revolutionary, cutting-edge, next-gen, world-class, seamless, disrupt, game-changing, synergy, leverage (as verb), unleash, empower. Replace with a concrete claim.

Do not:
- use a name close to "Anthropic" or "Claude" for anything.
- describe the lab as a startup or agency.
- present the three studios as separate companies.
- call Software Studio an IDE.

---

## 6. CANONICAL COPY (use verbatim where marked)

**Home hero (Lab):**
> Xylvanthrex Labs
> We research what doesn't exist yet, then build the companies to ship it.

**Model line:** Research → Ventures → Products.

**About paragraph:**
> Xylvanthrex Labs is an independent research lab working across systems, AI, infrastructure, hardware, and security. When research produces something that can stand alone, we spin it into a company. One venture is active today. The rest are in research or planned, and we label each one honestly.

**Venture card template:**
```
[Name]  [STATUS BADGE]
Problem: one sentence.
Direction: one sentence.
```

---

## 7. LAUNCH ORDER

1. Lab site, minimal: Home, Ventures, Philosophy, Contact.
2. AI venture site, only once there is a demo or 2-3 case studies. Do not launch it empty.
3. Research page, once 3 questions exist.
4. Venture detail pages, one at a time, as each gains something real to show.

---

## 8. OPEN FIELDS (ASK THE FOUNDER BEFORE FINALIZING)

```yaml
ai_venture_name: TBD
first_studio_to_market: TBD   # suggested: Web Studio
chatbot_differentiator: TBD   # one sentence
research_questions: TBD       # three specific questions
lab_domain: TBD
founder_bio_for_about_page: TBD
```

---

## 9. INSTRUCTIONS TO THE AI USING THIS FILE

1. Follow sections 1-5 as constraints. Section 6 is reusable copy.
2. When a needed fact is `[TBD]`, ask. Do not fill it with plausible-sounding content.
3. Keep the four layers separate in navigation, headings, and copy.
4. Check every sentence against the status system before output.
5. When unsure whether a claim is supported, leave it out.
6. Prefer fewer pages done well over placeholder pages.
