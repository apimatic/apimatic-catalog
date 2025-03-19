"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Portal } from "@/lib/portals"

interface PortalCardProps {
  portal: Portal
  index: number
}

const languageIcons: Record<string, string> = {
  Python: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  JavaScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  TypeScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  Java: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  "C#": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
  PHP: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
  Ruby: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg",
  Go: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
}

export function PortalCard({ portal, index }: PortalCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 50,
        damping: 20,
      }}
      whileHover={{ y: -5 }}
    >
      <Link href={portal.url} target="_blank" rel="noopener noreferrer">
        <Card className="group h-full transition-all hover:shadow-lg border-sky-100">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8">
                  <Image
                    src={portal.logoUrl || "/placeholder.svg"}
                    alt={`${portal.name} logo`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold">{portal.name}</h3>
              </div>
              {portal.status && (
                <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                  {portal.status}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt={`${portal.name} portal preview`}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">{portal.description}</p>
            <div className="flex flex-wrap gap-2">
              {portal.sdks.map((sdk) => (
                <Badge key={sdk} variant="outline" className="border-sky-200 text-sky-700 flex items-center gap-1">
                  {languageIcons[sdk] && (
                    <Image
                      src={languageIcons[sdk] || "/placeholder.svg"}
                      alt={`${sdk} logo`}
                      width={16}
                      height={16}
                      className="rounded"
                    />
                  )}
                  {sdk}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Badge variant="default" className="bg-sky-600 hover:bg-sky-700">
              {portal.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground group-hover:text-sky-600 transition-colors">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Portal
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

