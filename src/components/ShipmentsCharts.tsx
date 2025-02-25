'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { ShipmentData } from '../../types';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

interface ShipmentChartsProps {
  shipments: ShipmentData[];
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export default function ShipmentCharts({ shipments }: ShipmentChartsProps) {
  const [activeTab, setActiveTab] = useState('status');

  const statusData = () => {
    const statusCounts: Record<string, number> = {};
    shipments.forEach((shipment) => {
      const status = shipment.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const shipmentsOverTimeData = () => {
    const dateMap: Record<string, number> = {};

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dateMap[dateStr] = 0;
    }

    shipments.forEach((shipment) => {
      const date = new Date(shipment.createdAt);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (dateMap[dateStr] !== undefined) {
        dateMap[dateStr]++;
      }
    });

    return Object.entries(dateMap).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const deliveryPerformanceData = () => {
    const originCounts: Record<string, { onTime: number; delayed: number }> =
      {};

    shipments.forEach((shipment) => {
      const origin = shipment.origin.split(',')[0];
      if (!originCounts[origin]) {
        originCounts[origin] = { onTime: 0, delayed: 0 };
      }

      if (shipment.status === 'Delayed') {
        originCounts[origin].delayed++;
      } else {
        originCounts[origin].onTime++;
      }
    });

    return Object.entries(originCounts)
      .map(([origin, counts]) => ({
        origin,
        onTime: counts.onTime,
        delayed: counts.delayed,
      }))
      .slice(0, 5);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Shipment Analytics</CardTitle>
          <Tabs
            defaultValue="status"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="status">Status Distribution</TabsTrigger>
              <TabsTrigger value="timeline">Shipments Timeline</TabsTrigger>
              <TabsTrigger value="performance">Origin Performance</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <Tabs>
          <CardContent>
            <TabsContent value="status" className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusData().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-bold">
                                  {payload[0].name}
                                </div>
                                <div>Count: {payload[0].value}</div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="timeline" className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={shipmentsOverTimeData()}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-bold">{label}</div>
                                <div>Shipments: {payload[0].value}</div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Shipments"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="performance" className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deliveryPerformanceData()} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="origin" type="category" width={100} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-bold">{label}</div>
                                <div>On Time: {payload[0].value}</div>
                                <div>Delayed: {payload[1].value}</div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="onTime"
                      name="On Time"
                      fill="#00C49F"
                      stackId="a"
                    />
                    <Bar
                      dataKey="delayed"
                      name="Delayed"
                      fill="#FF8042"
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </>
  );
}
