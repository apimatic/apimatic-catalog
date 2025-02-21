"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { portals } from "@/lib/portals"
import { PortalCard } from "@/components/portal-card"
import { SearchBar } from "@/components/search-bar"
import { FilterSystem } from "@/components/filter-system"
import type { Category, SDKLanguage } from "@/lib/portals"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSDKs, setSelectedSDKs] = useState<SDKLanguage[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const filteredPortals = portals.filter((portal) => {
    const matchesSearch =
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(portal.category)

    const matchesSDK = selectedSDKs.length === 0 || portal.sdks.some((sdk) => selectedSDKs.includes(sdk))

    return matchesSearch && matchesCategory && matchesSDK
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(!!query)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-b from-sky-50 to-white"
        animate={{
          height: isSearching ? "auto" : "100vh",
          minHeight: isSearching ? "0" : "100vh",
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center justify-center"
            animate={{
              minHeight: isSearching ? "0" : "100vh",
              paddingTop: isSearching ? "2rem" : "0",
              paddingBottom: isSearching ? "1rem" : "0",
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-center space-y-8 mb-8"
              animate={{
                opacity: isSearching ? 0 : 1,
                height: isSearching ? 0 : "auto",
                marginBottom: isSearching ? 0 : "2rem",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center">
                <div className="relative w-24 h-24">
                  <Image
                    src="https://docs.apimatic.io/images/logo.svg"
                    alt="APIMatic Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-6xl font-bold text-sky-600">APIMatic</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover and integrate with powerful APIs through our comprehensive SDK portals. Browse our collection
                of hand-curated API documentation and SDKs.
              </p>
            </motion.div>

            {/* Search Container */}
            <motion.div
              ref={searchContainerRef}
              className="w-full max-w-2xl mx-auto px-4"
              animate={{
                y: isSearching ? 0 : 0,
                marginBottom: isSearching ? "1rem" : "0",
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
            >
              <SearchBar onSearch={handleSearch} />
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <FilterSystem
                      selectedCategories={selectedCategories}
                      selectedSDKs={selectedSDKs}
                      onCategoryChange={setSelectedCategories}
                      onSDKChange={setSelectedSDKs}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {!isSearching && (
              <motion.div
                animate={{ y: 20 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="absolute bottom-8 text-sky-600/50"
              >
                Scroll to explore
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Cards Section */}
      <div className="bg-white">
        <div ref={cardsRef} className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPortals.map((portal, index) => (
                <PortalCard key={portal.url} portal={portal} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

