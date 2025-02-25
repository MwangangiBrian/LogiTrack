'use client';

import { Package, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ShipmentData } from '../../types';

interface ShipmentStatsProps {
  shipments: ShipmentData[];
}

export default function ShipmentStats({ shipments }: ShipmentStatsProps) {
  const totalShipments = shipments.length;
  const inTransit = shipments.filter((s) => s.status === 'In Transit').length;
  const delivered = shipments.filter((s) => s.status === 'Delivered').length;
  const delayed = shipments.filter((s) => s.status === 'Delayed').length;

  const stats = [
    {
      title: 'Total Shipments',
      value: totalShipments,
      icon: Package,
      description: 'Active shipments in system',
      color: 'text-blue-500',
    },
    {
      title: 'In Transit',
      value: inTransit,
      icon: Truck,
      description: 'Currently being delivered',
      color: 'text-yellow-500',
    },
    {
      title: 'Delivered',
      value: delivered,
      icon: CheckCircle,
      description: 'Successfully completed',
      color: 'text-green-500',
    },
    {
      title: 'Delayed',
      value: delayed,
      icon: AlertTriangle,
      description: 'Experiencing issues',
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
