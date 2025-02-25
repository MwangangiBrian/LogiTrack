'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ShipmentData } from '../../types';

interface ShipmentMapProps {
  shipments: ShipmentData[];
}

export default function ShipmentMap({ shipments }: ShipmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // For demo purposes, we'll just show a placeholder
    const canvas = document.createElement('canvas');
    canvas.width = mapRef.current.clientWidth;
    canvas.height = 300;
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw a simple map placeholder
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw some "routes"
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;

    // Draw shipment points
    shipments.forEach((_, index) => {
      const x = 50 + Math.random() * (canvas.width - 100);
      const y = 50 + Math.random() * (canvas.height - 100);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'][index % 4];
      ctx.fill();
    });

    // Draw some route lines
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.bezierCurveTo(150, 50, 250, 250, 350, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.bezierCurveTo(200, 200, 300, 100, 400, 200);
    ctx.stroke();
  }, [shipments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-[300px] w-full bg-muted rounded-md" />
      </CardContent>
    </Card>
  );
}
