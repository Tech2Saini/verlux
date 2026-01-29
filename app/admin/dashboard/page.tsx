"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Search, Globe, AlertTriangle } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SEOPageData } from "@/lib/types/seo"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPages: 0,
    indexedPages: 0,
    noIndexPages: 0,
    missingSchema: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const snapshot = await getDocs(collection(db, "seo_pages"))
        const pages = snapshot.docs.map((doc) => doc.data() as SEOPageData)
        
        setStats({
          totalPages: pages.length,
          indexedPages: pages.filter((p) => p.index).length,
          noIndexPages: pages.filter((p) => !p.index).length,
          missingSchema: pages.filter((p) => !p.schemaType).length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Pages",
      value: stats.totalPages,
      icon: FileText,
      color: "text-primary",
    },
    {
      title: "Indexed Pages",
      value: stats.indexedPages,
      icon: Search,
      color: "text-green-500",
    },
    {
      title: "No-Index Pages",
      value: stats.noIndexPages,
      icon: Globe,
      color: "text-yellow-500",
    },
    {
      title: "Missing Schema",
      value: stats.missingSchema,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to the Verlux Stands CMS Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {loading ? "..." : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/dashboard/create"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Create New Page</p>
                  <p className="text-sm text-muted-foreground">Add a new page with SEO settings</p>
                </div>
              </a>
              <a
                href="/admin/dashboard/seo"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">SEO Editor</p>
                  <p className="text-sm text-muted-foreground">Edit page SEO settings</p>
                </div>
              </a>
              <a
                href="/admin/dashboard/sitemap"
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">View Sitemap</p>
                  <p className="text-sm text-muted-foreground">See all indexed pages</p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">SEO Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Index Coverage</span>
                    <span className="text-sm text-foreground">
                      {stats.totalPages > 0
                        ? Math.round((stats.indexedPages / stats.totalPages) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          stats.totalPages > 0
                            ? (stats.indexedPages / stats.totalPages) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Schema Coverage</span>
                    <span className="text-sm text-foreground">
                      {stats.totalPages > 0
                        ? Math.round(
                            ((stats.totalPages - stats.missingSchema) / stats.totalPages) * 100
                          )
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          stats.totalPages > 0
                            ? ((stats.totalPages - stats.missingSchema) / stats.totalPages) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
