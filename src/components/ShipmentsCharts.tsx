'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ShipmentData } from 'types';

interface ShipmentChartsProps {
  shipments: ShipmentData[];
}

export default function ShipmentCharts({ shipments }: ShipmentChartsProps) {
  const [activeTab, setActiveTab] = useState('status');
  const statusChartRef = useRef<HTMLCanvasElement>(null);

  const getStatusData = useCallback(() => {
    const statusCounts: Record<string, number> = {};
    shipments.forEach((shipment) => {
      const status = shipment.status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return statusCounts;
  }, [shipments]);

  const drawStatusChart = useCallback(() => {
    const canvas = statusChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const statusData = getStatusData();
    const statuses = Object.keys(statusData);
    const counts = Object.values(statusData);
    const total = counts.reduce((sum, count) => sum + count, 0);

    const colors = {
      Delivered: '#10b981',
      'In Transit': '#3b82f6',
      Pending: '#f59e0b',
      Delayed: '#ef4444',
      default: '#6b7280',
    };

    let startAngle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    statuses.forEach((status, index) => {
      const sliceAngle = (counts[index] / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = colors[status as keyof typeof colors] || colors.default;
      ctx.fill();

      const labelAngle = startAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const percentage = Math.round((counts[index] / total) * 100);
      if (percentage > 5) {
        ctx.fillText(`${status}: ${percentage}%`, labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    const legendX = 20;
    let legendY = canvas.height - 20 - statuses.length * 25;

    statuses.forEach((status, index) => {
      ctx.fillStyle = colors[status as keyof typeof colors] || colors.default;
      ctx.fillRect(legendX, legendY, 15, 15);

      ctx.fillStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--foreground');
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${status}: ${counts[index]}`, legendX + 25, legendY + 7.5);

      legendY += 25;
    });
  }, [getStatusData]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvasRefs = [
        statusChartRef,
      ];
      canvasRefs.forEach((ref) => {
        if (ref.current) {
          const container = ref.current.parentElement;
          if (container) {
            ref.current.width = container.clientWidth;
            ref.current.height = container.clientHeight;
          }
        }
      });

      if (activeTab === 'status') {
        drawStatusChart();
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [shipments, activeTab, drawStatusChart]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Shipment Analytics</CardTitle>
        <Tabs
          defaultValue="status"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="status">Status Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="status" className="h-[300px] relative">
            <canvas ref={statusChartRef} className="w-full h-full" />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
