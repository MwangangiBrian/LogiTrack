import type { LucideIcon } from "lucide-react"

export type FleetStatus = {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  iconStyle: "ground" | "sea" | "air"
  date: string
  vehicles: string
  status: "active" | "maintenance" | "delayed"
  progress: number
}

