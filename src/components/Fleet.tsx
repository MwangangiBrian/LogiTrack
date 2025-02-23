import { cn } from '../lib/utils';
import {
  type LucideIcon,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  Ship,
  Plane,
} from 'lucide-react';
import React from 'react';

interface FleetStatus {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconStyle: string;
  date: string;
  time?: string;
  vehicles?: string;
  status: 'active' | 'maintenance' | 'delayed';
  progress?: number;
}

interface Fleet {
  items?: FleetStatus[];
  className?: string;
}

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

export const Fleet = ({ items = ITEMS, className }: Fleet) => {
  return (
    <>
      <div className={cn('w-full overflow-x-auto scrollbar-none', className)}>
        <div className="flex gap-3 min-w-full p-1">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex flex-col',
                'w-[280px] shrink-0',
                'bg-white dark:bg-zinc-900/70',
                'rounded-xl',
                'border border-zinc-100 dark:border-zinc-800',
                'hover:border-zinc-200 dark:hover:border-zinc-700',
                'transition-all duration-200',
                'shadow-sm backdrop-blur-xl'
              )}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      iconStyles[item.iconStyle as keyof typeof iconStyles]
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
                      statusConfig[item.status].bg,
                      statusConfig[item.status].class
                    )}
                  >
                    {React.createElement(statusConfig[item.status].icon, {
                      className: 'w-3.5 h-3.5',
                    })}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {typeof item.progress === 'number' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Operational Status
                      </span>
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', {
                          'bg-green-500': item.status === 'active',
                          'bg-amber-500': item.status === 'maintenance',
                          'bg-red-500': item.status === 'delayed',
                        })}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {item.vehicles && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {item.vehicles}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      vehicles available
                    </span>
                  </div>
                )}

                <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
                <button
                  className={cn(
                    'w-full flex items-center justify-center gap-2',
                    'py-2.5 px-3',
                    'text-xs font-medium',
                    'text-zinc-600 dark:text-zinc-400',
                    'hover:text-zinc-900 dark:hover:text-zinc-100',
                    'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                    'transition-colors duration-200'
                  )}
                >
                  Fleet Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
