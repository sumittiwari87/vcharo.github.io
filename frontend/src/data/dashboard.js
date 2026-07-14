// Mocked data for dashboard pages — potential mentees, incoming requests, github repos.

export const mockMentees = [
  {
    id: 'me1',
    name: 'Rohit Kulkarni',
    city: 'Nagpur',
    currentRole: 'Final year — B.E. IT, Nagpur University',
    goal: 'Break into product management at an Indian consumer startup',
    domains: ['Product'],
    languages: ['English', 'हिन्दी', 'मराठी'],
    budget: 2000,
    photo: 'https://images.pexels.com/photos/5862268/pexels-photo-5862268.jpeg?auto=compress&cs=tinysrgb&h=200',
    bio: 'Building a food-delivery side project. Want to make the switch from IT services to product.',
  },
  {
    id: 'me2',
    name: 'Sneha Prakash',
    city: 'Coimbatore',
    currentRole: 'Data Analyst — MidSize Fintech',
    goal: 'Move from analytics into a Data Scientist role at a consumer tech unicorn',
    domains: ['Data & AI'],
    languages: ['English', 'தமிழ்', 'हिन्दी'],
    budget: 2500,
    photo: 'https://images.pexels.com/photos/9159272/pexels-photo-9159272.jpeg?auto=compress&cs=tinysrgb&h=200',
    bio: 'SQL-heavy for 2 years. Ready to invest in a 90-day plan for DS interview prep.',
  },
  {
    id: 'me3',
    name: 'Karthik Reddy',
    city: 'Vijayawada',
    currentRole: 'SDE-1 — Service company',
    goal: 'Crack a product-company SDE-2 loop (systems design)',
    domains: ['Technology'],
    languages: ['English', 'हिन्दी'],
    budget: 1800,
    photo: 'https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg?auto=compress&cs=tinysrgb&h=200',
    bio: '3 YOE Java backend. Trying to switch out of service into a Razorpay/Swiggy-scale team.',
  },
  {
    id: 'me4',
    name: 'Meera Verma',
    city: 'Lucknow',
    currentRole: 'Freelance graphic designer',
    goal: 'Transition into product design at a startup',
    domains: ['Design'],
    languages: ['English', 'हिन्दी'],
    budget: 1500,
    photo: 'https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&h=200',
    bio: 'Portfolio strong on branding but weak on product case studies. Need direction.',
  },
  {
    id: 'me5',
    name: 'Aditya Malhotra',
    city: 'Jaipur',
    currentRole: 'Consulting analyst — Big 4',
    goal: 'Move to a boutique strategy firm; prep for MBB re-attempt',
    domains: ['Consulting'],
    languages: ['English', 'हिन्दी'],
    budget: 2200,
    photo: 'https://images.pexels.com/photos/5862268/pexels-photo-5862268.jpeg?auto=compress&cs=tinysrgb&h=200&sat=-20',
    bio: 'Cleared MBB round 1 last cycle; need case-round drills.',
  },
  {
    id: 'me6',
    name: 'Vidya Iyer',
    city: 'Kochi',
    currentRole: 'PM Intern — SaaS scale-up',
    goal: 'Convert internship offer into a full-time APM role',
    domains: ['Product'],
    languages: ['English', 'മലയാളം'],
    budget: 1900,
    photo: 'https://images.pexels.com/photos/9159272/pexels-photo-9159272.jpeg?auto=compress&cs=tinysrgb&h=200&sat=-20',
    bio: 'Currently in the middle of my PM internship. Need help framing my final review project.',
  },
];

// Deterministic github repo mock for a "connected" account
export const mockGithubRepos = [
  { id: 'r1', name: 'grocery-tracker', description: 'FastAPI + Postgres side project — tracks Indian grocery prices.', language: 'Python', stars: 42, updated: '2 weeks ago' },
  { id: 'r2', name: 'ml-notes', description: 'A running notebook of ML papers I have re-implemented.', language: 'Jupyter', stars: 18, updated: '1 month ago' },
  { id: 'r3', name: 'college-timetable', description: 'React app that scrapes and formats my college time-table.', language: 'JavaScript', stars: 7, updated: '4 months ago' },
  { id: 'r4', name: 'chai-cli', description: 'Silly CLI that reminds me to take chai breaks.', language: 'Go', stars: 3, updated: '6 months ago' },
  { id: 'r5', name: 'placement-prep-2025', description: 'DSA solutions + system design notes for my placement season.', language: 'C++', stars: 92, updated: '3 days ago' },
  { id: 'r6', name: 'tier2-uni-directory', description: 'Open dataset — colleges in Tier 2/3 India with placement stats.', language: 'TypeScript', stars: 31, updated: '3 weeks ago' },
];

// Seed some incoming requests so the mentor dashboard is not empty on first open.
// These are inserted lazily by MentorDashboard on first load if the store is empty.
export const seedIncomingRequests = (mentorId) => [
  {
    direction: 'mentee->mentor',
    mentorId,
    menteeId: 'me1',
    customPrice: null,
    note: 'Watched your Roadmap YouTube talk — would love a 45-min on switching to PM.',
    status: 'pending',
  },
  {
    direction: 'mentee->mentor',
    mentorId,
    menteeId: 'me3',
    customPrice: null,
    note: 'System design for SDE-2 — need help structuring 90-day prep.',
    status: 'pending',
  },
];

// A couple of "current" mentees already actively working with the mentor.
export const seedAcceptedRequests = (mentorId) => [
  {
    direction: 'mentee->mentor',
    mentorId,
    menteeId: 'me2',
    customPrice: 2299,
    note: 'Journey — Data Scientist transition — Week 3 of 8.',
    status: 'accepted',
  },
];
