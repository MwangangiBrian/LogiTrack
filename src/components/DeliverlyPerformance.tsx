'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ShipmentData } from '../../types';
import { Timer, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface DeliveryPerformanceProps {
  shipments: ShipmentData[];
}

export default function DeliveryPerformance({
  shipments,
}: DeliveryPerformanceProps) {
  const calculateMetrics = () => {
    const total = shipments.length;
    const delivered = shipments.filter((s) => s.status === 'Delivered').length;
    const delayed = shipments.filter((s) => s.status === 'Delayed').length;
    const inTransit = shipments.filter((s) => s.status === 'In Transit').length;

    const onTimeDeliveryRate =
      total > 0 ? Math.round((delivered / total) * 100) : 0;
    const delayRate = total > 0 ? Math.round((delayed / total) * 100) : 0;

    return {
      onTimeDeliveryRate,
      delayRate,
      averageDeliveryTime: '2.3 days',
      inTransitCount: inTransit,
    };
  };

  const metrics = calculateMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Timer className="mr-2 h-5 w-5" />
          Delivery Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">
              {metrics.onTimeDeliveryRate}%
            </div>
            <div className="text-xs text-muted-foreground text-center">
              On-Time Delivery
            </div>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold">{metrics.delayRate}%</div>
            <div className="text-xs text-muted-foreground text-center">
              Delay Rate
            </div>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Timer className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">
              {metrics.averageDeliveryTime}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Avg. Delivery Time
            </div>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{metrics.inTransitCount}</div>
            <div className="text-xs text-muted-foreground text-center">
              In Transit
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
