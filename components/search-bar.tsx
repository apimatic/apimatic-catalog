"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <motion.div className="relative w-full" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <Input
        className="w-full pl-12 h-12 text-base rounded-lg border-2 border-gray-200 focus:border-sky-300 transition-all shadow-sm hover:shadow-md bg-white"
        placeholder="Search portals by name or description..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </motion.div>
  )
}

