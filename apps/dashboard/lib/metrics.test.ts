import { describe, expect, it } from "vitest";

import { filterCampaigns, filterContacts, formatCompactCurrency } from "./metrics";

const contacts = [
  { name: "Aarav Mehta", company: "Northstar", email: "aarav@example.com", stage: "Qualified" },
  { name: "Mina Park", company: "Good Field", email: "mina@example.com", stage: "New" },
];

const campaigns = [
  { name: "Sunday Field Notes", status: "Sent" },
  { name: "Launch letter", status: "Draft" },
];

describe("formatCompactCurrency", () => {
  it("formats thousands without noisy decimals", () => {
    expect(formatCompactCurrency(128400)).toBe("$128.4K");
  });
});

describe("filterContacts", () => {
  it("matches query and stage case-insensitively", () => {
    expect(filterContacts(contacts, "north", "qualified")).toHaveLength(1);
    expect(filterContacts(contacts, "north", "qualified")[0].name).toBe("Aarav Mehta");
  });
});

describe("filterCampaigns", () => {
  it("returns only campaigns in the selected status", () => {
    expect(filterCampaigns(campaigns, "draft").map((campaign) => campaign.name)).toEqual(["Launch letter"]);
  });
});
