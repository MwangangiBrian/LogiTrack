interface ShipmentData {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
  lastUpdated: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const statusOptions = ['In Transit', 'Pending', 'Delivered', 'Delayed'];

export const mockShipments: ShipmentData[] = [
  {
    id: 'SHP-1234',
    customer: 'Acme Corporation',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    status: 'In Transit',
    createdAt: '2023-06-15T08:30:00Z',
    estimatedDelivery: '2023-06-18T16:00:00Z',
    lastUpdated: '2023-06-16T14:20:00Z',
    coordinates: { lat: 39.8283, lng: -98.5795 },
  },
  {
    id: 'SHP-5678',
    customer: 'TechGiant Inc.',
    origin: 'Seattle, WA',
    destination: 'Austin, TX',
    status: 'Delivered',
    createdAt: '2023-06-10T09:15:00Z',
    estimatedDelivery: '2023-06-14T12:00:00Z',
    lastUpdated: '2023-06-14T11:45:00Z',
    coordinates: { lat: 30.2672, lng: -97.7431 },
  },
  {
    id: 'SHP-9012',
    customer: 'Global Traders Ltd.',
    origin: 'Miami, FL',
    destination: 'Chicago, IL',
    status: 'Pending',
    createdAt: '2023-06-16T10:00:00Z',
    estimatedDelivery: '2023-06-19T15:30:00Z',
    lastUpdated: '2023-06-16T10:00:00Z',
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: 'SHP-3456',
    customer: 'Retail Solutions Co.',
    origin: 'Boston, MA',
    destination: 'Denver, CO',
    status: 'Delayed',
    createdAt: '2023-06-12T14:20:00Z',
    estimatedDelivery: '2023-06-16T09:00:00Z',
    lastUpdated: '2023-06-15T18:30:00Z',
    coordinates: { lat: 39.7392, lng: -104.9903 },
  },
  {
    id: 'SHP-7890',
    customer: 'Express Logistics',
    origin: 'San Francisco, CA',
    destination: 'Atlanta, GA',
    status: 'In Transit',
    createdAt: '2023-06-14T11:45:00Z',
    estimatedDelivery: '2023-06-17T13:15:00Z',
    lastUpdated: '2023-06-16T09:30:00Z',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 'SHP-2345',
    customer: 'Mega Distributors',
    origin: 'Dallas, TX',
    destination: 'Philadelphia, PA',
    status: 'Delivered',
    createdAt: '2023-06-11T16:30:00Z',
    estimatedDelivery: '2023-06-15T10:45:00Z',
    lastUpdated: '2023-06-15T10:30:00Z',
    coordinates: { lat: 32.7767, lng: -96.797 },
  },
  {
    id: 'SHP-6789',
    customer: 'Quick Shipping LLC',
    origin: 'Phoenix, AZ',
    destination: 'Nashville, TN',
    status: 'In Transit',
    createdAt: '2023-06-13T13:15:00Z',
    estimatedDelivery: '2023-06-17T08:45:00Z',
    lastUpdated: '2023-06-16T07:20:00Z',
    coordinates: { lat: 36.1627, lng: -86.7816 },
  },
  {
    id: 'SHP-0123',
    customer: 'Prime Delivery Services',
    origin: 'Portland, OR',
    destination: 'Houston, TX',
    status: 'Pending',
    createdAt: '2023-06-16T09:00:00Z',
    estimatedDelivery: '2023-06-19T14:30:00Z',
    lastUpdated: '2023-06-16T09:00:00Z',
    coordinates: { lat: 45.5051, lng: -122.675 },
  },
];
