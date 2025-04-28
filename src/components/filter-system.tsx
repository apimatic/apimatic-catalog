"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from "lucide-react"
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
  vertical?: boolean
}

export function FilterSystem({
  selectedCategories,
  selectedSDKs,
  onCategoryChange,
  onSDKChange,
  vertical = false,
}: FilterSystemProps) {
  const categories: Category[] = ["Fintech", "E-commerce", "Payments", "Crypto", "Banking", "Identity"]
  const sdks: SDKLanguage[] = ["C#", "PHP", "Python", "Go", "JavaScript", "Java", "Ruby", "TypeScript"]

  const [categoryExpanded, setCategoryExpanded] = useState(true)
  const [sdkExpanded, setSdkExpanded] = useState(true)

  // For horizontal layout (dropdown style)
  if (!vertical) {
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

  // For vertical layout (sidebar style)
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setCategoryExpanded(!categoryExpanded)}
        >
          <h3 className="font-medium text-sky-900">Categories</h3>
          {categoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {categoryExpanded && (
          <div className="space-y-2 mt-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onCategoryChange([...selectedCategories, category])
                    } else {
                      onCategoryChange(selectedCategories.filter((c) => c !== category))
                    }
                  }}
                />
                <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setSdkExpanded(!sdkExpanded)}
        >
          <h3 className="font-medium text-sky-900">SDK Languages</h3>
          {sdkExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {sdkExpanded && (
          <div className="space-y-2 mt-3">
            {sdks.map((sdk) => (
              <div key={sdk} className="flex items-center space-x-2">
                <Checkbox
                  id={`sdk-${sdk}`}
                  checked={selectedSDKs.includes(sdk)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSDKChange([...selectedSDKs, sdk])
                    } else {
                      onSDKChange(selectedSDKs.filter((s) => s !== sdk))
                    }
                  }}
                />
                <label htmlFor={`sdk-${sdk}`} className="text-sm cursor-pointer">
                  {sdk}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {(selectedCategories.length > 0 || selectedSDKs.length > 0) && (
        <Button
          variant="outline"
          className="w-full text-sm"
          onClick={() => {
            onCategoryChange([])
            onSDKChange([])
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )
}

