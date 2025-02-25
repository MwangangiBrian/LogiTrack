'use client';

import { useState, Suspense, lazy } from 'react';
import { useTheme } from '../functions/themeProvider';
import { Loader2 } from 'lucide-react';
import { Header } from './Header';
import type { ShipmentData } from '../../types';
import { mockShipments } from '../lib/mockData';
import { useWebSocket } from '../functions/useWebsocket';

const ShipmentTable = lazy(() => import('./ShipmentTable'));
const ShipmentStats = lazy(() => import('./ShipmentsStats'));
const ShipmentCharts = lazy(() => import('./ShipmentsCharts'));
const RecentActivities = lazy(() => import('./RecentActivities'));
const TopCustomers = lazy(() => import('./TopCustomers'));
const DeliveryPerformance = lazy(() => import('./DeliverlyPerformance'));

export default function Dashboard() {
  const [shipments, setShipments] = useState<ShipmentData[]>(mockShipments);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const { theme } = useTheme();

  const { lastMessage } = useWebSocket({
    url: 'wss://mock-socket-url.vercel.app',
    onMessage: (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.type === 'SHIPMENT_UPDATE') {
          updateShipment(data.shipment);
          addActivity({
            type: 'update',
            shipmentId: data.shipment.id,
            status: data.shipment.status,
            timestamp: new Date().toISOString(),
          });
        } else if (data.type === 'NEW_SHIPMENT') {
          addShipment(data.shipment);
          addActivity({
            type: 'new',
            shipmentId: data.shipment.id,
            customer: data.shipment.customer,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    },
  });

  const updateShipment = (updatedShipment: ShipmentData) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) =>
        shipment.id === updatedShipment.id
          ? { ...shipment, ...updatedShipment }
          : shipment
      )
    );
  };

  const addShipment = (newShipment: ShipmentData) => {
    setShipments((prevShipments) => [...prevShipments, newShipment]);
  };

  const addActivity = (activity: any) => {
    setActivities((prev) => [activity, ...prev].slice(0, 10));
  };

  return (
    <>
      <div className="flex flex-col items-center h-full w-[90%] bg-background">
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

          <main className="flex-1 overflow-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-6">Shipment Dashboard</h1>

            <Suspense
              fallback={
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            >
              <ShipmentStats shipments={shipments} />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <Suspense
                  fallback={
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  }
                >
                  <ShipmentCharts shipments={shipments} />
                </Suspense>
              </div>
              <div>
                <Suspense
                  fallback={
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  }
                >
                  <RecentActivities activities={activities} />
                </Suspense>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <Suspense
                  fallback={
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  }
                >
                  <ShipmentTable shipments={shipments} />
                </Suspense>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-6">
                  <Suspense
                    fallback={
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    }
                  >
                    <TopCustomers shipments={shipments} />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    }
                  >
                    <DeliveryPerformance shipments={shipments} />
                  </Suspense>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
