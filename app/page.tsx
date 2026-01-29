import { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { OrganizationSchema, LocalBusinessSchema, FAQSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Premium Exhibition Stand Design & Build Company",
  description: "Verlux Stands is an award-winning exhibition stand design company. We create custom trade show booths, modular displays & bespoke exhibition solutions. 15+ years experience, 500+ projects in 30+ countries.",
  alternates: {
    canonical: "https://verluxstands.com",
  },
  openGraph: {
    title: "Verlux Stands | Premium Exhibition Stand Design & Build Company",
    description: "Award-winning exhibition stand design company creating custom trade show booths and bespoke exhibition solutions worldwide.",
    url: "https://verluxstands.com",
  },
}

const homeFaqs = [
  {
    question: "How much does an exhibition stand cost?",
    answer: "Exhibition stand costs vary based on size, design complexity, and materials. Custom stands typically range from $10,000 to $100,000+. Contact us for a free quote tailored to your specific requirements."
  },
  {
    question: "How long does it take to design and build an exhibition stand?",
    answer: "We recommend starting 4-6 months before your event for custom stands. This allows time for concept development, design refinement, fabrication, and logistics. Rush projects can be accommodated with 8-12 weeks notice."
  },
  {
    question: "Do you offer exhibition stand rental?",
    answer: "Yes, we offer both rental and purchase options. Rental is ideal for companies exhibiting 1-3 times per year, while purchasing becomes more cost-effective for 4+ events annually."
  },
  {
    question: "What locations do you serve?",
    answer: "We deliver exhibition stands worldwide with teams in London, Frankfurt, Las Vegas, Dubai, Singapore, and other major trade show destinations across Europe, North America, Middle East, and Asia Pacific."
  }
]

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={homeFaqs} />
      <main>
        <Header />
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
