import { Profile, Customer, CustomerEvent, ChatMessage } from '@/types';

// Mock profiles representing different roles in the company
export const mockProfiles: Profile[] = [
  {
    id: 'prof-1',
    name: 'Sarah Chen',
    role: 'Account Exec',
    department: 'Sales',
    description: 'Drives revenue growth by managing customer relationships and closing deals. Focuses on understanding customer business needs and aligning solutions to meet their objectives.',
    avatar: 'SC',
  },
  {
    id: 'prof-2',
    name: 'James Wilson',
    role: 'Account Technology Strategist',
    department: 'Technology Strategy',
    description: 'Partners with customers to define their technology roadmap and digital transformation journey. Bridges business objectives with technical solutions.',
    avatar: 'JW',
  },
  {
    id: 'prof-3',
    name: 'Marie Torelle',
    role: 'Solution Specialist',
    department: 'Solutions',
    description: 'Expert in specific solution areas who helps customers understand how products can address their business challenges. Drives solution adoption and expansion.',
    avatar: 'MR',
  },
  {
    id: 'prof-4',
    name: 'David Kim',
    role: 'Solution Engineer',
    department: 'Engineering',
    description: 'Provides technical expertise during the sales process. Designs and demonstrates solutions, creates proof of concepts, and addresses technical requirements.',
    avatar: 'DK',
  },
  {
    id: 'prof-5',
    name: 'Emma Thompson',
    role: 'Cloud Solution Architect',
    department: 'Architecture',
    description: 'Designs and guides implementation of cloud solutions. Ensures technical feasibility, scalability, and alignment with best practices and customer requirements.',
    avatar: 'ET',
  },
  {
    id: 'prof-6',
    name: 'Michael Brown',
    role: 'CSAM',
    department: 'Customer Success',
    description: 'Customer Success Account Manager responsible for customer health, adoption, and value realization. Acts as the customer advocate and orchestrates resources to ensure success.',
    avatar: 'MB',
  },
];

// Mock customers
export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Proximus Group',
    company: 'Proximus Group',
    industry: 'Telecommunications',
    status: 'active',
    healthScore: 85,
    lastContact: new Date('2026-02-03'),
    totalRevenue: 5800000,
  },
];

// Proximus news events based on real highlights
function generateMockEvents(): CustomerEvent[] {
  const events: CustomerEvent[] = [
    {
      id: 'event-1',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'meeting',
      title: 'CEO Transition Update',
      description: 'Guillaume Boutin exits; Jan Van Acoleyen serves as interim CEO from 17 Apr 2025; Stijn Bijnens becomes Group CEO on 1 Sep 2025.',
      source: 'proximus.com',
      sentiment: 'neutral',
      timestamp: new Date('2026-01-28'),
    },
    {
      id: 'event-2',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'meeting',
      title: 'Leadership Squad Refresh',
      description: 'New Benelux governance with R. Tilmans (B2B), F. De Windt (Proximus NXT), J. Casteele (B2C & AI), D. Goemans (Customer Operations), J. Verbruggen (IT); A‑V. Heuschen named Group Secretary General.',
      source: 'proximus.com',
      sentiment: 'positive',
      timestamp: new Date('2026-02-03'),
    },
    {
      id: 'event-3',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'purchase',
      title: 'Creation of Proximus Global',
      description: 'BICS, Telesign, Route Mobile unified under Proximus Global to simplify governance and scale CPaaS/digital identity and global connectivity.',
      source: 'rcrwireless.com',
      sentiment: 'positive',
      timestamp: new Date('2025-11-15'),
    },
    {
      id: 'event-4',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'meeting',
      title: 'Starlink Partnership Announced',
      description: 'BICS (Proximus Global) becomes preferred IPX provider in Europe for direct‑to‑cell satellite services, initially enabling operators like Kyivstar.',
      source: 'bics.com',
      sentiment: 'positive',
      timestamp: new Date('2026-01-25'),
    },
    {
      id: 'event-5',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'purchase',
      title: 'Ericsson Indoor 4G/5G Deployment',
      description: 'Proximus adopts Ericsson Radio Dot System to boost indoor enterprise and venue coverage nationwide.',
      source: 'ericsson.com',
      sentiment: 'positive',
      timestamp: new Date('2025-12-10'),
    },
    {
      id: 'event-6',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'ticket',
      title: 'Flanders Fiber Collaboration - Regulatory Process',
      description: 'BCA/BIPT launched a market test on proposed Proximus/Fiberklaar & Telenet/Wyre cooperation to accelerate FTTH with FRAND access.',
      source: 'bma-abc.be',
      sentiment: 'neutral',
      priority: 'medium',
      timestamp: new Date('2026-01-20'),
    },
    {
      id: 'event-7',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'feedback',
      title: 'Q3-2025 Performance & Guidance Reset',
      description: 'Strong domestic adds (+45k postpaid, +12k internet; ~2.5M homes passed by fiber), Global EBITDA under pressure; CapEx cut to €1.25bn; organic FCF ~€100m; 2026 Global EBITDA reset €100–130m.',
      source: 'proximus.com',
      sentiment: 'neutral',
      priority: 'high',
      timestamp: new Date('2026-01-15'),
    },
    {
      id: 'event-8',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'email',
      title: 'Price Adjustments Effective Jan 2026',
      description: 'Most older bundles & selected services increased by €1–€4/month, citing persistent cost inflation; widely reported in Belgian media.',
      source: 'brusselstimes.com',
      sentiment: 'negative',
      priority: 'medium',
      timestamp: new Date('2026-02-01'),
    },
    {
      id: 'event-9',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'purchase',
      title: 'Defence Cyber Contract Won',
      description: 'Proximus NXT selected as a strategic cyber partner for Belgium\'s Ministry of Defence (multi‑year Cyber Force support).',
      source: 'proximus.com',
      sentiment: 'positive',
      timestamp: new Date('2026-01-31'),
    },
    {
      id: 'event-10',
      customerId: 'cust-1',
      customerName: 'Proximus Group',
      type: 'meeting',
      title: 'Sovereign Cloud Initiative',
      description: 'Proximus to deliver Google Distributed Cloud Hosted in Belgium & Luxembourg (with LuxConnect); also offers a sovereign cloud route with Microsoft (encryption/keys held in EU).',
      source: 'proximus.be',
      sentiment: 'positive',
      timestamp: new Date('2026-01-10'),
    },
  ];

  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const mockEvents: CustomerEvent[] = generateMockEvents();

// Mock chat responses based on role
export function generateMockChatResponse(message: string, profile: Profile): string {
  const lowerMessage = message.toLowerCase();
  
  // Role-specific responses
  if (profile.role === 'Account Exec') {
    if (lowerMessage.includes('deal') || lowerMessage.includes('opportunity')) {
      return "**Active Opportunities with Proximus:**\n\n1. **Proximus NXT Expansion** - Cyber Services\n   - Stage: Contract Negotiation\n   - Value: €2.5M multi-year\n   - Defence Ministry cyber contract secured Jan 2026\n\n2. **Sovereign Cloud Services**\n   - Stage: Active Engagement\n   - Google Distributed Cloud & Microsoft routes\n   - Belgium & Luxembourg markets\n\n**Key Decision Makers:**\n• Stijn Bijnens (Group CEO since Sep 2025)\n• New leadership squad appointed Jan 2026";
    }
    if (lowerMessage.includes('risk') || lowerMessage.includes('churn')) {
      return "**Account Risk Analysis - Proximus:**\n\n⚠️ **Areas to Monitor:**\n• Price adjustments (€1-€4/month) effective Jan 2026 - customer perception\n• Global EBITDA under pressure - 2026 reset to €100-130m\n• CapEx cut to €1.25bn may impact project timelines\n\n✅ **Positive Signals:**\n• Strong domestic adds: +45k postpaid, +12k internet\n• ~2.5M homes passed by fiber\n• New leadership energizing transformation";
    }
  }
  
  if (profile.role === 'Account Technology Strategist') {
    if (lowerMessage.includes('roadmap') || lowerMessage.includes('strategy') || lowerMessage.includes('transform')) {
      return "**Proximus Technology Roadmap:**\n\n**Current Initiatives:**\n• Proximus Global unification (BICS, Telesign, Route Mobile)\n• CPaaS & digital identity scaling\n• Starlink partnership for direct-to-cell satellite services\n\n**Infrastructure:**\n• Ericsson Radio Dot System for indoor 4G/5G (Apr 2025)\n• Flanders fiber collaboration with Fiberklaar/Telenet/Wyre\n• FTTH acceleration with FRAND access\n\n**Cloud Strategy:**\n• Google Distributed Cloud Hosted (BE/LU)\n• Microsoft sovereign cloud route\n• EU-held encryption keys";
    }
  }
  
  if (profile.role === 'Solution Specialist') {
    if (lowerMessage.includes('adoption') || lowerMessage.includes('usage')) {
      return "**Proximus Solution Adoption:**\n\n**High Traction Areas:**\n• Cyber security services (Defence contract won)\n• Sovereign cloud offerings\n• Enterprise indoor coverage (Ericsson deployment)\n\n**Growth Opportunities:**\n• Proximus Global CPaaS platform\n• Direct-to-cell satellite via Starlink/BICS\n• FTTH enterprise services (~2.5M homes passed)\n\n**Cross-sell Potential:**\n• Bundle Proximus NXT cyber with connectivity\n• Sovereign cloud + managed security";
    }
  }
  
  if (profile.role === 'Solution Engineer') {
    if (lowerMessage.includes('technical') || lowerMessage.includes('integration') || lowerMessage.includes('poc')) {
      return "**Active Technical Engagements - Proximus:**\n\n**In Progress:**\n• Ericsson Radio Dot indoor deployment\n  - Enterprise & venue coverage rollout\n  - Status: Nationwide implementation\n\n• Sovereign Cloud Integration\n  - Google Distributed Cloud setup\n  - LuxConnect partnership active\n\n**Technical Considerations:**\n• FTTH FRAND access regulatory requirements\n• IPX integration for Starlink D2C services\n• Proximus Global platform consolidation";
    }
  }
  
  if (profile.role === 'Cloud Solution Architect') {
    if (lowerMessage.includes('architecture') || lowerMessage.includes('design') || lowerMessage.includes('cloud')) {
      return "**Proximus Cloud Architecture:**\n\n**Sovereign Cloud Stack:**\n• Google Distributed Cloud Hosted\n  - Locations: Belgium & Luxembourg\n  - Partner: LuxConnect\n• Microsoft Sovereign Route\n  - EU-held encryption keys\n  - Compliance-ready architecture\n\n**Network Architecture:**\n• FTTH expansion (~2.5M homes)\n• Indoor 4G/5G (Ericsson Radio Dot)\n• Starlink IPX integration via BICS\n\n**Security Considerations:**\n• Defence-grade cyber capabilities\n• Data sovereignty requirements met";
    }
  }
  
  if (profile.role === 'CSAM') {
    if (lowerMessage.includes('health') || lowerMessage.includes('success') || lowerMessage.includes('adoption')) {
      return "**Proximus Account Health:**\n\n🟢 **Health Score: 85**\n\n**Positive Indicators:**\n• Defence cyber contract secured (Jan 2026)\n• New leadership providing fresh momentum\n• Strong domestic subscriber growth\n• Strategic partnerships (Starlink, Ericsson)\n\n🟡 **Monitor:**\n• Global EBITDA pressure\n• Price adjustment market reception\n• CapEx reduction impact\n\n**Upcoming Milestones:**\n• Fiber deployment targets\n• Proximus Global integration completion";
    }
    if (lowerMessage.includes('risk') || lowerMessage.includes('churn')) {
      return "**Risk Assessment - Proximus:**\n\n**Watch Items:**\n• Price increases (Jan 2026) may affect sentiment\n• Global segment under EBITDA pressure\n• Leadership transition period (CEO changed Sep 2025)\n\n**Mitigation Actions:**\n1. ✅ Engaged with new leadership team\n2. ✅ Positioned for sovereign cloud opportunity\n3. ⏳ Monitoring fiber collaboration regulatory outcome\n4. 📋 Tracking customer reaction to pricing changes";
    }
  }
  
  // Generic responses
  if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
    return "**Proximus Activity Summary:**\n\n📊 **Recent Developments:**\n\n**Leadership (2025-2026):**\n• Stijn Bijnens became Group CEO (Sep 2025)\n• New leadership squad appointed (Jan 2026)\n\n**Strategic Moves:**\n• Proximus Global created (BICS+Telesign+Route Mobile)\n• Starlink partnership for satellite services\n• Defence cyber contract won\n\n**Infrastructure:**\n• 2.5M homes passed with fiber\n• Ericsson indoor 4G/5G deployed\n• Sovereign cloud with Google & Microsoft\n\n⚠️ **Attention:**\n• Price adjustments effective Jan 2026\n• Global EBITDA guidance reset";
  }
  
  return "I've analyzed Proximus Group data based on your role as " + profile.role + ". Here's what I found:\n\n• Active telecommunications account in Belgium\n• Recent leadership transition completed\n• Multiple strategic initiatives underway\n• Defence cyber contract secured\n• Sovereign cloud opportunities active\n\nWould you like me to drill down into specific news, opportunities, or provide recommendations?";
}

// Initial chat messages
export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Hello! I'm your hAIvemind AI assistant. I have access to consolidated Proximus Group data from news sources, internal systems, and market intelligence. Based on your role, I can help you with:\n\n• Recent news and strategic updates\n• Leadership and organizational changes\n• Technology initiatives and partnerships\n• Account health and opportunities\n\nWhat would you like to know about Proximus?",
    timestamp: new Date(),
  },
];
