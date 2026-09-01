/**
 * Aurex site content.
 *
 * Single source of truth for copy and data. Sections read from here so
 * nothing is buried in JSX.
 *
 * PROOF POLICY
 * Anything with `verified: false` is a placeholder awaiting real client
 * numbers. The proof and case study sections filter on that flag before
 * rendering, so a placeholder is never published as a claim: an unverified
 * stat simply does not appear, and with no verified case studies that
 * section removes itself entirely.
 *
 * Run `npm run check:content` to list everything still outstanding.
 */

export const business = {
  name: "Aurex",
  legalName: "Aurex Agency",
  slogan: "Protect it. Answer it. Grow it.",
  email: "hello@aurexagency.com",
  // TODO(kalob): confirm the public phone number before launch.
  phone: null as string | null,
  region: "North Mississippi",
  serviceArea: "North Mississippi, the Mid South, and the rest of the South",
  url: "https://aurexagency.com",
  cities: [
    "Oxford", "Tupelo", "Southaven", "Olive Branch", "Hernando",
    "Batesville", "New Albany", "Corinth", "Starkville", "Memphis",
  ],
  industries: [
    "Roofing", "HVAC", "Plumbing", "Builders and remodelers",
    "Med spas", "Dental and medical", "Insurance", "Law firms",
  ],
} as const;

/* ---------------------------------------------------------------- 1. HERO */
export const hero = {
  eyebrow: "Growth systems for Southern service businesses",
  headline: "Growth doesn't happen by accident.",
  sub: "We build the systems that turn attention into revenue.",
  cta: { label: "See the system", href: "#problem" },
  altCta: { label: "Build mine", href: "#build" },
};

/* ------------------------------------------------------------ 2. PROBLEM */
export const problem = {
  // These same twelve pieces sort themselves into the four columns in the
  // next chapter. The chaos and the system are literally the same objects.
  fragments: [
    "Google", "Facebook", "Ads",
    "Leads", "Calls", "CRM",
    "Texts", "Email", "Follow-up",
    "Reviews", "Referrals", "Repeat",
  ],
  line1: "Most businesses don't have a marketing problem.",
  line2: "They have a system problem.",
  symptoms: [
    { label: "Missed calls", detail: "Nobody picks up at 4:50 on a Friday. That job goes to whoever does." },
    { label: "Unanswered leads", detail: "A form comes in overnight and sits until somebody remembers it." },
    { label: "Random advertising", detail: "Money goes out. No one can say which dollar brought a job back." },
    { label: "Disconnected software", detail: "Six tools that don't talk, and a spreadsheet holding it together." },
  ],
};

/* ---------------------------------------------------- 3. SIGNAL ACTIVATES */
export const activation = {
  headline: "Aurex connects the pieces.",
  sub: "Marketing. Sales. Automation. Retention. One growth system.",
  columns: [
    { name: "Marketing", items: ["Google", "Facebook", "Ads"] },
    { name: "Sales", items: ["Leads", "Calls", "CRM"] },
    { name: "Automation", items: ["Texts", "Email", "Follow-up"] },
    { name: "Retention", items: ["Reviews", "Referrals", "Repeat"] },
  ],
};

/* ---------------------------------------------------------- 4. ATTENTION */
export const attention = {
  channels: ["Content", "Paid Media", "Search", "Local", "Brand"],
  line1: "Getting attention is easy.",
  line2: "Getting the right attention is what matters.",
  footnote:
    "A thousand strangers are worth less than forty people in your county who need what you do this week.",
};

/* ------------------------------------------------------- 5. LEAD CAPTURE */
export const capture = {
  stages: ["VISITOR", "ENGAGED", "FORM SUBMITTED", "LEAD CAPTURED"],
  line1: "Traffic without infrastructure is expensive noise.",
  line2: "We build the infrastructure.",
  // Illustrative counter. Labelled as such on screen.
  counter: [0, 12, 27, 41, 68],
};

/* ------------------------------------------------------ 6. SPEED TO LEAD */
export const speed = {
  events: [
    { t: "00:01", label: "Lead captured", detail: "Call, form, or DM lands in one inbox" },
    { t: "00:03", label: "SMS sent", detail: "Personal text, in your voice" },
    { t: "00:06", label: "Call initiated", detail: "Ring your phone with the lead on the line" },
    { t: "00:09", label: "Follow-up triggered", detail: "14 day sequence armed if they go quiet" },
    { t: "00:12", label: "Appointment link sent", detail: "Real times off your real calendar" },
    { t: "00:14", label: "Response received", detail: "Booked, before the next company has looked" },
  ],
  freeze: "00:14",
  headline: "Speed changes everything.",
  sub: "The business that responds first usually wins. Not the best one. The first one.",
  guarantee:
    "If a lead goes more than five minutes without a response in your first 90 days, that month is on me.",
};

/* ----------------------------------------------------------- 7. PIPELINE */
export const pipeline = {
  stages: [
    { name: "NEW LEAD", rate: "8%" },
    { name: "CONTACTED", rate: "12%" },
    { name: "QUALIFIED", rate: "18%" },
    { name: "BOOKED", rate: "24%" },
    { name: "WON", rate: "Customer" },
  ],
  headline: "Watch a business get more efficient.",
  sub: "Same leads. Same crew. The system just stops letting them fall through.",
};

/* ------------------------------------------------------ 8. REVENUE CLIMB */
export const revenue = {
  // Illustrative model of a system compounding, not a client result.
  steps: [
    { value: 0, piece: null },
    { value: 4200, piece: "Brand" },
    { value: 12800, piece: "Website" },
    { value: 24100, piece: "Advertising" },
    { value: 41600, piece: "CRM" },
    { value: 68900, piece: "Automation" },
    { value: 103400, piece: "Retention" },
  ],
  finalPiece: "Analytics",
  line1: "Revenue isn't one tactic.",
  line2: "It's a system.",
  line3: "Aurex builds the system.",
  disclaimer: "Illustrative model of how the pieces compound. Not a client result.",
};

/* ------------------------------------------------------------ 9. SYSTEM */
export const system = [
  {
    key: "attract",
    name: "Attract",
    promise: "Be the one they find.",
    items: ["Paid media", "SEO", "Social media", "Content", "Local marketing"],
  },
  {
    key: "convert",
    name: "Convert",
    promise: "Turn visits into leads.",
    items: ["Websites", "Landing pages", "Offers", "Funnels", "Conversion optimization"],
  },
  {
    key: "respond",
    name: "Respond",
    promise: "Be the first one they hear from.",
    items: ["CRM", "Speed to lead", "SMS", "Email", "Automated follow-up"],
  },
  {
    key: "grow",
    name: "Grow",
    promise: "Make customers bring customers.",
    items: ["Retention", "Reviews", "Referrals", "Loyalty", "Reactivation"],
  },
  {
    key: "measure",
    name: "Measure",
    promise: "Know what every dollar did.",
    items: ["Analytics", "Reporting", "Attribution", "Optimization"],
  },
] as const;

/* ------------------------------------------------------------- 10. PROOF */
export type Stat = {
  value: string;
  label: string;
  context: string;
  verified: boolean;
};

export const proof: Stat[] = [
  {
    value: "14 to 61",
    label: "Google reviews in three months",
    context: "Review automation running after every completed job.",
    // TODO(kalob): confirm client name and exact window, then flag verified.
    verified: false,
  },
  {
    value: "REPLACE",
    label: "Awaiting real number",
    context: "Send the figure, the client, and the timeframe.",
    verified: false,
  },
  {
    value: "REPLACE",
    label: "Awaiting real number",
    context: "Send the figure, the client, and the timeframe.",
    verified: false,
  },
];

/**
 * Commitments. These are true today and carry the proof section on their
 * own until measured client results are supplied.
 */
export const commitments = [
  {
    title: "Five minutes, or the month is free",
    body: "If a lead goes more than five minutes without a response in your first 90 days, I refund that month. The speed is the product, so I put it in writing.",
  },
  {
    title: "Month to month, cancel anytime",
    body: "No annual contract and no cancellation games. I would rather earn it every month than trap you in paperwork.",
  },
  {
    title: "You own your accounts",
    body: "It gets built on your Google profile, your number, your CRM. We agree what stays with you before any work starts, so you are never held hostage by your own marketing.",
  },
  {
    title: "You talk to the person who builds it",
    body: "No account manager reading notes. The person on the call is the person writing the automations.",
  },
];

/* ------------------------------------------------------- 11. CASE STUDIES */
export type CaseStudy = {
  client: string;
  industry: string;
  location: string;
  problem: string;
  change: string;
  result: string;
  image: string | null;
  verified: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "REPLACE",
    industry: "Roofing",
    location: "REPLACE",
    problem: "REPLACE with the situation before the build.",
    change: "REPLACE with what Aurex put in place.",
    result: "REPLACE with the measured outcome.",
    image: null,
    verified: false,
  },
  {
    client: "REPLACE",
    industry: "HVAC",
    location: "REPLACE",
    problem: "REPLACE with the situation before the build.",
    change: "REPLACE with what Aurex put in place.",
    result: "REPLACE with the measured outcome.",
    image: null,
    verified: false,
  },
];

/* ---------------------------------------------------------- 12. OLD WAY */
export const oldWay = {
  pieces: [
    "Website", "Meta Ads", "Google Ads", "CRM", "Email", "Spreadsheet",
    "Missed call", "Analytics", "Freelancer", "Social media", "Lead form",
    "Review site", "Booking app", "Invoices",
  ],
  before: "Marketing shouldn't feel like this.",
  after: ["One strategy.", "One system.", "One growth partner."],
};

/* ------------------------------------------------------------ 13. ABOUT */
export const about = {
  headline: "Aurex is a growth agency for businesses tired of disconnected marketing.",
  body: [
    "I am Kalob, and Aurex is mine. When you call, you get the person who builds the thing. Not an account manager reading notes from somebody else.",
    "I put strategy, creative, advertising, technology, automation, and analytics into one growth system, then I run it and keep tuning it.",
    "No long contracts. Month to month. If it isn't earning its keep, you walk.",
  ],
  disciplines: ["Strategy", "Creative", "Advertising", "Technology", "Automation", "Analytics"],
  // ASSET NEEDED: environmental founder photo. See ASSETS.md.
  photo: null as string | null,
};

/* --------------------------------------------------------------- 14. YOU */
export const you = {
  chain: ["YOU", "YOUR BUSINESS", "YOUR CUSTOMERS", "YOUR MARKETING", "YOUR SALES PROCESS", "YOUR GROWTH SYSTEM"],
  headline: "What would your growth system look like?",
  cta: "Build mine",
};

/* ----------------------------------------------------------- 15. CONTACT */
export const contact = {
  steps: [
    {
      id: "goal",
      question: "What are you trying to grow?",
      options: ["Leads", "Revenue", "Brand", "Customers", "All of it"],
    },
    {
      id: "blocker",
      question: "What's currently holding you back?",
      options: ["Traffic", "Conversion", "Follow-up", "Marketing strategy", "Not sure"],
    },
  ],
  detailStep: {
    question: "Tell us about your business.",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
      { name: "company", label: "Company", type: "text", autoComplete: "organization", required: true },
      { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
      { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
    ],
  },
  closing: "Let's build your growth system.",
  submit: "Book consultation",
  reassurance: "Fifteen minutes. No pitch. I'll tell you where you're losing jobs and what I'd do about it.",
};

export const nav = [
  { label: "The system", href: "#system" },
  { label: "Proof", href: "#proof" },
  { label: "About", href: "#about" },
];
