import { cn } from '../lib/utils';
import {
  Truck,
  Ship,
  Plane,
  Package,
  type LucideIcon,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface DeliveryEvent {
  id: string;
  trackingNumber: string;
  location: string;
  type: 'pickup' | 'transit' | 'delivery' | 'delay';
  transportMode: 'ground' | 'sea' | 'air';
  icon: LucideIcon;
  timestamp: string;
  status: 'completed' | 'pending' | 'delayed';
}

interface delivery {
  events?: DeliveryEvent[];
  className?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    class: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  pending: {
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

const EVENTS: DeliveryEvent[] = [
  {
    id: '1',
    trackingNumber: 'GS-12345',
    location: 'New York Hub',
    type: 'pickup',
    transportMode: 'ground',
    icon: Truck,
    timestamp: 'Today, 2:45 PM',
    status: 'completed',
  },
  {
    id: '2',
    trackingNumber: 'GS-67890',
    location: 'London Airport',
    type: 'transit',
    transportMode: 'air',
    icon: Plane,
    timestamp: 'Today, 1:30 PM',
    status: 'pending',
  },
  {
    id: '3',
    trackingNumber: 'GS-11223',
    location: 'Singapore Port',
    type: 'delay',
    transportMode: 'sea',
    icon: Ship,
    timestamp: 'Today, 11:20 AM',
    status: 'delayed',
  },
  {
    id: '4',
    trackingNumber: 'GS-44556',
    location: 'Dubai Hub',
    type: 'delivery',
    transportMode: 'ground',
    icon: Package,
    timestamp: 'Today, 10:15 AM',
    status: 'completed',
  },
];

export const Delivery = ({ events = EVENTS, className }: delivery) => {
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
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Delivery Events
              <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">
                (24 updates)
              </span>
            </h2>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              Last 24 Hours
            </span>
          </div>

          <div className="space-y-1">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  'group flex items-center gap-3',
                  'p-2 rounded-lg',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                  'transition-all duration-200'
                )}
              >
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    statusConfig[event.status].bg
                  )}
                >
                  <event.icon
                    className={cn('w-4 h-4', statusConfig[event.status].class)}
                  />
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                      {event.trackingNumber} - {event.location}
                    </h3>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                      {event.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    <span
                      className={cn(
                        'text-xs font-medium',
                        statusConfig[event.status].class
                      )}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'py-2 px-3 rounded-lg',
              'text-xs font-medium',
              'bg-gradient-to-r from-blue-600 to-blue-500',
              'dark:from-blue-500 dark:to-blue-400',
              'text-white',
              'hover:from-blue-700 hover:to-blue-600',
              'dark:hover:from-blue-600 dark:hover:to-blue-500',
              'shadow-sm hover:shadow',
              'transform transition-all duration-200',
              'hover:-translate-y-0.5',
              'active:translate-y-0'
            )}
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
