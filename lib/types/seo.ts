export type SchemaType = "LocalBusiness" | "Product" | "Service" | "Organization" | "FAQPage" | "BreadcrumbList"

export interface SEOPageData {
  id?: string
  slug: string
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  index: boolean
  follow: boolean
  schemaType: SchemaType
  schemaData: Record<string, unknown>
  lastUpdated: Date | null
  createdAt?: Date | null
}

export interface PageConfig {
  id?: string
  slug: string
  layout: "landing" | "service" | "city" | "blog" | "custom"
  components: PageComponent[]
  isPublished: boolean
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface PageComponent {
  id: string
  type: "hero" | "cta" | "testimonials" | "services" | "gallery" | "about" | "process" | "portfolio" | "contact-form" | "faq" | "custom"
  props?: Record<string, unknown>
  order: number
}

export const defaultSEOData: Omit<SEOPageData, "slug"> = {
  title: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
  description: "Award-winning exhibition stand design and build company. Custom trade show booths, modular displays & bespoke exhibition solutions worldwide.",
  keywords: ["exhibition stands", "trade show booths", "exhibition stand design"],
  canonical: "",
  ogTitle: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
  ogDescription: "Award-winning exhibition stand design and build company.",
  ogImage: "/images/hero-stand.jpg",
  twitterTitle: "Verlux Stands | Premium Exhibition Stand Design & Build",
  twitterDescription: "Award-winning exhibition stand design and build company.",
  index: true,
  follow: true,
  schemaType: "Organization",
  schemaData: {},
  lastUpdated: null,
}
