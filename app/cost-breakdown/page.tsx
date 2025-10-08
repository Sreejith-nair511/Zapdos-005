"use client"

import { CostBreakdown } from "@/components/cost-breakdown"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CostBreakdownPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/demo">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Demo Scenarios
          </Button>
        </Link>
      </div>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Digital Sarpanch Financial Model</h1>
        <p className="text-muted-foreground">
          Per-Village Cost Breakdown Based on Payyanur Pilot Implementation
        </p>
      </div>
      
      <CostBreakdown />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          * All figures are based on actual implementation costs in Payyanur ward (439 citizens)
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ** Economics improve significantly with scale due to shared infrastructure and development costs
        </p>
      </div>
    </div>
  )
}