"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <motion.div className="relative w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
      <Input
        className="w-full pl-12 h-14 text-lg rounded-2xl border-2 border-sky-300/30 focus:border-sky-300/50 transition-all shadow-lg bg-white/10 backdrop-blur-md text-white placeholder:text-white/70"
        placeholder="Search portals..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </motion.div>
  )
}

