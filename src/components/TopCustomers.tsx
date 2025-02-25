'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ShipmentData } from '../../types';
import { Users } from 'lucide-react';
import { Progress } from './ui/progress';

interface TopCustomersProps {
  shipments: ShipmentData[];
}

export default function TopCustomers({ shipments }: TopCustomersProps) {
  const getTopCustomers = () => {
    const customerCounts: Record<string, number> = {};

    shipments.forEach((shipment) => {
      const customer = shipment.customer;
      customerCounts[customer] = (customerCounts[customer] || 0) + 1;
    });

    return Object.entries(customerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([customer, count]) => ({
        customer,
        count,
        percentage: Math.round((count / shipments.length) * 100),
      }));
  };

  const topCustomers = getTopCustomers();
  const maxCount = Math.max(...topCustomers.map((c) => c.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Top Customers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCustomers.map((customer, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{customer.customer}</span>
                <span className="text-sm text-muted-foreground">
                  {customer.count} shipments ({customer.percentage}%)
                </span>
              </div>
              <Progress
                value={(customer.count / maxCount) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
