import type { Property, Agent, Neighborhood, BlogPost, Testimonial } from "@/types";

export const agents: Agent[] = [
  {
    id: "sophia-laurent",
    name: "Sophia Laurent",
    specialty: "Luxury Villas",
    rating: 4.9,
    sold: 142,
    years: 12,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    bio: "Sophia specializes in oceanfront estates and architectural masterpieces across Southern California, with over a decade curating discrete luxury transactions.",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    specialty: "Penthouses & Skylines",
    rating: 4.8,
    sold: 98,
    years: 9,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    bio: "Marcus brings a finance-trained eye to Manhattan's most prestigious vertical addresses.",
  },
  {
    id: "isabella-rossi",
    name: "Isabella Rossi",
    specialty: "Historic Estates",
    rating: 5.0,
    sold: 76,
    years: 15,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    bio: "Isabella is the authority on heritage properties and restored European-style villas.",
  },
  {
    id: "ethan-blake",
    name: "Ethan Blake",
    specialty: "Commercial & Investment",
    rating: 4.9,
    sold: 211,
    years: 11,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Ethan structures complex acquisitions and commercial portfolios for institutional clients.",
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    city: "Los Angeles",
    country: "USA",
    count: 240,
    from: 1200000,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80",
    description: "Iconic palm-lined boulevards, gated estates and a legacy of cinematic glamour.",
  },
  {
    slug: "manhattan",
    name: "Manhattan",
    city: "New York",
    country: "USA",
    count: 380,
    from: 850000,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80",
    description: "The vertical city, landmark prewar co-ops and contemporary supertall towers.",
  },
  {
    slug: "miami-beach",
    name: "Miami Beach",
    city: "Miami",
    country: "USA",
    count: 190,
    from: 650000,
    image: "https://images.unsplash.com/photo-1533106958148-daaeab8b83fe?w=1200&q=80",
    description: "Art Deco shoreline meeting bay-front estates and oceanfront penthouses.",
  },
  {
    slug: "malibu",
    name: "Malibu",
    city: "Los Angeles",
    country: "USA",
    count: 95,
    from: 2500000,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&q=80",
    description: "Twenty-seven miles of Pacific coastline defining the modern beach estate.",
  },
];

const baseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
];

const gallery = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80",
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1600&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
  "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1600&q=80",
];

const titles = [
  "The Onyx Residence",
  "Villa Belvedere",
  "Skyline Penthouse 41",
  "Coastal Modernist",
  "Maison Lumière",
  "The Aurelia Estate",
  "Glasshouse 7",
  "Casa del Mar",
  "Hilltop Sanctuary",
];

export const properties: Property[] = titles.map((title, i) => ({
  id: `p-${i + 1}`,
  title,
  location: [
    "Beverly Hills, CA",
    "Upper East Side, NYC",
    "Tribeca, NYC",
    "Malibu, CA",
    "Bel Air, CA",
    "South Beach, Miami",
    "Hollywood Hills, CA",
    "Coconut Grove, Miami",
    "Greenwich, CT",
  ][i],
  price: [4250000, 12900000, 8400000, 6750000, 9850000, 3200000, 5600000, 2150000, 7200000][i],
  status: i % 4 === 2 ? "rent" : "sale",
  badge: i === 0 || i === 3 ? "new" : i === 1 || i === 5 ? "featured" : undefined,
  beds: [4, 5, 3, 6, 7, 3, 4, 4, 5][i],
  baths: [5, 6, 4, 7, 8, 3, 5, 4, 6][i],
  sqft: [4200, 7800, 3100, 8900, 11200, 2400, 4800, 3600, 6500][i],
  image: baseImages[i],
  gallery,
  agentId: agents[i % agents.length].id,
  neighborhood: ["beverly-hills", "manhattan", "manhattan", "malibu", "beverly-hills", "miami-beach", "beverly-hills", "miami-beach", "manhattan"][i],
  yearBuilt: 2015 + (i % 9),
  garage: 2 + (i % 3),
  amenities: [
    "Infinity Pool",
    "Smart Home",
    "Wine Cellar",
    "Home Theater",
    "Private Gym",
    "Chef's Kitchen",
    "Ocean View",
    "Concierge",
  ],
  description:
    "A singular architectural statement marrying restrained minimalism with bespoke craftsmanship. Floor-to-ceiling glass frames panoramic vistas while custom millwork in walnut and brushed bronze defines every interior moment. Designed for those who value silence, light, and proportion.",
}));

export const blogPosts: BlogPost[] = [
  {
    slug: "2026-luxury-market-outlook",
    title: "2026 Luxury Market Outlook: Where Smart Capital is Moving",
    excerpt:
      "A region-by-region analysis of where ultra-prime values are accelerating and where the correction is creating once-a-decade entry points.",
    category: "Market Trends",
    date: "May 28, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
  },
  {
    slug: "buying-second-home-guide",
    title: "The Discreet Buyer's Guide to a Second Home",
    excerpt:
      "From off-market access to structuring for privacy, what the most quietly successful buyers do differently.",
    category: "Buying Guide",
    date: "May 14, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
  },
  {
    slug: "architecture-investment-thesis",
    title: "Why Architecture is the New Asset Class",
    excerpt:
      "Signed contemporary residences are outperforming traditional luxury inventory. We unpack the data and the design.",
    category: "Investment",
    date: "Apr 30, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Keystone Realty handled our acquisition with a level of discretion and architectural literacy we hadn't experienced elsewhere. They understood the brief before we'd finished writing it.",
    name: "Alessandra V.",
    location: "Bel Air, CA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    id: "t2",
    quote:
      "From the first preview to closing, every interaction felt curated. They sourced an off-market townhouse that exceeded what we thought was possible.",
    name: "Jonathan R.",
    location: "Manhattan, NYC",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    id: "t3",
    quote:
      "Beyond the transaction, they introduced us to an entire ecosystem architects, designers, even a discreet relocation team. A true concierge.",
    name: "Marguerite B.",
    location: "Malibu, CA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
  },
];

export const formatPrice = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
};
