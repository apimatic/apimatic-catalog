export type SDKLanguage = "C#" | "PHP" | "Python" | "Go" | "JavaScript" | "Java" | "Ruby" | "TypeScript"
export type Category = "Fintech" | "E-commerce" | "Payments" | "Crypto" | "Banking" | "Identity"
export type Status = "NEWEST ADDITION" | "HAND CURATED" | "FEATURED" | "POPULAR" | "STAFF PICK"

export interface Portal {
  name: string
  url: string
  logoUrl: string
  description: string
  category: Category
  status?: Status
  sdks: SDKLanguage[]
  addedAt: string // ISO date string
}

export const portals: Portal[] = [
  {
    name: "Moneyhub",
    url: "http://moneyhub-apimatic-catalog.pages.dev",
    logoUrl: "https://moneyhub.com/favicon.ico",
    description: "Complete financial data platform for businesses",
    category: "Fintech",
    status: "STAFF PICK",
    sdks: ["Python", "JavaScript", "TypeScript", "Java"],
    addedAt: "2024-01-15",
  },
  {
    name: "Brex",
    url: "http://brex-apimatic-catalog.pages.dev",
    logoUrl: "https://www.brex.com/favicon.ico",
    description: "All-in-one finance for growing businesses",
    category: "Fintech",
    status: "POPULAR",
    sdks: ["Python", "Ruby", "JavaScript", "Go", "C#"],
    addedAt: "2024-02-01",
  },
  // ... Add the rest of the portals with their metadata
]

