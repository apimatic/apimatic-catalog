"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Category, SDKLanguage } from "@/lib/portals"

interface FilterSystemProps {
  selectedCategories: Category[]
  selectedSDKs: SDKLanguage[]
  onCategoryChange: (categories: Category[]) => void
  onSDKChange: (sdks: SDKLanguage[]) => void
}

export function FilterSystem({ selectedCategories, selectedSDKs, onCategoryChange, onSDKChange }: FilterSystemProps) {
  const categories: Category[] = ["Fintech", "E-commerce", "Payments", "Crypto", "Banking", "Identity"]
  const sdks: SDKLanguage[] = ["C#", "PHP", "Python", "Go", "JavaScript", "Java", "Ruby", "TypeScript"]

  return (
    <div className="flex justify-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            Categories ({selectedCategories.length || "All"})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onCategoryChange([...selectedCategories, category])
                } else {
                  onCategoryChange(selectedCategories.filter((c) => c !== category))
                }
              }}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            SDKs ({selectedSDKs.length || "All"})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel>Filter by SDK</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sdks.map((sdk) => (
            <DropdownMenuCheckboxItem
              key={sdk}
              checked={selectedSDKs.includes(sdk)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onSDKChange([...selectedSDKs, sdk])
                } else {
                  onSDKChange(selectedSDKs.filter((s) => s !== sdk))
                }
              }}
            >
              {sdk}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

