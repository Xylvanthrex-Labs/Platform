/**
 * Single content source for the lab site. Rendered by the client and served by
 * the API. Every claim here is traceable to xylvanthrex-framing.md; the fields
 * that the spec marks [TBD] are deliberately absent rather than invented.
 */

export type Status = 'ACTIVE' | 'BUILDING' | 'RESEARCHING' | 'PLANNED'

export type LayerName = 'Lab' | 'Division' | 'Venture' | 'Product'

export interface StatusMeta {
  status: Status
  meaning: string
  claim: string
}

export const statuses: StatusMeta[] = [
  {
    status: 'ACTIVE',
    meaning: 'Exists and is usable.',
    claim: 'Features, demos, pricing.',
  },
  {
    status: 'BUILDING',
    meaning: 'In development with something showable.',
    claim: 'Architecture, progress.',
  },
  {
    status: 'RESEARCHING',
    meaning: 'Investigating, no product.',
    claim: 'Questions, hypotheses.',
  },
  {
    status: 'PLANNED',
    meaning: 'Intended, not started.',
    claim: 'Problem and direction only.',
  },
]

export const lab = {
  name: 'Xylvanthrex Labs',
  kicker: 'Independent research lab',
  location: 'Karachi, Pakistan',
  positioning: "We research what doesn't exist yet, then build the companies to ship it.",
  modelLine: 'Research / Ventures / Products',
  about:
    "Xylvanthrex Labs is an independent research lab working across systems, AI, infrastructure, hardware, and security. When research produces something that can stand alone, we spin it into a company. One venture is active today. The rest are in research or planned, and we label each one honestly.",
  aboutNote:
    'The lab is a producer. It does not sell a single product; it produces companies and holds them. Today it holds five units: four ventures and one research division.',
}

export const founder = {
  handle: 'dedsd',
  role: 'Solo founder and systems engineer',
  location: 'Karachi, Pakistan',
  bio: 'dedsd is the lab’s solo founder and systems engineer, based in Karachi, Pakistan. The lab is one person today. Every page here is written not to imply a team.',
  note: 'No implied team.',
}

export interface Layer {
  index: string
  name: LayerName
  definition: string
  question: string
  note: string
}

export const layers: Layer[] = [
  {
    index: '01',
    name: 'Lab',
    definition: 'The research thesis and philosophy.',
    question: 'What do they believe and investigate?',
    note: 'One lab. It sets the questions.',
  },
  {
    index: '02',
    name: 'Division',
    definition: 'A research area that is not yet a company.',
    question: 'What are they exploring?',
    note: 'Researching, not selling.',
  },
  {
    index: '03',
    name: 'Venture',
    definition: 'A company the lab produced.',
    question: 'What does this company do?',
    note: 'Spun out only when it can stand alone.',
  },
  {
    index: '04',
    name: 'Product',
    definition: 'A specific offering of a venture.',
    question: 'What can I use or buy?',
    note: 'The only layer that carries pricing.',
  },
]

export interface Offering {
  name: string
  kind: 'Product' | 'Studio family'
  status: Status
  note: string
}

export interface Venture {
  slug: string
  index: string
  name: string
  kind: string
  layer: 'Venture' | 'Division'
  status: Status
  buildOrder: number
  summary: string
  problem: string
  direction: string
  thesis: string
  state: string
  is: string[]
  isNot: string[]
  exists: string[]
  offerings?: Offering[]
  siteNote: string
  featured?: boolean
}

export const ventures: Venture[] = [
  {
    slug: 'menseries',
    index: '01',
    name: 'Menseries',
    kind: 'AI Venture',
    layer: 'Venture',
    status: 'ACTIVE',
    buildOrder: 1,
    summary: 'An advanced AI system and a studio family.',
    problem:
      'Most AI products are thin wrappers, and most software is built slowly with inconsistent quality.',
    direction:
      'One venture ships an advanced AI system, and uses the same capability to build software through one studio family with three offers.',
    thesis:
      'The AI system is the research. The studio family is the same capability pointed at other people’s software. One venture does both, so the tooling and the work improve each other.',
    state:
      'Web Studio is first to market. The Advanced AI Chatbot is in development; there is no public demo yet.',
    is: [
      'One venture with one AI system and one studio family.',
      'Three offers under one identity: Web Studio, App Studio, Software Studio.',
      'Software Studio is a service and a system for building software, with dedicated setups per domain.',
    ],
    isNot: [
      'Not three separate companies.',
      'Not an IDE, an editor, or an all-in-one tool.',
      'Not a claim that the chatbot is finished.',
    ],
    exists: [
      'The studio family. Web Studio is first to market.',
      'The Advanced AI Chatbot, in development. There is no public demo yet.',
      'A separate venture site, to be published later.',
    ],
    offerings: [
      {
        name: 'Advanced AI Chatbot',
        kind: 'Product',
        status: 'BUILDING',
        note: 'The flagship. Demonstrations are arranged on request; there is no public demo yet.',
      },
      {
        name: 'Studio family',
        kind: 'Studio family',
        status: 'ACTIVE',
        note: 'Web Studio, App Studio and Software Studio. One identity, three offers. Web Studio is first to market.',
      },
    ],
    siteNote:
      'This venture will have its own site later. Until then, this introduction is the whole public record.',
    featured: true,
  },
  {
    slug: 'cloud',
    index: '02',
    name: 'Cloud Venture',
    kind: 'Cloud infrastructure',
    layer: 'Venture',
    status: 'PLANNED',
    buildOrder: 2,
    summary: 'Infrastructure shaped by the lab’s own systems.',
    problem:
      'Infrastructure is built for generic workloads, while the lab’s own systems have specific needs.',
    direction:
      'Infrastructure designed around the lab’s own products first, then offered to others.',
    thesis:
      'The first customer is the lab. If the infrastructure is right for the systems the lab actually runs, it may be right for others with the same shape of problem.',
    state: 'Not started. No product, no site, no date.',
    is: ['A research direction for infrastructure shaped by the lab’s own products.'],
    isNot: ['Not another hyperscaler.', 'Not a hosting reseller.'],
    exists: ['Nothing public. This is a problem statement and a direction, not a product.'],
    siteNote: 'No site, no product and no date. It is not started.',
  },
  {
    slug: 'hardware',
    index: '03',
    name: 'Hardware Venture',
    kind: 'Compute',
    layer: 'Venture',
    status: 'PLANNED',
    buildOrder: 3,
    summary: 'Compute designed with the software that runs on it.',
    problem: 'Compute is designed apart from the software that runs on it.',
    direction: 'Compute designed alongside the software that runs on it.',
    thesis:
      'When hardware and software are designed together, the constraints are shared instead of discovered late.',
    state: 'Not started. No product, no site, no date.',
    is: ['A research direction for compute designed with its software.'],
    isNot: [
      'Not a promise to manufacture.',
      'No chips, products, or timelines are announced.',
    ],
    exists: ['Nothing public. Problem and direction only.'],
    siteNote: 'No site, no product and no date. It is not started.',
  },
  {
    slug: 'post-quantum-security',
    index: '04',
    name: 'Post-Quantum Security',
    kind: 'Security',
    layer: 'Venture',
    status: 'PLANNED',
    buildOrder: 4,
    summary: 'Systems that stay secure after today’s cryptography breaks.',
    problem:
      'Data encrypted today has to stay unreadable after quantum computers can break today’s cryptography.',
    direction:
      'Systems that stay secure after quantum computers can break today’s cryptography.',
    thesis:
      'Security has to be designed for the machine that arrives later, not only the one that exists now.',
    state: 'Not started. No product, no site, no date.',
    is: ['Research into post-quantum security for systems that must outlive today’s cryptography.'],
    isNot: [
      'Not security that uses quantum hardware.',
      'Not “quantum cybersecurity” or “quantum-powered” anything.',
    ],
    exists: ['Nothing public. Problem and direction only.'],
    siteNote: 'No site, no product and no date. It is not started.',
  },
  {
    slug: 'quantum-research',
    index: '05',
    name: 'Quantum Research',
    kind: 'Research division',
    layer: 'Division',
    status: 'RESEARCHING',
    buildOrder: 5,
    summary: 'Open questions, notes, and later papers.',
    problem:
      'The questions quantum technology raises are ahead of the systems that will answer them.',
    direction: 'Open questions, notes, and later papers. A research arm, not a company.',
    thesis:
      'Research comes before the venture. If a question produces something that can stand alone, it can be spun out later.',
    state: 'No papers yet. The first three questions are being written.',
    is: ['A division: open questions, notes, and later papers.'],
    isNot: ['Not a venture.', 'Not a startup.', 'Not a product announcement.'],
    exists: [
      'A research agenda. The first three questions are being written; they will be published when they exist.',
      'No papers yet. No findings yet.',
    ],
    siteNote: 'This is a division, not a company. It will never be listed with the ventures’ statuses.',
  },
]

export interface BoardRow {
  name: string
  layer: string
  status: Status
  meta: string
  href: string
}

export const boardRows: BoardRow[] = [
  {
    name: 'Menseries',
    layer: 'Venture',
    status: 'ACTIVE',
    meta: 'Advanced AI system and studio family',
    href: '/ventures#menseries',
  },
  {
    name: 'Advanced AI Chatbot',
    layer: 'Product',
    status: 'BUILDING',
    meta: 'No public demo yet',
    href: '/ventures#menseries',
  },
  {
    name: 'Studio family',
    layer: 'Studio',
    status: 'ACTIVE',
    meta: 'Web · App · Software',
    href: '/ventures#menseries',
  },
  {
    name: 'Cloud Venture',
    layer: 'Venture',
    status: 'PLANNED',
    meta: 'Problem and direction',
    href: '/ventures#cloud',
  },
  {
    name: 'Hardware Venture',
    layer: 'Venture',
    status: 'PLANNED',
    meta: 'Problem and direction',
    href: '/ventures#hardware',
  },
  {
    name: 'Post-Quantum Security',
    layer: 'Venture',
    status: 'PLANNED',
    meta: 'Problem and direction',
    href: '/ventures#post-quantum-security',
  },
  {
    name: 'Quantum Research',
    layer: 'Division',
    status: 'RESEARCHING',
    meta: 'Agenda; questions in progress',
    href: '/ventures#quantum-research',
  },
]

export interface ResearchArea {
  index: string
  name: string
  line: string
}

export const researchAreas: ResearchArea[] = [
  {
    index: '01',
    name: 'Computer architecture',
    line: 'How processors, memory and interconnects are organised, and where the limits actually sit.',
  },
  {
    index: '02',
    name: 'OS internals',
    line: 'Scheduling, memory, filesystems and the parts of an operating system that shape everything above them.',
  },
  {
    index: '03',
    name: 'Compilers',
    line: 'How source becomes machine work, and what a compiler can prove about the result.',
  },
  {
    index: '04',
    name: 'Distributed systems',
    line: 'Agreement, failure and time across machines that cannot see each other.',
  },
  {
    index: '05',
    name: 'Databases',
    line: 'Storage, query and consistency: the systems that keep state honest.',
  },
  {
    index: '06',
    name: 'Cybersecurity',
    line: 'Threat models, cryptography and the assumptions a system quietly depends on.',
  },
  {
    index: '07',
    name: 'Cloud engineering',
    line: 'Infrastructure as a designed system, not a pile of services.',
  },
  {
    index: '08',
    name: 'AI',
    line: 'Systems that learn, and the engineering needed to make them dependable.',
  },
]

export interface Principle {
  index: string
  title: string
  body: string
}

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Problem first',
    body: 'Every unit opens with what is broken. A description that starts with the product is a sales page.',
  },
  {
    index: '02',
    title: 'One claim per sentence',
    body: 'Short sentences. A claim that needs qualifiers gets rewritten, not decorated.',
  },
  {
    index: '03',
    title: 'Stage is not shame',
    body: '“We haven’t built this yet” is a complete answer. Inflation is a debt the reader pays later.',
  },
]

export const refusals: string[] = [
  'We don’t call the lab a startup, an agency, a tech company, or a consultancy.',
  'We don’t present the three studios as three companies.',
  'We don’t call Software Studio an IDE.',
  'We don’t publish dates for units that are not active.',
  'We don’t invent metrics, logos, testimonials, or case studies.',
]

export interface MethodCard {
  index: string
  title: string
  body: string
}

export const methods: MethodCard[] = [
  {
    index: '01',
    title: 'Research',
    body: 'Start with a problem, not a product. A thesis has to survive contact with the literature before anything is built.',
  },
  {
    index: '02',
    title: 'Build',
    body: 'When the research produces something testable, it gets built. Building is how a thesis is falsified.',
  },
  {
    index: '03',
    title: 'Label',
    body: 'Every unit carries exactly one status: ACTIVE, BUILDING, RESEARCHING or PLANNED. The label is the claim.',
  },
  {
    index: '04',
    title: 'Spin out',
    body: 'A unit becomes a company only when a working product or demo exists, a paying customer exists, or someone besides the founder works on it.',
  },
]

export interface Note {
  title: string
  body: string
  state: string
}

export const researchNotes: Note[] = [
  {
    title: 'The first three questions',
    body: 'The Quantum Research division is writing its first three questions. They will be published when they exist, not before.',
    state: 'In progress',
  },
  {
    title: 'No papers yet',
    body: 'There are no papers, findings or results to publish. This page will change when there are.',
    state: 'Nothing published',
  },
]

export const pageDescriptions: Record<string, string> = {
  '/': lab.positioning,
  '/ventures':
    'Introductions to the five units Xylvanthrex Labs holds: four ventures and one research division, each with an honest status.',
  '/research':
    'The lab’s research agenda: eight areas, the Quantum Research division, and how research becomes a venture.',
  '/philosophy':
    'How the lab works. Problem first, one claim per sentence, and the refusals that keep the site honest.',
  '/about':
    'Xylvanthrex Labs is an independent research lab in Karachi, Pakistan. One founder, five units, honest labels.',
  '/contact':
    'Register interest in a venture or write to the lab. One list, five units, no invented response times.',
}

export function statusCounts() {
  const counts: Record<Status, number> = {
    ACTIVE: 0,
    BUILDING: 0,
    RESEARCHING: 0,
    PLANNED: 0,
  }
  for (const row of boardRows) counts[row.status] += 1
  return counts
}

export function getVenture(slug: string): Venture | undefined {
  return ventures.find((v) => v.slug === slug)
}

export const nav = [
  { label: 'Ventures', href: '/ventures' },
  { label: 'Research', href: '/research' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
