import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ShipmentData } from 'types';

Chart.register(ArcElement, Tooltip, Legend);

interface ShipmentPieChartProps {
  shipments: ShipmentData[];
}

export default function ShipmentPieChart({ shipments }: ShipmentPieChartProps) {
  const statusCounts = shipments.reduce<Record<string, number>>((acc, shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(statusCounts);
  const counts = Object.values(statusCounts);
  const colors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b']

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: labels.map(status => {
          switch (status) {
            case 'Delivered': return colors[1];
            case 'In Transit': return colors[0];
            case 'Pending': return colors[3];
            case 'Delayed': return colors[2];
            default: return '#6b7280';
          }
        }),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    hoverOffset: 8,
    plugins: {
      legend: {
        position: 'right' as const,
        boxWidth: 5,
        boxHeight: 5,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: { label: string; parsed: number; chart: { data: { datasets: { data: number[] }[] } } }) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.chart.data.datasets[0].data.reduce(
              (sum: number, val: number) => sum + val,
              0
            );
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
