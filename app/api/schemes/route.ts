import { NextResponse } from "next/server"

const statuses = ["Active", "Synced", "Syncing", "Verification Needed"] as const

function pick<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function GET() {
  const schemes = [
    { name: "PM-Kisan", purpose: "Farmer Income Support" },
    { name: "eGramSwaraj", purpose: "Panchayat Governance Data" },
    { name: "UDISE+", purpose: "Education Analytics" },
    { name: "PM Fasal Bima", purpose: "Crop Insurance" },
    { name: "MGNREGS", purpose: "Rural Employment" },
  ].map((s) => ({ ...s, status: pick(statuses) }))
  return NextResponse.json({ schemes })
}
