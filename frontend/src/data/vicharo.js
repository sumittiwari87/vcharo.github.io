// Static seed data for VICHARO landing page

export const stats = [
  { value: '1,200+', label: 'Mentors onboarded' },
  { value: '18,400', label: 'Sessions completed' },
  { value: '84', label: 'Cities served' },
  { value: '4.8/5', label: 'Avg. mentee rating' },
];

export const categories = [
  {
    name: 'Technology',
    hindi: 'तंत्रज्ञान',
    count: '312 mentors',
    blurb: 'Backend, mobile, ML infra — from SDE-1 prep to staff-level growth.',
    span: 'md:col-span-6 lg:col-span-7',
    tall: true,
  },
  {
    name: 'Product',
    hindi: 'उत्पाद',
    count: '186 mentors',
    blurb: 'PMs from Swiggy, Razorpay, Google, Atlassian.',
    span: 'md:col-span-6 lg:col-span-5',
  },
  {
    name: 'Design',
    hindi: 'रचना',
    count: '124 mentors',
    blurb: 'Product, brand and motion designers.',
    span: 'md:col-span-4 lg:col-span-4',
  },
  {
    name: 'Finance',
    hindi: 'वित्त',
    count: '98 mentors',
    blurb: 'IB, corp-fin, VC & personal finance.',
    span: 'md:col-span-4 lg:col-span-4',
  },
  {
    name: 'Consulting',
    hindi: 'सलाह',
    count: '76 mentors',
    blurb: 'MBB, Big-4 and boutique consultants.',
    span: 'md:col-span-4 lg:col-span-4',
  },
  {
    name: 'Data & AI',
    hindi: 'आँकड़े',
    count: '141 mentors',
    blurb: 'DS, MLE, applied research and analytics.',
    span: 'md:col-span-12 lg:col-span-12',
    wide: true,
  },
];

export const mentors = [
  {
    id: 'm1',
    name: 'Aarav Menon',
    title: 'Sr. Engineering Manager, Razorpay',
    domain: 'Technology',
    rating: 4.9,
    sessions: 214,
    price: '₹1,499 / session',
    photo: 'https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg',
    tag: 'Backend · Distributed Systems',
  },
  {
    id: 'm2',
    name: 'Nandini Rao',
    title: 'Principal PM, Atlassian',
    domain: 'Product',
    rating: 4.8,
    sessions: 178,
    price: '₹1,899 / session',
    photo: 'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg',
    tag: 'B2B SaaS · Roadmapping',
  },
  {
    id: 'm3',
    name: 'Vikram Shah',
    title: 'Design Director, Zomato',
    domain: 'Design',
    rating: 4.9,
    sessions: 132,
    price: '₹1,299 / session',
    photo: 'https://images.pexels.com/photos/5862268/pexels-photo-5862268.jpeg',
    tag: 'Product Design · Systems',
  },
  {
    id: 'm4',
    name: 'Priya Iyer',
    title: 'VP Analytics, Flipkart',
    domain: 'Data & AI',
    rating: 4.7,
    sessions: 156,
    price: '₹1,699 / session',
    photo: 'https://images.pexels.com/photos/9159272/pexels-photo-9159272.jpeg',
    tag: 'Data · Experimentation',
  },
];

export const testimonials = [
  {
    quote:
      'I switched from a Tier-3 college background into a product role at a fintech. My VICHARO mentor walked me through the interview loop for 11 weeks. It was the difference.',
    name: 'Rohit K.',
    city: 'Nagpur → Bengaluru',
    role: 'Associate PM',
    photo: 'https://images.unsplash.com/photo-1605818215588-c8013661b021',
  },
  {
    quote:
      'Mentorship in India was gate-kept behind LinkedIn DMs. VICHARO made a senior data leader accessible for ₹1,600 a session. My models actually got shipped.',
    name: 'Shreya P.',
    city: 'Coimbatore',
    role: 'Data Scientist',
    photo: 'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg',
  },
  {
    quote:
      'Structured journeys — not chit-chat. My mentor gave me a 90-day plan and held me to it. Cleared my MBB case interview on the second attempt.',
    name: 'Aditya M.',
    city: 'Jaipur',
    role: 'Consultant',
    photo: 'https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg',
  },
];

export const pricingPlans = [
  {
    name: 'Single Session',
    price: '₹1,299',
    cadence: 'per 45-min call',
    features: [
      '1:1 video session',
      'Written action items',
      'Recording (on request)',
      'No subscription',
    ],
    highlight: false,
  },
  {
    name: 'Journey',
    price: '₹4,999',
    cadence: 'per month · billed monthly',
    features: [
      '4 sessions / month',
      'Shared roadmap & docs',
      'WhatsApp check-ins',
      'Accountability tracker',
      'Priority booking',
    ],
    highlight: true,
    tag: 'Most chosen',
  },
  {
    name: 'Career Sprint',
    price: '₹12,999',
    cadence: '90-day intensive',
    features: [
      '12 sessions',
      'Mock interviews (4)',
      'Portfolio / resume review',
      'Placement referrals',
      'Dedicated mentor',
    ],
    highlight: false,
  },
];

export const faqs = [
  {
    q: 'Who are VICHARO mentors?',
    a: "Every mentor is a senior IC or leader (5+ years) at a recognised company. We manually verify LinkedIn, employment and references before onboarding — under 8% of applicants get through.",
  },
  {
    q: 'How is this different from a Topmate or ADPList link?',
    a: 'VICHARO is structured. You get a shared journey doc, action items after every session, and an accountability tracker — not just a one-off 30-minute call that goes nowhere.',
  },
  {
    q: 'Do you support Tier 2 and Tier 3 cities?',
    a: 'That is literally why we exist. Payments in ₹, sessions available after 8 PM IST, and mentors chosen for the Indian context — from MBA prep to abroad transitions.',
  },
  {
    q: 'How do payments work?',
    a: 'Pay per session or subscribe to a journey. Money is held in escrow and only released to the mentor after the session. Full refund if the call does not happen.',
  },
  {
    q: 'Can I become a mentor on VICHARO?',
    a: 'Yes — apply via the "Become a Mentor" flow. Approved mentors get a verifiable public portfolio, a dashboard, and a share of every session.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Every mentor offers a free 15-minute intro call so you can pick the right fit before you pay for a full session.',
  },
  {
    q: 'Do you support Hindi and regional languages?',
    a: 'English today. हिन्दी, தமிழ் and मराठी mentor tags are rolling out in the next release.',
  },
];

export const howMentee = [
  { n: '01', title: 'Tell us your goal', body: 'Career switch, interview prep, or a specific skill — we map your context in 60 seconds.' },
  { n: '02', title: 'Get matched', body: 'Pick from 3 hand-picked mentors. Free 15-minute intro call before you commit.' },
  { n: '03', title: 'Show up. Ship it.', body: 'Structured journey with action items, deadlines and a shared doc your mentor holds you to.' },
];

export const howMentor = [
  { n: '01', title: 'Apply & get verified', body: 'Submit your profile. We verify employment, references and past mentoring in 5 working days.' },
  { n: '02', title: 'Set your terms', body: 'Your hours, your price, your topics. VICHARO handles payments, scheduling and no-shows.' },
  { n: '03', title: 'Build a public portfolio', body: 'Every session builds verifiable proof of mentoring — a public signal for your next role or brand.' },
];

export const whyPoints = [
  { title: 'Verified experts', body: 'Under 8% of mentor applicants make it in. Employment, references, and past mentoring — checked.', hindi: 'सत्यापित' },
  { title: 'Structured journeys', body: 'Not a one-off call. A living doc, weekly action items, and a mentor who tracks your progress.', hindi: 'संरचित' },
  { title: 'Accountability tracking', body: 'Milestones, streaks, and quiet nudges. You show up, or your mentor knows.', hindi: 'ज़िम्मेदारी' },
  { title: 'Indian pricing', body: '₹1,299 / session onwards. UPI, ₹, EMI on journeys — built for the Indian wallet.', hindi: 'सुलभ' },
];
