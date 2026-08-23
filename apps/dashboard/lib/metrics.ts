type SearchableContact = {
  name: string;
  company: string;
  email: string;
  stage: string;
};

type SearchableCampaign = {
  name: string;
  status: string;
};

export function formatCompactCurrency(value: number) {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `$${value.toLocaleString("en-US")}`;
}

export function filterContacts<T extends SearchableContact>(contacts: T[], query: string, stage: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStage = stage.trim().toLowerCase();
  return contacts.filter((contact) => {
    const matchesQuery = !normalizedQuery || [contact.name, contact.company, contact.email].some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesStage = !normalizedStage || normalizedStage === "all" || contact.stage.toLowerCase() === normalizedStage;
    return matchesQuery && matchesStage;
  });
}

export function filterCampaigns<T extends SearchableCampaign>(campaigns: T[], status: string) {
  const normalizedStatus = status.trim().toLowerCase();
  if (!normalizedStatus || normalizedStatus === "all") return campaigns;
  return campaigns.filter((campaign) => campaign.status.toLowerCase() === normalizedStatus);
}
