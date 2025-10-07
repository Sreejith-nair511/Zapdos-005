import { NextResponse } from "next/server"

function jitter(base: number, spread: number) {
  const t = Math.floor(Date.now() / 5000)
  return Math.max(0, Math.min(100, base + (t % 2 === 0 ? 1 : -1) * spread))
}

export async function GET() {
  const kerala = { welfare: 100, cropLoss: 15, waterEff: 30, satisfaction: 92 }
  const rj = { welfare: 84, cropLoss: 12, waterEff: 22, satisfaction: 88 }
  const national = { welfare: 78, cropLoss: 10, waterEff: 19, satisfaction: 85 }

  const data = {
    kerala: {
      welfare: jitter(kerala.welfare, 0),
      cropLoss: jitter(kerala.cropLoss, 2),
      waterEff: jitter(kerala.waterEff, 3),
      satisfaction: jitter(kerala.satisfaction, 2),
    },
    rajasthan: {
      welfare: jitter(rj.welfare, 2),
      cropLoss: jitter(rj.cropLoss, 2),
      waterEff: jitter(rj.waterEff, 3),
      satisfaction: jitter(rj.satisfaction, 2),
    },
    national: {
      welfare: jitter(national.welfare, 2),
      cropLoss: jitter(national.cropLoss, 2),
      waterEff: jitter(national.waterEff, 2),
      satisfaction: jitter(national.satisfaction, 1),
    },
  }
  return NextResponse.json(data, { headers: { "cache-control": "no-store" } })
}
