// Static seed data for Vcharo landing page

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
    reviewCount: 96,
    sessions: 214,
    price: '₹1,499 / session',
    priceValue: 1499,
    photo: 'https://customer-assets.emergentagent.com/job_mentor-connect-230/artifacts/f0b7abo6_Varun%20-%20Event_Management.jpg',
    tag: 'Backend · Distributed Systems',
    location: 'Bengaluru, India',
    languages: ['English', 'हिन्दी', 'മലയാളം'],
    yearsExp: 14,
    bio: 'I lead the core payments engineering team at Razorpay. Before this, I spent 6 years at Flipkart and 3 years at a Series-A startup that got acquired. I have interviewed 300+ engineers and mentored 40+ into their first tech role. My style: brutally honest, deeply structured, no fluff.',
    expertise: [
      'System design (L4 → L6)',
      'Backend architecture',
      'FAANG / Indian unicorn interview prep',
      'Career transitions into product companies',
      'Team leadership at 5+ years IC',
    ],
    experience: [
      { company: 'Razorpay', role: 'Sr. Engineering Manager', period: '2022 – Now' },
      { company: 'Flipkart', role: 'Staff Software Engineer', period: '2016 – 2022' },
      { company: 'Zeta (acquired)', role: 'Senior SDE', period: '2013 – 2016' },
    ],
    education: [{ school: 'IIT Madras', degree: 'B.Tech, Computer Science', period: '2009 – 2013' }],
    sessionTypes: [
      { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'A no-pressure intro to check fit before you commit.' },
      { name: '1:1 mentoring session', duration: '45 min', price: '₹1,499', priceValue: 1499, blurb: 'Deep dive into your goal, roadmap, or specific problem.' },
      { name: 'Mock interview', duration: '60 min', price: '₹2,499', priceValue: 2499, blurb: 'Full-loop system design or coding round with written feedback.' },
      { name: 'Journey (monthly)', duration: '4 sessions/mo', price: '₹4,999', priceValue: 4999, blurb: 'Structured 4-week plan with shared doc + WhatsApp check-ins.' },
    ],
    availability: [
      { day: 'Mon', slots: ['8:30 PM', '9:30 PM'] },
      { day: 'Wed', slots: ['7:00 PM', '8:00 PM', '9:00 PM'] },
      { day: 'Sat', slots: ['11:00 AM', '4:00 PM', '6:00 PM'] },
    ],
    reviews: [
      {
        name: 'Rohan T.',
        city: 'Kanpur',
        rating: 5,
        date: 'Oct 2025',
        text: 'Aarav rebuilt my system design fundamentals in 6 sessions. Cracked Uber and Swiggy in the same month.',
      },
      {
        name: 'Sneha P.',
        city: 'Pune',
        rating: 5,
        date: 'Aug 2025',
        text: 'Direct, no sugar-coating. He told me my roadmap was wrong in session 1 and we fixed it. Now L5 at a US company.',
      },
      {
        name: 'Karthik R.',
        city: 'Chennai',
        rating: 4,
        date: 'Jul 2025',
        text: 'Great mentor for backend depth. Wish he offered more slots — always booked out.',
      },
    ],
    responseTime: 'Under 6 hours',
    verified: true,
    verified_badges: ['identity', 'linkedin', 'company'],
  },
  {
    id: 'm2',
    name: 'Nandini Rao',
    title: 'Principal PM, Atlassian',
    domain: 'Product',
    rating: 4.8,
    reviewCount: 82,
    sessions: 178,
    price: '₹1,899 / session',
    priceValue: 1899,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'B2B SaaS · Roadmapping',
    location: 'Bengaluru, India',
    languages: ['English', 'हिन्दी', 'ಕನ್ನಡ'],
    yearsExp: 11,
    bio: 'Principal PM at Atlassian, previously at Freshworks and a YC-backed dev-tools startup. I coach folks moving from engineering / consulting into product, and PMs jumping from consumer to B2B SaaS. My sessions are structured, artifact-driven, and always end with something you ship.',
    expertise: [
      'APM / associate PM interview prep',
      'B2B SaaS roadmapping',
      'Eng → PM transition',
      'PM portfolio building',
      'Stakeholder management at 4+ YOE',
    ],
    experience: [
      { company: 'Atlassian', role: 'Principal PM', period: '2023 – Now' },
      { company: 'Freshworks', role: 'Group PM', period: '2019 – 2023' },
      { company: 'Devfolio (YC S19)', role: 'PM, first hire', period: '2017 – 2019' },
    ],
    education: [
      { school: 'ISB Hyderabad', degree: 'MBA', period: '2015 – 2017' },
      { school: 'BITS Pilani', degree: 'B.E., ECE', period: '2010 – 2014' },
    ],
    sessionTypes: [
      { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'A quick chemistry check.' },
      { name: '1:1 PM session', duration: '45 min', price: '₹1,899', priceValue: 1899, blurb: 'Roadmap review, PRD critique, or interview loop planning.' },
      { name: 'Portfolio review', duration: '60 min', price: '₹2,899', priceValue: 2899, blurb: 'Deep review of your PM portfolio / case with written notes.' },
      { name: 'Journey (monthly)', duration: '4 sessions/mo', price: '₹5,999', priceValue: 5999, blurb: 'PM interview prep or first-90-days roadmap.' },
    ],
    availability: [
      { day: 'Tue', slots: ['8:00 PM', '9:00 PM'] },
      { day: 'Thu', slots: ['7:30 PM', '9:00 PM'] },
      { day: 'Sun', slots: ['10:00 AM', '11:00 AM', '5:00 PM'] },
    ],
    reviews: [
      {
        name: 'Aditi S.',
        city: 'Indore',
        rating: 5,
        date: 'Nov 2025',
        text: 'Nandini turned my scrappy portfolio into something I was proud to share. Got 3 APM offers.',
      },
      {
        name: 'Manav K.',
        city: 'Ahmedabad',
        rating: 5,
        date: 'Sep 2025',
        text: 'She caught the exact reason I was failing PM interviews — my problem statements were too vague. Fixed in 2 sessions.',
      },
    ],
    responseTime: 'Under 12 hours',
    verified: true,
    verified_badges: ['identity', 'linkedin', 'company'],
  },
  {
    id: 'm3',
    name: 'Vikram Shah',
    title: 'Design Director, Zomato',
    domain: 'Design',
    rating: 4.9,
    reviewCount: 74,
    sessions: 132,
    price: '₹1,299 / session',
    priceValue: 1299,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'Product Design · Systems',
    location: 'Gurugram, India',
    languages: ['English', 'हिन्दी', 'ગુજરાતી'],
    yearsExp: 13,
    bio: 'Design Director at Zomato. Previously led design at CRED and a design studio in Bombay. I mentor folks breaking into product design — especially from Tier 2/3 colleges with no formal design education. Portfolio > pedigree, always.',
    expertise: [
      'Product design portfolio review',
      'Design systems from scratch',
      'FAANG / unicorn design interview prep',
      'Motion + interaction design',
      'Design leadership (0 → team of 8)',
    ],
    experience: [
      { company: 'Zomato', role: 'Design Director', period: '2021 – Now' },
      { company: 'CRED', role: 'Lead Product Designer', period: '2018 – 2021' },
      { company: 'Lollypop Design', role: 'Sr. Designer', period: '2015 – 2018' },
    ],
    education: [
      { school: 'NID Ahmedabad', degree: 'M.Des, Interaction Design', period: '2013 – 2015' },
      { school: 'Nirma University', degree: 'B.Tech, IT', period: '2009 – 2013' },
    ],
    sessionTypes: [
      { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'See if we vibe.' },
      { name: 'Portfolio review', duration: '45 min', price: '₹1,299', priceValue: 1299, blurb: 'Ruthless, kind feedback on your portfolio.' },
      { name: 'Design system audit', duration: '60 min', price: '₹1,999', priceValue: 1999, blurb: 'Bring your design system, leave with an action list.' },
      { name: 'Journey (monthly)', duration: '4 sessions/mo', price: '₹4,499', priceValue: 4499, blurb: 'Portfolio + interview prep, structured over 4 weeks.' },
    ],
    availability: [
      { day: 'Mon', slots: ['9:00 PM', '10:00 PM'] },
      { day: 'Fri', slots: ['8:00 PM', '9:00 PM'] },
      { day: 'Sat', slots: ['3:00 PM', '5:00 PM', '7:00 PM'] },
    ],
    reviews: [
      {
        name: 'Ishaan D.',
        city: 'Nagpur',
        rating: 5,
        date: 'Nov 2025',
        text: 'Vikram helped me redo my case studies. Got into Groww as a product designer straight out of college.',
      },
      {
        name: 'Meera V.',
        city: 'Coimbatore',
        rating: 5,
        date: 'Aug 2025',
        text: "First mentor who didn't tell me to 'just apply everywhere'. Gave me a specific 8-week plan.",
      },
    ],
    responseTime: 'Under 8 hours',
    verified: true,
    verified_badges: ['identity', 'linkedin', 'company'],
  },
  {
    id: 'm4',
    name: 'Priya Iyer',
    title: 'VP Analytics, Flipkart',
    domain: 'Data & AI',
    rating: 4.7,
    reviewCount: 68,
    sessions: 156,
    price: '₹1,699 / session',
    priceValue: 1699,
    photo: 'https://customer-assets.emergentagent.com/job_mentor-connect-230/artifacts/1fu9ehil_pexels-woman-1850703_1920.jpg',
    tag: 'Data · Experimentation',
    location: 'Bengaluru, India',
    languages: ['English', 'தமிழ்', 'हिन्दी'],
    yearsExp: 15,
    bio: "VP Analytics at Flipkart, running a team of 40+. Before Flipkart, I built the experimentation platform at Ola. I mentor early-career data folks who want to move from dashboards → decisions, and mid-career DS/MLEs targeting principal-level roles.",
    expertise: [
      'Data / analytics interview prep',
      'A/B testing and experimentation design',
      'IC → manager transition in DS',
      'Product analytics from scratch',
      'Building a DS portfolio without kaggle',
    ],
    experience: [
      { company: 'Flipkart', role: 'VP Analytics', period: '2020 – Now' },
      { company: 'Ola', role: 'Head of Experimentation', period: '2016 – 2020' },
      { company: 'Fractal Analytics', role: 'Sr. Data Scientist', period: '2012 – 2016' },
    ],
    education: [
      { school: 'IIM Bangalore', degree: 'MBA (Analytics)', period: '2010 – 2012' },
      { school: 'PSG Tech', degree: 'B.E., Computer Science', period: '2005 – 2009' },
    ],
    sessionTypes: [
      { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'Quick fit check.' },
      { name: '1:1 data session', duration: '45 min', price: '₹1,699', priceValue: 1699, blurb: 'Roadmap, interview prep, or problem walkthrough.' },
      { name: 'Case interview', duration: '60 min', price: '₹2,299', priceValue: 2299, blurb: 'Product-sense / case round with written debrief.' },
      { name: 'Journey (monthly)', duration: '4 sessions/mo', price: '₹5,499', priceValue: 5499, blurb: '90-day plan to move from analyst → DS or DS → principal.' },
    ],
    availability: [
      { day: 'Tue', slots: ['9:00 PM', '10:00 PM'] },
      { day: 'Thu', slots: ['8:30 PM', '9:30 PM'] },
      { day: 'Sun', slots: ['9:00 AM', '11:00 AM', '4:00 PM'] },
    ],
    reviews: [
      {
        name: 'Vivek A.',
        city: 'Vijayawada',
        rating: 5,
        date: 'Oct 2025',
        text: 'Priya has a specific opinion on everything, and she is usually right. Interview loops at Meesho and Cred cleared.',
      },
      {
        name: 'Sana Q.',
        city: 'Lucknow',
        rating: 4,
        date: 'Sep 2025',
        text: 'Deep experience, very analytical. Sometimes intense, but that is what I paid for.',
      },
    ],
    responseTime: 'Under 24 hours',
    verified: true,
    verified_badges: ['identity', 'linkedin', 'company'],
  },
];

export const getMentorById = (id) => mentors.find((m) => m.id === id);

// Lightweight additional mentors for the discovery page (no reviews/detailed profile yet)
const lite = (over) => ({
  yearsExp: 8,
  languages: ['English', 'हिन्दी'],
  location: 'India',
  bio: 'Verified Vcharo mentor. Full bio coming soon.',
  expertise: ['Career coaching', 'Interview prep', 'Portfolio review', 'Roadmap planning', 'Domain deep-dives'],
  experience: [{ company: over.title.split(', ')[1] || 'Undisclosed', role: over.title.split(', ')[0], period: '2020 – Now' }],
  education: [{ school: 'Undisclosed', degree: 'Undisclosed', period: '—' }],
  sessionTypes: [
    { name: 'Discovery call', duration: '15 min', price: 'Free', priceValue: 0, blurb: 'Chemistry check before you commit.' },
    { name: '1:1 session', duration: '45 min', price: over.price.split(' ')[0], priceValue: over.priceValue, blurb: 'Deep dive on your goal.' },
    { name: 'Journey (monthly)', duration: '4 sessions/mo', price: `₹${(over.priceValue * 3.2).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, priceValue: Math.round(over.priceValue * 3.2), blurb: '4-week structured plan.' },
  ],
  availability: [
    { day: 'Wed', slots: ['8:00 PM', '9:00 PM'] },
    { day: 'Sat', slots: ['4:00 PM', '6:00 PM'] },
  ],
  reviews: [
    { name: 'Verified mentee', city: 'India', rating: 5, date: 'Recent', text: 'Great mentor — structured and honest feedback.' },
  ],
  responseTime: 'Under 24 hours',
  verified: true,
    verified_badges: ['identity', 'linkedin', 'company'],
  ...over,
});

mentors.push(
  lite({
    id: 'm5',
    name: 'Rahul Verma',
    title: 'Staff Engineer, Google',
    domain: 'Technology',
    rating: 4.9,
    reviewCount: 54,
    sessions: 121,
    price: '₹2,499 / session',
    priceValue: 2499,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'Distributed Systems · L6',
    location: 'Bengaluru, India',
    languages: ['English', 'हिन्दी', 'ਪੰਜਾਬੀ'],
    yearsExp: 12,
  }),
  lite({
    id: 'm6',
    name: 'Sana Fernandes',
    title: 'Group PM, Swiggy',
    domain: 'Product',
    rating: 4.7,
    reviewCount: 41,
    sessions: 88,
    price: '₹1,799 / session',
    priceValue: 1799,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'Consumer · Growth',
    location: 'Mumbai, India',
    languages: ['English', 'हिन्दी', 'मराठी'],
    yearsExp: 9,
  }),
  lite({
    id: 'm7',
    name: 'Ananya Krishnan',
    title: 'Consultant, Bain & Company',
    domain: 'Consulting',
    rating: 4.8,
    reviewCount: 39,
    sessions: 71,
    price: '₹1,999 / session',
    priceValue: 1999,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'MBB Case Prep · Strategy',
    location: 'Gurugram, India',
    languages: ['English', 'हिन्दी', 'தமிழ்'],
    yearsExp: 7,
  }),
  lite({
    id: 'm8',
    name: 'Kabir Malhotra',
    title: 'VP Finance, PhonePe',
    domain: 'Finance',
    rating: 4.6,
    reviewCount: 32,
    sessions: 58,
    price: '₹2,199 / session',
    priceValue: 2199,
    photo: 'https://customer-assets.emergentagent.com/job_mentor-connect-230/artifacts/w5fqzf7w_%2A%20Kabir%20-%20Data_AI.jpg',
    tag: 'Corp Fin · IB · VC',
    location: 'Bengaluru, India',
    languages: ['English', 'हिन्दी'],
    yearsExp: 13,
  }),
  lite({
    id: 'm9',
    name: 'Divya Menon',
    title: 'Sr. UX Designer, Meta',
    domain: 'Design',
    rating: 4.9,
    reviewCount: 47,
    sessions: 94,
    price: '₹1,699 / session',
    priceValue: 1699,
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop&crop=faces&auto=format',
    tag: 'UX Research · Systems',
    location: 'Remote, India',
    languages: ['English', 'हिन्दी', 'മലയാളം'],
    yearsExp: 10,
  }),
  lite({
    id: 'm10',
    name: 'Arjun Bhatt',
    title: 'ML Lead, Meesho',
    domain: 'Data & AI',
    rating: 4.7,
    reviewCount: 36,
    sessions: 62,
    price: '₹1,899 / session',
    priceValue: 1899,
    photo: 'https://customer-assets.emergentagent.com/job_mentor-connect-230/artifacts/qi1pahac_Viktor%20-%20Data_AI.jpg',
    tag: 'Applied ML · Recsys',
    location: 'Bengaluru, India',
    languages: ['English', 'हिन्दी', 'ગુજરાતી'],
    yearsExp: 9,
  }),
);

export const mentorDomains = ['Technology', 'Product', 'Design', 'Finance', 'Consulting', 'Data & AI'];
export const mentorLanguages = ['English', 'हिन्दी', 'தமிழ்', 'मराठी', 'ಕನ್ನಡ', 'മലയാളം', 'ગુજરાતી', 'ਪੰਜਾਬੀ'];

export const testimonials = [
  {
    quote:
      'I switched from a Tier-3 college background into a product role at a fintech. My Vcharo mentor walked me through the interview loop for 11 weeks. It was the difference.',
    name: 'Rohit K.',
    city: 'Nagpur → Bengaluru',
    role: 'Associate PM',
    photo: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&h=800&fit=crop&crop=faces&auto=format',
  },
  {
    quote:
      'Mentorship in India was gate-kept behind LinkedIn DMs. Vcharo made a senior data leader accessible for ₹1,600 a session. My models actually got shipped.',
    name: 'Shreya P.',
    city: 'Coimbatore',
    role: 'Data Scientist',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=800&fit=crop&crop=faces&auto=format',
  },
  {
    quote:
      'Structured journeys — not chit-chat. My mentor gave me a 90-day plan and held me to it. Cleared my MBB case interview on the second attempt.',
    name: 'Aditya M.',
    city: 'Jaipur',
    role: 'Consultant',
    photo: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?w=600&h=800&fit=crop&crop=faces&auto=format',
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
    q: 'Who are Vcharo mentors?',
    a: "Every mentor is a senior IC or leader (5+ years) at a recognised company. We manually verify LinkedIn, employment and references before onboarding — under 8% of applicants get through.",
  },
  {
    q: 'How is this different from a Topmate or ADPList link?',
    a: 'Vcharo is structured. You get a shared journey doc, action items after every session, and an accountability tracker — not just a one-off 30-minute call that goes nowhere.',
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
    q: 'Can I become a mentor on Vcharo?',
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
  { n: '02', title: 'Set your terms', body: 'Your hours, your price, your topics. Vcharo handles payments, scheduling and no-shows.' },
  { n: '03', title: 'Build a public portfolio', body: 'Every session builds verifiable proof of mentoring — a public signal for your next role or brand.' },
];

export const whyPoints = [
  { title: 'Verified experts', body: 'Under 8% of mentor applicants make it in. Employment, references, and past mentoring — checked.', hindi: 'सत्यापित' },
  { title: 'Structured journeys', body: 'Not a one-off call. A living doc, weekly action items, and a mentor who tracks your progress.', hindi: 'संरचित' },
  { title: 'Accountability tracking', body: 'Milestones, streaks, and quiet nudges. You show up, or your mentor knows.', hindi: 'ज़िम्मेदारी' },
  { title: 'Indian pricing', body: '₹1,299 / session onwards. UPI, ₹, EMI on journeys — built for the Indian wallet.', hindi: 'सुलभ' },
];

// ---------------------- Pricing page data ----------------------
export const mentorEconomics = {
  payoutPct: 80,
  platformFeePct: 20,
  payoutWindow: '48 hours',
  examples: [
    { sessionPrice: 1299, mentorKeeps: 1039, platformFee: 260, label: 'Portfolio review · 45 min' },
    { sessionPrice: 1499, mentorKeeps: 1199, platformFee: 300, label: '1:1 mentoring · 45 min' },
    { sessionPrice: 1899, mentorKeeps: 1519, platformFee: 380, label: 'Product interview loop · 45 min' },
    { sessionPrice: 2499, mentorKeeps: 1999, platformFee: 500, label: 'Mock system-design · 60 min' },
    { sessionPrice: 4999, mentorKeeps: 3999, platformFee: 1000, label: 'Monthly Journey · 4 sessions' },
  ],
};

export const refundEvidence = {
  qualifies: [
    'Session recording (with mentor\u2019s consent) or verbatim transcript excerpts',
    'Written journey doc showing the mentor did not deliver stated action items',
    'Timestamped screenshots or chat logs of the session',
    'A second-mentor peer review \u2014 Vcharo can arrange one, free of charge',
    'Mentor no-show, or cancellation without 24-hour notice',
  ],
  doesNotQualify: [
    'Vague dissatisfaction with no specific examples',
    'You did not do the pre-work / homework the mentor assigned',
    'You expected a job offer or placement as an outcome',
    'Session was helpful but you changed your mind after the fact',
    'A single stylistic difference (e.g., "too direct", "too gentle")',
  ],
};

export const refundFlow = [
  { n: '01', title: 'Raise it', body: 'Open a ticket from the session page within 7 days of the call. Attach your evidence.' },
  { n: '02', title: 'Trust team review', body: 'The Vcharo Trust team reviews within 3 working days. We may ask the mentor for their side of the story.' },
  { n: '03', title: 'Decision & refund', body: 'Full refund via the original payment method in 5\u20137 working days if the case qualifies.' },
];

export const pricingFaqs = [
  { q: 'When exactly is my money released to the mentor?', a: 'Never before the session actually happens. Vcharo holds your payment in escrow. The mentor is paid only after the session ends and you have a 48-hour window to raise a refund case.' },
  { q: 'What if the mentor no-shows?', a: '100% refund, no evidence needed, no questions asked. Refunded within 5 working days.' },
  { q: 'How strong does my evidence for a quality refund have to be?', a: 'Concrete. A recording, transcript excerpt, journey doc, or screenshots. Vcharo\u2019s mentors are handpicked (under 8% of applicants make it through) so quality complaints are rare \u2014 which is exactly why we ask for real evidence rather than a rating alone.' },
  { q: 'Do you offer any free options?', a: 'Every mentor offers a free 15-minute intro call before you commit. It is a hard requirement to be listed on Vcharo.' },
  { q: 'Is there a subscription lock-in?', a: 'No. Journey plans are monthly and cancellable at any time. Single sessions are one-off.' },
  { q: 'Which payment methods do you accept?', a: 'UPI, credit/debit cards, netbanking. EMI is available on Journey plans through our payment partner.' },
  { q: 'How much does Vcharo take from mentors?', a: 'A flat 20% platform fee. The mentor keeps 80% \u2014 among the highest payouts in the Indian mentoring space. No signup fee, no monthly listing fee.' },
];

// ---------------------- About page data ----------------------
export const beliefs = [
  { title: 'Access, not gatekeeping', hindi: '\u092a\u0939\u0941\u0901\u091a', body: 'Talent is evenly distributed across India. Access to it is not. We exist to close that gap.' },
  { title: 'Structure, not vibes', hindi: '\u0938\u0902\u0930\u091a\u0928\u093e', body: 'A one-off 30-minute call rarely changes a career. A 90-day structured journey with action items does.' },
  { title: 'Verified, not viral', hindi: '\u0938\u0924\u094d\u092f\u093e\u092a\u093f\u0924', body: 'We choose 8% acceptance for mentors over a "1,000 mentors" claim. Human-reviewed, always.' },
  { title: '\u20b9, not $', hindi: '\u092d\u093e\u0930\u0924\u0940\u092f \u092e\u0942\u0932\u094d\u092f', body: 'Priced for the Indian wallet from day one. UPI, EMI on Journeys, and no dollar-denominated pricing.' },
];

export const teamLeadership = [
  {
    id: 'sushma-shukla',
    name: 'Sushma Shukla',
    role: 'Chief Executive Officer',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=720&h=900&fit=crop&crop=faces&auto=format',
    owns: 'Company strategy, mentor partnerships, board.',
    linkedin: '#',
  },
  {
    id: 'sumit-kumar',
    name: 'Sumit Kumar',
    role: 'Founder',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=720&h=900&fit=crop&crop=faces&auto=format',
    owns: 'Product vision, mentee experience, growth loops.',
    linkedin: '#',
  },
  {
    id: 'neeraj-kumar',
    name: 'Neeraj Kumar',
    role: 'Founder',
    city: 'Delhi NCR',
    photo: 'https://customer-assets.emergentagent.com/job_mentor-connect-230/artifacts/8c73a8b2_lalithaakirankumar-person-1702230_1920.jpg',
    owns: 'Operations, mentor onboarding, trust & safety.',
    linkedin: '#',
  },
  {
    id: 'deepak-kumar',
    name: 'Deepak Kumar',
    role: 'Chief Technology Officer',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=720&h=900&fit=crop&crop=faces&auto=format',
    owns: 'Engineering, platform reliability, security.',
    linkedin: '#',
  },
];

export const teamMembers = [
  {
    id: 'praveen-kumar',
    name: 'Praveen Kumar',
    role: 'Chief AI Architect',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Mentor-mentee matching, recommendation systems.',
    linkedin: '#',
  },
  {
    id: 'aditi-verma',
    name: 'Aditi Verma',
    role: 'Head of Growth',
    city: 'Mumbai',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Acquisition, brand, campaigns in Tier 2/3 India.',
    linkedin: '#',
  },
  {
    id: 'rohan-iyer',
    name: 'Rohan Iyer',
    role: 'Head of Mentor Success',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Mentor onboarding, quality reviews, training program.',
    linkedin: '#',
  },
  {
    id: 'kavita-menon',
    name: 'Kavita Menon',
    role: 'Head of Trust & Safety',
    city: 'Kochi',
    photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Verification, refunds, incident response.',
    linkedin: '#',
  },
  {
    id: 'arjun-sharma',
    name: 'Arjun Sharma',
    role: 'Head of Design',
    city: 'Bengaluru',
    photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Product design, design system, mentor-portfolio UX.',
    linkedin: '#',
  },
  {
    id: 'neha-bhatia',
    name: 'Neha Bhatia',
    role: 'Head of Community',
    city: 'Pune',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&crop=faces&auto=format',
    owns: 'Cohort programs, mentee circles, alumni network.',
    linkedin: '#',
  },
];

export const advisors = [
  { name: 'Ex-Flipkart · VP Product', tag: 'Advises on scaling marketplaces' },
  { name: 'Ex-Razorpay · Engineering', tag: 'Advises on payments + escrow' },
  { name: 'Ex-McKinsey · Partner', tag: 'Advises on strategy and expansion' },
  { name: 'Ex-Meta · Design Lead', tag: 'Advises on brand and product design' },
];
