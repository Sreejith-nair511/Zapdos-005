"use client"

export default function DemoPage() {
  const trigger = async (name: string) => {
    // Placeholder: in a richer demo we could post to scenario endpoints
    await fetch("/api/mock/reset", { method: "POST" })
    alert(`Scenario triggered: ${name}`)
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 md:py-10 grid gap-3 light-theme-bg">
      <h1 className="text-2xl font-semibold">Demo Scenarios</h1>
      <div className="grid gap-2">
        {["Pilot Success", "Drought", "Market Shock", "School Alert"].map((s) => (
          <button
            key={s}
            onClick={() => trigger(s)}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Use ?dev=1 to show the simulation ribbon globally.</p>
    </main>
  )
}