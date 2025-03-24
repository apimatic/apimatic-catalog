"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { portals } from "@/lib/portals"
import { PortalCard } from "@/components/portal-card"
import { SearchBar } from "@/components/search-bar"
import { FilterSystem } from "@/components/filter-system"
import { Pagination } from "@/components/pagination"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Category, SDKLanguage } from "@/lib/portals"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSDKs, setSelectedSDKs] = useState<SDKLanguage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const cardsRef = useRef<HTMLDivElement>(null)

  const ITEMS_PER_PAGE = 27

  // Filter portals based on search and filters
  const filteredPortals = portals
    .sort((a, b) => {
      // Sort portals with status first
      if (a.status && !b.status) return -1
      if (!a.status && b.status) return 1
      return 0
    })
    .filter((portal) => {
      const matchesSearch =
        portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(portal.category)

      const matchesSDK = selectedSDKs.length === 0 || portal.sdks.some((sdk) => selectedSDKs.includes(sdk))

      return matchesSearch && matchesCategory && matchesSDK
    })

  // Calculate pagination
  const totalPages = Math.ceil(filteredPortals.length / ITEMS_PER_PAGE)
  const paginatedPortals = filteredPortals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedSDKs])

  // Add this useEffect to ensure portals are visible on initial load
  useEffect(() => {
    // Set a small timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (cardsRef.current) {
        const headerHeight = 64 // Approximate header height
        const scrollPosition = cardsRef.current.getBoundingClientRect().top + window.scrollY - headerHeight
        window.scrollTo({
          top: 0, // Don't auto-scroll on initial load
          behavior: "auto",
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section - Shorter */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 py-12">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="text-center space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    API
                  </motion.span>
                  <motion.span
                    className="inline-block text-sky-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Matic
                  </motion.span>
                </h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-lg text-sky-100 max-w-2xl mx-auto">
                    Discover and integrate with powerful APIs through our comprehensive SDK portals. Browse our
                    collection of hand-curated API documentation and SDKs.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section with Filters and Cards */}
      <div ref={cardsRef} className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Search Bar - Moved closer to content */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Column */}
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-sky-900">Filters</h2>
                <FilterSystem
                  selectedCategories={selectedCategories}
                  selectedSDKs={selectedSDKs}
                  onCategoryChange={setSelectedCategories}
                  onSDKChange={setSelectedSDKs}
                  vertical={true}
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-sky-900">
                  {searchQuery ? `Results for "${searchQuery}"` : "All Portals"}
                </h2>
                <p className="text-sm text-gray-500">
                  Showing {paginatedPortals.length} of {filteredPortals.length} portals
                </p>
              </div>

              {paginatedPortals.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedPortals.map((portal, index) => (
                    <PortalCard key={portal.url} portal={portal} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium text-gray-600">No results found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}

              {/* Pagination */}
              {filteredPortals.length > ITEMS_PER_PAGE && (
                <div className="mt-12">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

