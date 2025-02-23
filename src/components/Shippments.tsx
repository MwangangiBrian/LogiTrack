import { cn } from '../lib/utils';
import {
  Truck,
  Ship,
  Plane,
  Plus,
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';

interface ShipmentItem {
  id: string;
  trackingNumber: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  type: 'ground' | 'sea' | 'air';
  eta: string;
}

interface shipments {
  activeShipments?: string;
  shipments?: ShipmentItem[];
  className?: string;
}

const SHIPMENTS: ShipmentItem[] = [
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

const statusStyles = {
  'in-transit': 'text-blue-600 dark:text-blue-400',
  delivered: 'text-green-600 dark:text-green-400',
  pending: 'text-amber-600 dark:text-amber-400',
  delayed: 'text-red-600 dark:text-red-400',
};

export function Shipments({
  activeShipments = '156',
  shipments = SHIPMENTS,
  className,
}: shipments) {
  return (
    <>
      <div
        className={cn(
          'w-full max-w-xl mx-auto',
          'bg-white dark:bg-zinc-900/70',
          'border border-zinc-100 dark:border-zinc-800',
          'rounded-xl shadow-sm backdrop-blur-xl',
          className
        )}
      >
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Active Shipments
          </p>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {activeShipments}
          </h1>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Recent Shipments
            </h2>
          </div>

          <div className="space-y-1">
            {shipments.map((shipment) => (
              <div
                key={shipment.id}
                className={cn(
                  'group flex items-center justify-between',
                  'p-2 rounded-lg',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                  'transition-all duration-200'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    {shipment.type === 'ground' && (
                      <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                    {shipment.type === 'sea' && (
                      <Ship className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                    {shipment.type === 'air' && (
                      <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {shipment.trackingNumber}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {shipment.destination}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      statusStyles[shipment.status]
                    )}
                  >
                    {shipment.status.charAt(0).toUpperCase() +
                      shipment.status.slice(1)}
                  </span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    ETA: {shipment.eta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              className={cn(
                'flex items-center justify-center gap-2',
                'py-2 px-3 rounded-lg',
                'text-xs font-medium',
                'bg-blue-600 dark:bg-blue-500',
                'text-white',
                'hover:bg-blue-700 dark:hover:bg-blue-600',
                'shadow-sm hover:shadow',
                'transition-all duration-200'
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
            <button
              type="button"
              className={cn(
                'flex items-center justify-center gap-2',
                'py-2 px-3 rounded-lg',
                'text-xs font-medium',
                'bg-zinc-100 dark:bg-zinc-800',
                'text-zinc-900 dark:text-zinc-100',
                'hover:bg-zinc-200 dark:hover:bg-zinc-700',
                'shadow-sm hover:shadow',
                'transition-all duration-200'
              )}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
            <button
              type="button"
              className={cn(
                'flex items-center justify-center gap-2',
                'py-2 px-3 rounded-lg',
                'text-xs font-medium',
                'bg-zinc-100 dark:bg-zinc-800',
                'text-zinc-900 dark:text-zinc-100',
                'hover:bg-zinc-200 dark:hover:bg-zinc-700',
                'shadow-sm hover:shadow',
                'transition-all duration-200'
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <button
              type="button"
              className={cn(
                'flex items-center justify-center gap-2',
                'py-2 px-3 rounded-lg',
                'text-xs font-medium',
                'bg-zinc-100 dark:bg-zinc-800',
                'text-zinc-900 dark:text-zinc-100',
                'hover:bg-zinc-200 dark:hover:bg-zinc-700',
                'shadow-sm hover:shadow',
                'transition-all duration-200'
              )}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>More</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
