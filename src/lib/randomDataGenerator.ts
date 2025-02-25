import { ShipmentData } from "../../types";
import { statusOptions, destinations, cities } from "./mockData";

export function generateRandomShipment(): ShipmentData {
    return {
        id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: 'New Customer Inc.',
        origin: cities[Math.floor(Math.random() * cities.length)],
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        status: statusOptions[Math.floor(Math.random() * statusOptions.length) + 1],
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date().toISOString(),
        coordinates: { lat: 32.7157, lng: -117.1611 },
    };
}