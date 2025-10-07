import { NextResponse } from "next/server"

const pool = [
  "Now I can check crop alerts without reading any text.",
  "Even when network was down, IVR worked on solar power.",
  "The dashboard helps our ward plan water usage better.",
]

export async function GET() {
  const items = pool.map((quote) => ({
    quote,
    avatar: "/citizen-avatar.jpg",
  }))
  return NextResponse.json({ items })
}
