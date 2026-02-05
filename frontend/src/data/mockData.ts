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
    name: 'Maria Rodriguez',
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
    name: 'TechCorp Industries',
    company: 'TechCorp Industries',
    industry: 'Technology',
    status: 'active',
    healthScore: 85,
    lastContact: new Date('2026-02-03'),
    totalRevenue: 125000,
  },
  {
    id: 'cust-2',
    name: 'Global Retail Solutions',
    company: 'Global Retail Solutions',
    industry: 'Retail',
    status: 'at-risk',
    healthScore: 45,
    lastContact: new Date('2026-01-28'),
    totalRevenue: 89000,
  },
  {
    id: 'cust-3',
    name: 'FinanceFirst Bank',
    company: 'FinanceFirst Bank',
    industry: 'Financial Services',
    status: 'active',
    healthScore: 92,
    lastContact: new Date('2026-02-04'),
    totalRevenue: 320000,
  },
  {
    id: 'cust-4',
    name: 'HealthPlus Medical',
    company: 'HealthPlus Medical',
    industry: 'Healthcare',
    status: 'active',
    healthScore: 78,
    lastContact: new Date('2026-02-01'),
    totalRevenue: 156000,
  },
  {
    id: 'cust-5',
    name: 'EcoGreen Energy',
    company: 'EcoGreen Energy',
    industry: 'Energy',
    status: 'prospect',
    healthScore: 60,
    lastContact: new Date('2026-02-02'),
    totalRevenue: 0,
  },
];

// Generate mock events for the past 90 days
function generateMockEvents(): CustomerEvent[] {
  const events: CustomerEvent[] = [];
  const now = new Date();
  
  const eventTemplates = [
    // TechCorp Industries events
    { customerId: 'cust-1', customerName: 'TechCorp Industries', type: 'email' as const, title: 'Q1 Renewal Discussion', description: 'Positive response to renewal proposal. Customer expressed interest in expanding their license count.', source: 'Gmail', sentiment: 'positive' as const },
    { customerId: 'cust-1', customerName: 'TechCorp Industries', type: 'meeting' as const, title: 'Product Demo - New Features', description: 'Demonstrated new analytics dashboard. Strong interest in real-time reporting capabilities.', source: 'Calendar', sentiment: 'positive' as const },
    { customerId: 'cust-1', customerName: 'TechCorp Industries', type: 'ticket' as const, title: 'API Integration Issue', description: 'Customer reported timeout errors in API calls. Engineering team investigating.', source: 'Zendesk', sentiment: 'negative' as const, priority: 'high' as const },
    
    // Global Retail Solutions events
    { customerId: 'cust-2', customerName: 'Global Retail Solutions', type: 'call' as const, title: 'Escalation Call - Performance Issues', description: 'Customer frustrated with slow load times during peak hours. Requires immediate attention.', source: 'Phone', sentiment: 'negative' as const, priority: 'high' as const },
    { customerId: 'cust-2', customerName: 'Global Retail Solutions', type: 'ticket' as const, title: 'Data Export Not Working', description: 'Monthly report export failing with error. Multiple attempts unsuccessful.', source: 'Zendesk', sentiment: 'negative' as const, priority: 'medium' as const },
    { customerId: 'cust-2', customerName: 'Global Retail Solutions', type: 'email' as const, title: 'Contract Review Request', description: 'Customer asking for contract terms review. May be considering alternatives.', source: 'Gmail', sentiment: 'neutral' as const },
    
    // FinanceFirst Bank events
    { customerId: 'cust-3', customerName: 'FinanceFirst Bank', type: 'purchase' as const, title: 'Enterprise Add-on Purchase', description: 'Purchased advanced security module for $45,000. Deployment scheduled for next month.', source: 'Salesforce', sentiment: 'positive' as const },
    { customerId: 'cust-3', customerName: 'FinanceFirst Bank', type: 'meeting' as const, title: 'Quarterly Business Review', description: 'Excellent QBR session. Customer highlighted 35% efficiency improvement since implementation.', source: 'Calendar', sentiment: 'positive' as const },
    { customerId: 'cust-3', customerName: 'FinanceFirst Bank', type: 'feedback' as const, title: 'NPS Survey Response', description: 'Submitted NPS score of 9. Praised customer support responsiveness.', source: 'Survey', sentiment: 'positive' as const },
    
    // HealthPlus Medical events
    { customerId: 'cust-4', customerName: 'HealthPlus Medical', type: 'email' as const, title: 'Training Request', description: 'Requested additional training sessions for new team members joining in March.', source: 'Gmail', sentiment: 'neutral' as const },
    { customerId: 'cust-4', customerName: 'HealthPlus Medical', type: 'ticket' as const, title: 'HIPAA Compliance Question', description: 'Asking about audit logs and data retention policies for compliance review.', source: 'Zendesk', sentiment: 'neutral' as const, priority: 'medium' as const },
    { customerId: 'cust-4', customerName: 'HealthPlus Medical', type: 'social' as const, title: 'LinkedIn Mention', description: 'Posted about successful digital transformation journey, mentioned our platform positively.', source: 'LinkedIn', sentiment: 'positive' as const },
    
    // EcoGreen Energy events
    { customerId: 'cust-5', customerName: 'EcoGreen Energy', type: 'meeting' as const, title: 'Discovery Call', description: 'Initial discovery meeting. Interested in sustainability reporting features.', source: 'Calendar', sentiment: 'positive' as const },
    { customerId: 'cust-5', customerName: 'EcoGreen Energy', type: 'email' as const, title: 'Proposal Request', description: 'Requested detailed proposal for enterprise package. Decision expected by end of Q1.', source: 'Gmail', sentiment: 'positive' as const },
    { customerId: 'cust-5', customerName: 'EcoGreen Energy', type: 'call' as const, title: 'Technical Requirements Discussion', description: 'Discussed integration with existing ERP system. Some concerns about migration complexity.', source: 'Phone', sentiment: 'neutral' as const },
  ];

  // Distribute events across the past 90 days
  eventTemplates.forEach((template, index) => {
    const daysAgo = Math.floor(Math.random() * 14) + 1; // Random day in last 2 weeks
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(Math.floor(Math.random() * 10) + 8); // 8am - 6pm
    timestamp.setMinutes(Math.floor(Math.random() * 60));

    events.push({
      id: `event-${index + 1}`,
      ...template,
      timestamp,
    });
  });

  // Add some older events
  const olderEvents = [
    { customerId: 'cust-1', customerName: 'TechCorp Industries', type: 'purchase' as const, title: 'Annual Subscription Renewal', description: 'Successfully renewed annual subscription with 10% growth.', source: 'Salesforce', sentiment: 'positive' as const },
    { customerId: 'cust-2', customerName: 'Global Retail Solutions', type: 'meeting' as const, title: 'Implementation Kickoff', description: 'Started Phase 2 implementation. Timeline adjusted due to resource constraints.', source: 'Calendar', sentiment: 'neutral' as const },
    { customerId: 'cust-3', customerName: 'FinanceFirst Bank', type: 'email' as const, title: 'Case Study Approval', description: 'Approved participation in customer success case study.', source: 'Gmail', sentiment: 'positive' as const },
  ];

  olderEvents.forEach((template, index) => {
    const daysAgo = Math.floor(Math.random() * 60) + 30; // 30-90 days ago
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    
    events.push({
      id: `event-old-${index + 1}`,
      ...template,
      timestamp,
    });
  });

  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const mockEvents: CustomerEvent[] = generateMockEvents();

// Mock chat responses based on role
export function generateMockChatResponse(message: string, profile: Profile): string {
  const lowerMessage = message.toLowerCase();
  
  // Role-specific responses
  if (profile.role === 'Account Exec') {
    if (lowerMessage.includes('deal') || lowerMessage.includes('opportunity')) {
      return "**Active Opportunities:**\n\n1. **EcoGreen Energy** - Enterprise License\n   - Stage: Proposal Sent\n   - Value: $180,000 ARR\n   - Close date: End of Q1\n   - Next step: Technical validation meeting\n\n2. **TechCorp Industries** - Expansion\n   - Stage: Negotiation\n   - Value: $45,000 upsell\n   - Decision maker engaged\n\n**Revenue this quarter:** $425K closed, $225K pipeline";
    }
    if (lowerMessage.includes('risk') || lowerMessage.includes('churn')) {
      return "**Account Risk Analysis:**\n\n⚠️ **Global Retail Solutions** - At Risk\n• Health score: 45 (down from 72)\n• Engagement declining over 30 days\n• Key contact left the company\n• Renewal in 60 days\n\n**Recommended actions:**\n1. Executive sponsor meeting ASAP\n2. Coordinate with CSAM on success plan\n3. Involve Cloud Solution Architect for technical reset";
    }
  }
  
  if (profile.role === 'Account Technology Strategist') {
    if (lowerMessage.includes('roadmap') || lowerMessage.includes('strategy') || lowerMessage.includes('transform')) {
      return "**Customer Technology Roadmaps:**\n\n**FinanceFirst Bank**\n• Current: Hybrid cloud migration Phase 2\n• Next: AI/ML workload integration (Q2)\n• Opportunity: Data platform modernization\n\n**TechCorp Industries**\n• Evaluating sustainability initiatives\n• Interest in carbon footprint analytics\n• Digital workplace transformation ongoing\n\n**Alignment opportunities:** 3 customers aligned with upcoming product releases";
    }
  }
  
  if (profile.role === 'Solution Specialist') {
    if (lowerMessage.includes('adoption') || lowerMessage.includes('usage')) {
      return "**Solution Adoption Metrics:**\n\n**High Adoption (>80%):**\n• FinanceFirst Bank - 92% feature utilization\n• HealthPlus Medical - 85% active users\n\n**Needs Attention (<50%):**\n• Global Retail Solutions - 38% adoption\n  - Unused: Advanced analytics, API integrations\n  - Recommendation: Enablement workshop\n\n**Expansion Signals:**\n• TechCorp requesting demo of premium features\n• 2 customers inquiring about add-on modules";
    }
  }
  
  if (profile.role === 'Solution Engineer') {
    if (lowerMessage.includes('technical') || lowerMessage.includes('integration') || lowerMessage.includes('poc')) {
      return "**Active Technical Engagements:**\n\n**POC in Progress:**\n• EcoGreen Energy - API integration POC\n  - Status: Day 5 of 14\n  - Blockers: None\n  - Success criteria: 95% achieved\n\n**Technical Issues:**\n• TechCorp Industries - SSO configuration pending\n• Global Retail Solutions - Performance optimization needed\n\n**Upcoming:**\n• HealthPlus demo environment setup (next week)";
    }
  }
  
  if (profile.role === 'Cloud Solution Architect') {
    if (lowerMessage.includes('architecture') || lowerMessage.includes('design') || lowerMessage.includes('cloud')) {
      return "**Architecture Engagements:**\n\n**Active Designs:**\n• FinanceFirst Bank - Multi-region DR architecture\n  - Review scheduled: Feb 10\n  - Compliance: SOC2, PCI-DSS aligned\n\n• EcoGreen Energy - Greenfield cloud architecture\n  - Phase: Discovery complete\n  - Recommendation: Hybrid approach\n\n**Best Practice Reviews:**\n• 2 customers due for architecture health check\n• TechCorp requesting scalability assessment";
    }
  }
  
  if (profile.role === 'CSAM') {
    if (lowerMessage.includes('health') || lowerMessage.includes('success') || lowerMessage.includes('adoption')) {
      return "**Customer Health Dashboard:**\n\n🟢 **Healthy (3):**\n• FinanceFirst Bank - Score: 92\n• TechCorp Industries - Score: 85\n• HealthPlus Medical - Score: 78\n\n🟡 **Needs Attention (1):**\n• EcoGreen Energy - Score: 60 (new customer)\n\n🔴 **At Risk (1):**\n• Global Retail Solutions - Score: 45\n  - Action plan created\n  - Executive escalation in progress\n\n**Upcoming QBRs:** 2 this month";
    }
    if (lowerMessage.includes('risk') || lowerMessage.includes('churn')) {
      return "**Risk Assessment - Global Retail Solutions:**\n\n**Risk Indicators:**\n• Health score dropped 27 points in 30 days\n• 3 unresolved support escalations\n• NPS response: Detractor (score: 4)\n• Key stakeholder departed\n\n**Mitigation Plan:**\n1. ✅ Executive sponsor meeting scheduled (Feb 8)\n2. ⏳ Technical health check with Solution Engineer\n3. ⏳ Success plan revision with customer\n4. 📋 Escalation to Account Exec for renewal strategy";
    }
  }
  
  // Generic responses
  if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
    return "**This Week's Customer Activity Summary:**\n\n📊 **By the Numbers:**\n- 15 customer interactions logged\n- 5 meetings conducted\n- 8 emails exchanged\n- 2 high-priority issues\n\n🟢 **Positive Highlights:**\n- FinanceFirst Bank purchased enterprise add-on ($45K)\n- TechCorp showing strong renewal signals\n- HealthPlus featured us on LinkedIn\n\n🔴 **Attention Required:**\n- Global Retail Solutions health declining\n- 2 escalated support tickets need resolution";
  }
  
  return "I've analyzed the customer data based on your role as " + profile.role + ". Here's what I found:\n\n• 5 active customers in your portfolio\n• 1 customer (Global Retail Solutions) showing at-risk signals\n• 2 customers with positive engagement this week\n• 1 active prospect in pipeline\n\nWould you like me to drill down into any specific customer or provide recommendations based on your priorities?";
}

// Initial chat messages
export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Hello! I'm your Hivemind AI assistant. I have access to consolidated customer data from all your internal and external sources. Based on your role, I can help you with:\n\n• Customer health and risk analysis\n• Activity summaries and trends\n• Actionable insights and recommendations\n\nWhat would you like to know about your customers?",
    timestamp: new Date(),
  },
];
