import {
  BarChart2,
  Box,
  Globe,
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
      { itemName: 'Shipments', link: '/dashboard', icon: Box },
      { itemName: 'Analytics', link: '/analytics', icon: BarChart2 },
      { itemName: 'Global Routes', link: '/global-routes', icon: Globe },
      { itemName: 'Track & Trace', link: '/track-and-trace', icon: MapPinned },
    ],
  },
  {
    name: 'Fleet',
    link: '/fleet',
    navItems: [
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
