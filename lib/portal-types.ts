export type SDKLanguage = "C#" | "PHP" | "Python" | "Go" | "JavaScript" | "Java" | "Ruby" | "TypeScript"
export type Category = "Fintech" | "E-commerce" | "Payments" | "Crypto" | "Banking" | "Identity"
export type Status = "NEWEST ADDITION" | "HAND CURATED" | "FEATURED" | "POPULAR" | "STAFF PICK" | null

export interface Portal {
  name: string
  url: string
  logoUrl: string
  description: string
  category: Category
  status?: Status
  sdks: SDKLanguage[]
  addedAt: string // ISO date string
  screenshotUrl?: string // New field for screenshots
}