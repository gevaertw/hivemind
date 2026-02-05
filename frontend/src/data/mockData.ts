import { Profile, Customer, CustomerEvent, ChatMessage } from '@/types';

// Mock profiles representing different roles in the company
export const mockProfiles: Profile[] = [
  {
    id: 'prof-1',
    name: 'Sarah Chen',
    role: 'Customer Success Manager',
    department: 'Customer Success',
    description: 'Responsible for ensuring customer satisfaction and retention. Focus on proactive engagement, identifying upsell opportunities, and reducing churn.',
    avatar: 'SC',
  },
  {
    id: 'prof-2',
    name: 'James Wilson',
    role: 'Sales Executive',
    department: 'Sales',
    description: 'Focuses on new business acquisition and expanding existing accounts. Needs insights on purchase history, engagement levels, and opportunity signals.',
    avatar: 'JW',
  },
  {
    id: 'prof-3',
    name: 'Maria Rodriguez',
    role: 'Support Lead',
    department: 'Technical Support',
    description: 'Manages technical support escalations and team performance. Requires visibility into ticket trends, resolution times, and customer satisfaction scores.',
    avatar: 'MR',
  },
  {
    id: 'prof-4',
    name: 'David Kim',
    role: 'Product Manager',
    department: 'Product',
    description: 'Drives product strategy and roadmap decisions. Needs aggregated customer feedback, feature requests, and usage patterns.',
    avatar: 'DK',
  },
  {
    id: 'prof-5',
    name: 'Emma Thompson',
    role: 'Marketing Director',
    department: 'Marketing',
    description: 'Leads marketing campaigns and brand strategy. Interested in customer sentiment, social engagement, and campaign response data.',
    avatar: 'ET',
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
  if (profile.role === 'Customer Success Manager') {
    if (lowerMessage.includes('risk') || lowerMessage.includes('churn')) {
      return "Based on recent activity, Global Retail Solutions shows churn risk indicators:\n\n• Health score dropped from 72 to 45 over the past month\n• 3 unresolved support tickets with negative sentiment\n• No engagement with new feature announcements\n• Last QBR was 4 months ago\n\n**Recommended actions:**\n1. Schedule an urgent check-in call\n2. Fast-track their open support issues\n3. Offer a personalized training session on recent improvements";
    }
    if (lowerMessage.includes('upsell') || lowerMessage.includes('expand')) {
      return "Best upsell opportunities this week:\n\n1. **FinanceFirst Bank** - High health score (92), recently praised our platform. They're using 80% of their license seats.\n   - Opportunity: Additional user licenses + Security add-on\n   - Estimated value: $65,000\n\n2. **TechCorp Industries** - Actively exploring new features, positive sentiment.\n   - Opportunity: Analytics Pro tier upgrade\n   - Estimated value: $28,000";
    }
  }
  
  if (profile.role === 'Sales Executive') {
    if (lowerMessage.includes('prospect') || lowerMessage.includes('lead')) {
      return "Current hot prospect: **EcoGreen Energy**\n\n• Initial discovery completed with positive reception\n• Requested enterprise proposal - decision expected by end of Q1\n• Key stakeholders: Sarah Martinez (VP Operations), Tom Chen (CTO)\n• Pain points: Legacy system migration, sustainability reporting\n• Competition: Evaluating 2 other vendors\n\n**Next steps:**\n- Send customized ROI analysis\n- Schedule technical deep-dive with their IT team\n- Arrange reference call with similar industry customer";
    }
  }
  
  if (profile.role === 'Support Lead') {
    if (lowerMessage.includes('ticket') || lowerMessage.includes('issue')) {
      return "Support ticket summary:\n\n**Open High Priority (2):**\n• TechCorp Industries - API Integration Issue (48h old)\n• Global Retail Solutions - Performance escalation (resolved pending confirmation)\n\n**Open Medium Priority (3):**\n• Global Retail Solutions - Data export failure\n• HealthPlus Medical - Compliance documentation request\n• TechCorp Industries - SSO configuration question\n\n**Today's resolution rate:** 87%\n**Avg first response time:** 2.4 hours";
    }
  }
  
  // Generic responses
  if (lowerMessage.includes('summary') || lowerMessage.includes('overview')) {
    return "**This Week's Customer Activity Summary:**\n\n📊 **By the Numbers:**\n- 15 customer interactions logged\n- 5 meetings conducted\n- 8 emails exchanged\n- 2 high-priority issues\n\n🟢 **Positive Highlights:**\n- FinanceFirst Bank purchased enterprise add-on ($45K)\n- TechCorp showing strong renewal signals\n- HealthPlus featured us on LinkedIn\n\n🔴 **Attention Required:**\n- Global Retail Solutions health declining\n- 2 escalated support tickets need resolution";
  }
  
  return "I've analyzed the customer data based on your role. Here's what I found:\n\n• 5 active customers in your portfolio\n• 1 customer (Global Retail Solutions) showing at-risk signals\n• 2 customers with positive engagement this week\n• 1 active prospect in pipeline\n\nWould you like me to drill down into any specific customer or provide recommendations based on your priorities?";
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
