"use client"
export function EthicsPanel() {
  return (
    <div className="rounded-xl bg-card p-3 sm:p-4 ring-1 ring-border bg-gradient-to-br from-background to-secondary/10 backdrop-blur-sm">
      <div className="text-sm sm:text-base font-medium mb-3 bg-gradient-to-r from-green-600 to-saffron-500 bg-clip-text text-transparent">{"AI Ethics & Governance"}</div>
      <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
        <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{"Explainability Score: 94%"}</div>
        <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{"Bias Check: Neutral across gender and income groups."}</div>
        <div className="rounded bg-secondary/50 p-2 hover:bg-secondary/70 transition-colors">{"Accountability Mode: Enabled (Human-in-loop)."}</div>
      </div>
    </div>
  )
}