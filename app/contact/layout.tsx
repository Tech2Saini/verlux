import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Exhibition Stand Quote",
  description: "Contact Verlux Stands for a free consultation and quote. Get in touch via phone, email or our online form. Response within 24 hours. London office: +44 20 1234 5678.",
  keywords: ["contact Verlux Stands", "exhibition stand quote", "trade show booth enquiry", "exhibition stand consultation", "booth design quote"],
  alternates: {
    canonical: "https://verluxstands.com/contact",
  },
  openGraph: {
    title: "Contact Us | Verlux Stands",
    description: "Get a free exhibition stand consultation and quote. We respond within 24 hours.",
    url: "https://verluxstands.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
