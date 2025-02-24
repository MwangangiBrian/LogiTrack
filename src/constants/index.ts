import {
  ArrowsUpFromLine,
  BarChart2,
  Box,
  Globe,
  LayoutDashboard,
  MapPinned,
  Plane,
  ShipWheel,
  Truck,
  User2,
  Warehouse,
} from 'lucide-react';

export const sidebarItems = [
  {
    name: 'Operations',
    link: '/dashboard',
    navItems: [
      {itemName: 'Dashboard', link: '/', icon: LayoutDashboard },
      { itemName: 'Shipments', link: '/shipments', icon: Box },
      { itemName: 'Analytics', link: '/analytics', icon: BarChart2 },
      { itemName: 'Global Routes', link: '/global-routes', icon: Globe },
      { itemName: 'Track & Trace', link: '/track-and-trace', icon: MapPinned },
    ],
  },
  {
    name: 'Fleet',
    link: '/fleet',
    navItems: [
      {itemName: 'Overview', link: '/fleet', icon: ArrowsUpFromLine },
      { itemName: 'Ground Fleet', link: '/ground-fleet', icon: Truck },
      { itemName: 'Sea Freight', link: '/sea-fleet', icon: ShipWheel },
      { itemName: 'Air Cargo', link: '/air-fleet', icon: Plane },
    ],
  },
  {
    name: 'Management',
    link: '/management',
    navItems: [
      { itemName: 'Warehouses', link: '/warehouses', icon: Warehouse },
      { itemName: 'Staff', link: '/staff', icon: User2 },
    ],
  },
];

export const shipments= [
  {
    id: '1',
    trackingNumber: 'GS-12345',
    destination: 'New York, USA',
    status: 'in-transit',
    type: 'ground',
    eta: '24h 30m',
  },
  {
    id: '2',
    trackingNumber: 'GS-67890',
    destination: 'London, UK',
    status: 'pending',
    type: 'air',
    eta: '12h 15m',
  },
  {
    id: '3',
    trackingNumber: 'GS-11223',
    destination: 'Singapore',
    status: 'in-transit',
    type: 'sea',
    eta: '3d 12h',
  },
  {
    id: '4',
    trackingNumber: 'GS-44556',
    destination: 'Dubai, UAE',
    status: 'delayed',
    type: 'air',
    eta: '6h 45m',
  },
  {
    id: '5',
    trackingNumber: 'GS-77889',
    destination: 'Tokyo, Japan',
    status: 'delivered',
    type: 'ground',
    eta: 'Delivered',
  },
];
