export type ConnectionState = "disconnected" | "connecting" | "healthy" | "error";
export type TrendPoint = { label: string; primary: number; secondary: number };
export type ChannelMetric = { channel: string; visitors: number; leads: number; conversion: number; revenue: number; trend: number };
export type CrmContact = { id: string; name: string; email: string; company: string; role: string; stage: "New" | "Qualified" | "Proposal" | "Won"; source: string; owner: string; value: number; lastTouch: string; avatar: string };
export type NewsletterCampaign = { id: string; name: string; subject: string; status: "Draft" | "Scheduled" | "Sent"; audience: string; sentAt: string; openRate: number | null; clickRate: number | null };

export const overviewMetrics = [
  { label: "Total reach", value: "284.6K", change: "+18.2%", detail: "Across owned channels", tone: "cyan" },
  { label: "Qualified leads", value: "1,248", change: "+12.6%", detail: "164 added this month", tone: "lime" },
  { label: "Subscribers", value: "38,492", change: "+8.4%", detail: "92.7% engaged", tone: "yellow" },
  { label: "Attributed revenue", value: "$128.4K", change: "+24.1%", detail: "Demo attribution model", tone: "pink" },
] as const;

export const trendData: TrendPoint[] = [
  { label: "May 01", primary: 28, secondary: 18 }, { label: "May 05", primary: 34, secondary: 22 },
  { label: "May 09", primary: 31, secondary: 27 }, { label: "May 13", primary: 48, secondary: 29 },
  { label: "May 17", primary: 43, secondary: 34 }, { label: "May 21", primary: 61, secondary: 39 },
  { label: "May 25", primary: 57, secondary: 44 }, { label: "May 29", primary: 72, secondary: 48 },
  { label: "Jun 02", primary: 68, secondary: 52 }, { label: "Jun 06", primary: 86, secondary: 58 },
  { label: "Jun 10", primary: 82, secondary: 63 }, { label: "Jun 14", primary: 94, secondary: 69 },
];

export const channelMetrics: ChannelMetric[] = [
  { channel: "Organic search", visitors: 98240, leads: 486, conversion: 4.9, revenue: 42300, trend: 16.8 },
  { channel: "Newsletter", visitors: 61480, leads: 328, conversion: 5.3, revenue: 36750, trend: 21.4 },
  { channel: "LinkedIn", visitors: 52210, leads: 214, conversion: 4.1, revenue: 24900, trend: 9.2 },
  { channel: "Direct", visitors: 43860, leads: 142, conversion: 3.2, revenue: 15840, trend: 6.7 },
  { channel: "Referral", visitors: 28760, leads: 78, conversion: 2.7, revenue: 8610, trend: -2.1 },
];

export const pipeline = [
  { stage: "New", count: 286, value: 182000, color: "var(--chart-3)" },
  { stage: "Qualified", count: 148, value: 316000, color: "var(--chart-2)" },
  { stage: "Proposal", count: 64, value: 428000, color: "var(--chart-5)" },
  { stage: "Won", count: 29, value: 264000, color: "var(--chart-1)" },
];

export const contacts: CrmContact[] = [
  { id: "c1", name: "Aarav Mehta", email: "aarav@northstar.ai", company: "Northstar AI", role: "VP Growth", stage: "Qualified", source: "Newsletter", owner: "Harshith", value: 28000, lastTouch: "12 min ago", avatar: "AM" },
  { id: "c2", name: "Mina Park", email: "mina@goodfield.co", company: "Good Field", role: "Founder", stage: "New", source: "LinkedIn", owner: "Harshith", value: 12000, lastTouch: "1 hr ago", avatar: "MP" },
  { id: "c3", name: "Jon Bell", email: "jon@atlasops.io", company: "Atlas Ops", role: "COO", stage: "Proposal", source: "Referral", owner: "Nina", value: 46000, lastTouch: "Yesterday", avatar: "JB" },
  { id: "c4", name: "Leila Haddad", email: "leila@formhouse.com", company: "Form House", role: "Marketing Director", stage: "Won", source: "Organic", owner: "Harshith", value: 32000, lastTouch: "2 days ago", avatar: "LH" },
  { id: "c5", name: "Theo Martin", email: "theo@branchlabs.dev", company: "Branch Labs", role: "Head of Product", stage: "Qualified", source: "Event", owner: "Nina", value: 19500, lastTouch: "3 days ago", avatar: "TM" },
  { id: "c6", name: "Sara Chen", email: "sara@plainwork.io", company: "Plainwork", role: "CEO", stage: "New", source: "Newsletter", owner: "Harshith", value: 22000, lastTouch: "4 days ago", avatar: "SC" },
];

export const campaigns: NewsletterCampaign[] = [
  { id: "n1", name: "Sunday Field Notes #42", subject: "The systems behind consistent growth", status: "Sent", audience: "Main list", sentAt: "Aug 18, 9:00 AM", openRate: 48.6, clickRate: 9.4 },
  { id: "n2", name: "Marketing OS preview", subject: "One dashboard, three operating systems", status: "Scheduled", audience: "Builders", sentAt: "Aug 25, 10:30 AM", openRate: null, clickRate: null },
  { id: "n3", name: "AI operator playbook", subject: "Stop collecting tools. Build a system.", status: "Draft", audience: "Main list", sentAt: "Not scheduled", openRate: null, clickRate: null },
  { id: "n4", name: "Workshop follow-up", subject: "Your next three moves", status: "Sent", audience: "Workshop cohort", sentAt: "Aug 14, 4:00 PM", openRate: 62.1, clickRate: 18.7 },
];

export const connectionCards = [
  { id: "analytics", name: "Analytics source", description: "Traffic, events, conversions, attribution, and campaign performance.", fields: ["Sessions", "Events", "Sources", "Revenue"], state: "disconnected" as ConnectionState, color: "cyan" },
  { id: "crm", name: "CRM source", description: "Contacts, companies, opportunities, ownership, and activity history.", fields: ["Contacts", "Stages", "Owners", "Activities"], state: "disconnected" as ConnectionState, color: "lime" },
  { id: "newsletter", name: "Newsletter source", description: "Subscribers, campaigns, engagement, sequences, and deliverability.", fields: ["Audience", "Campaigns", "Events", "Sequences"], state: "disconnected" as ConnectionState, color: "yellow" },
];
