"use client"
export function EthicsPanel() {
  return (
    <div className="rounded-xl bg-card p-4 ring-1 ring-border">
      <div className="text-sm font-medium">{"AI Ethics & Governance"}</div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
        <div className="rounded bg-secondary p-2">{"Explainability Score: 94%"}</div>
        <div className="rounded bg-secondary p-2">{"Bias Check: Neutral across gender and income groups."}</div>
        <div className="rounded bg-secondary p-2">{"Accountability Mode: Enabled (Human-in-loop)."}</div>
      </div>
    </div>
  )
}
