import type { LucideIcon } from 'lucide-react';

export type FleetStatus = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconStyle: 'ground' | 'sea' | 'air';
  date: string;
  vehicles: string;
  status: 'active' | 'maintenance' | 'delayed';
  progress: number;
};

interface ShipmentData {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
  lastUpdated: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
interface Activity {
  type: 'update' | 'new';
  shipmentId: string;
  status?: string;
  customer?: string;
  timestamp: string;
}
export interface ActivityData {
  id: string;
  type: string;
  shipmentId: string;
  status?: string;
  customer?: string;
  timestamp: string;
}
