import {
  ChartBarBigIcon,
  LayoutDashboard,
  MapPinned,
  Truck,
} from 'lucide-react';

export const sidebarItems = [
  {
    name: 'Overview',
    link: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Shipments',
    link: '/shipments',
    icon: Truck,
  },
  {
    name: 'Map View',
    link: '/map',
    icon: MapPinned,
  },
  {
    name: 'Reports',
    link: '/reports',
    icon: ChartBarBigIcon,
  },
];
