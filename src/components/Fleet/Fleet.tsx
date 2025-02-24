'use client';

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Frame,
  Plane,
  Ship,
  Truck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import type { FleetStatus } from '../../../types';
import { Link } from 'react-router-dom';

const iconStyles = {
  ground: 'bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-400',
  sea: 'bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400',
  air: 'bg-purple-100 dark:bg-purple-800/30 text-purple-600 dark:text-purple-400',
};

const statusConfig = {
  active: {
    icon: CheckCircle2,
    class: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  maintenance: {
    icon: Clock,
    class: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  delayed: {
    icon: AlertTriangle,
    class: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
};

const ITEMS: FleetStatus[] = [
  {
    id: '1',
    title: 'Ground Fleet',
    subtitle: 'Regional delivery vehicles',
    icon: Truck,
    iconStyle: 'ground',
    date: 'Updated: 5 min ago',
    vehicles: '45/50',
    status: 'active',
    progress: 90,
  },
  {
    id: '2',
    title: 'Sea Fleet',
    subtitle: 'Container ships',
    icon: Ship,
    iconStyle: 'sea',
    date: 'Updated: 15 min ago',
    vehicles: '12/15',
    status: 'maintenance',
    progress: 80,
  },
  {
    id: '3',
    title: 'Air Fleet',
    subtitle: 'Cargo planes',
    icon: Plane,
    iconStyle: 'air',
    date: 'Updated: 30 min ago',
    vehicles: '8/10',
    status: 'delayed',
    progress: 75,
  },
];

export const Fleet = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          to="#"
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
        >
          <Frame className="w-6 h-6" />
          <span>Fleet Manager</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link to="#" className="font-bold">
            Dashboard
          </Link>
          <Link to="#" className="text-muted-foreground">
            Analytics
          </Link>
          <Link to="#" className="text-muted-foreground">
            Reports
          </Link>
          <Link to="#" className="text-muted-foreground">
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4"></div>
      </header>
      <main className="flex w-full bg-muted/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="max-w-6xl w-full mx-auto grid gap-4">
          <h1 className="font-semibold text-3xl">Fleet Status</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ITEMS.map((item) => {
              const StatusIcon = statusConfig[item.status].icon;
              return (
                <Card key={item.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${iconStyles[item.iconStyle]}`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="grid gap-1">
                      <CardTitle>{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold ${
                          statusConfig[item.status].bg
                        } ${statusConfig[item.status].class}`}
                      >
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </div>
                      <div className="text-sm text-muted-foreground ml-auto">
                        {item.date}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">
                        Active Vehicles: {item.vehicles}
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
