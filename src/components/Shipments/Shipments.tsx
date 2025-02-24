"use client"

import { shipments } from "../../constants"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Package2, Plane, Search, Ship, Timer, Truck } from "lucide-react"


export function ShipmentsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "delivered":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "delayed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getShipmentTypeIcon = (type: string) => {
    switch (type) {
      case "ground":
        return <Truck className="h-4 w-4" />
      case "air":
        return <Plane className="h-4 w-4" />
      case "sea":
        return <Ship className="h-4 w-4" />
      default:
        return <Package2 className="h-4 w-4" />
    }
  }

  const stats = [
    {
      title: "Total Shipments",
      value: shipments.length,
      icon: Package2,
    },
    {
      title: "In Transit",
      value: shipments.filter((s) => s.status === "in-transit").length,
      icon: Truck,
    },
    {
      title: "Delivered",
      value: shipments.filter((s) => s.status === "delivered").length,
      icon: Package2,
    },
    {
      title: "Delayed",
      value: shipments.filter((s) => s.status === "delayed").length,
      icon: Timer,
    },
  ]

  return (
    <>
    <div className="flex min-h-screen flex-col w-full">
        
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Shipments</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search shipments..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button>New Shipment</Button>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row gap-2 items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getShipmentTypeIcon(shipment.type)}
                        <span className="capitalize">{shipment.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(shipment.status)}`}>{shipment.status}</Badge>
                    </TableCell>
                    <TableCell>{shipment.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
    </>
  )
}

