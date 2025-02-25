'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, Package, Truck, AlertTriangle, CheckCircle } from 'lucide-react';

interface Activity {
  type: string;
  shipmentId: string;
  status?: string;
  customer?: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  const activityEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activityEndRef.current) {
      activityEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const getActivityIcon = (activity: Activity) => {
    if (activity.type === 'new') {
      return <Package className="h-5 w-5 text-blue-500" />;
    }

    if (activity.status) {
      switch (activity.status.toLowerCase()) {
        case 'delivered':
          return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'in transit':
          return <Truck className="h-5 w-5 text-blue-500" />;
        case 'delayed':
          return <AlertTriangle className="h-5 w-5 text-red-500" />;
        default:
          return <Bell className="h-5 w-5 text-yellow-500" />;
      }
    }

    return <Bell className="h-5 w-5 text-yellow-500" />;
  };

  const getActivityMessage = (activity: Activity) => {
    if (activity.type === 'new') {
      return (
        <>
          New shipment{' '}
          <span className="font-semibold">{activity.shipmentId}</span> created
          for <span className="font-semibold">{activity.customer}</span>
        </>
      );
    } else if (activity.type === 'update') {
      return (
        <>
          Shipment <span className="font-semibold">{activity.shipmentId}</span>{' '}
          status updated to{' '}
          <Badge className={getStatusColor(activity.status || '')}>
            {activity.status}
          </Badge>
        </>
      );
    }

    return 'Unknown activity';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
      case 'in transit':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'delayed':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {activities.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No recent activities
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 text-sm">
                  <div className="mt-1">{getActivityIcon(activity)}</div>
                  <div className="flex-1">
                    <p>{getActivityMessage(activity)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={activityEndRef} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
