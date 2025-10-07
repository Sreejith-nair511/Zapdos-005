import { NextResponse } from "next/server"

const names = ["Arun Kumar (ITI)", "Savita Rao (ITI)", "Naseer Ali (ITI)", "Pooja Singh (ITI)"]
const statuses = ["Available", "Busy"] as const

function pick<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET() {
  // Create unique IDs for each technician
  const selectedNames = [...names]
  // Shuffle the array to randomize selection
  for (let i = selectedNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedNames[i], selectedNames[j]] = [selectedNames[j], selectedNames[i]];
  }
  
  const techs = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: selectedNames[i],
    status: pick(statuses),
  }))
  const node = { temp: rand(40, 55), memory: rand(50, 80), lastReboot: `${rand(1, 5)}d ago` }
  return NextResponse.json({ techs, node })
}