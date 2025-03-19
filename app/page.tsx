"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { portals } from "@/lib/portals"
import { PortalCard } from "@/components/portal-card"
import { SearchBar } from "@/components/search-bar"
import { FilterSystem } from "@/components/filter-system"
import { Pagination } from "@/components/pagination"
import { ChevronDown } from "lucide-react"
import type { Category, SDKLanguage } from "@/lib/portals"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSDKs, setSelectedSDKs] = useState<SDKLanguage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const ITEMS_PER_PAGE = 27

  // Handle scroll events to trigger animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to cards section
  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Filter portals based on search and filters
  const filteredPortals = portals.filter((portal) => {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-700 to-sky-500 min-h-screen"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: Math.random() * 0.5 + 0.1,
                  scale: 1,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-screen py-20">
            <motion.div
              className="text-center space-y-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className="relative w-32 h-32"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1.5,
                  }}
                >
                  <Image
                    src="https://docs.apimatic.io/images/logo.svg"
                    alt="APIMatic Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                <h1 className="text-7xl md:text-8xl font-bold text-white mb-6">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    API
                  </motion.span>
                  <motion.span
                    className="inline-block text-sky-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Matic
                  </motion.span>
                </h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <p className="text-xl md:text-2xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
                    Discover and integrate with powerful APIs through our comprehensive SDK portals. Browse our
                    collection of hand-curated API documentation and SDKs.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="w-full max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <SearchBar onSearch={setSearchQuery} />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 cursor-pointer"
              onClick={scrollToCards}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                delay: 1.5,
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <p className="text-sky-100 mb-2 text-sm">Explore Portals</p>
              <ChevronDown className="w-6 h-6 text-sky-100 mx-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section with Filters and Cards */}
      <div ref={cardsRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Column */}
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-4">
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
    </div>
  )
}

