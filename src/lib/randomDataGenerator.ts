import { statusOptions, cities } from './mockData';

const randomLocation = () => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  const city = cities[randomIndex];
  const { lat, lng } = city.coordinates;
  return {
    city: city.name,
    coordinates: { lat, lng },
  };
};
export function generateRandomShipment() {
  const origin = randomLocation().city;
  const { city, coordinates } = randomLocation();

  return {
    type: 'NEW_SHIPMENT',
    shipment: {
      id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: 'New Customer Inc.',
      origin: origin,
      destination: city,
      status:
        statusOptions[Math.floor(Math.random() * statusOptions.length) + 1],
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000
      ).toISOString(),
      lastUpdated: new Date().toISOString(),
      coordinates: coordinates,
    },
  };
}
