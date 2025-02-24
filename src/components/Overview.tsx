import { DashboardCards } from './DashboardCards';
import { Delivery } from './Deliverly';
import { Fleet } from './Fleet';
import { Header } from './Header';

import { Box, Truck, Clock } from 'lucide-react';

const Overview = () => {
  return (
    <>
      <div className="w-full">
          <Header />
        <div className='flex'>
          
          <DashboardCards />
        </div>

      </div>

      <div className="">
        <div className="flex gap-4 mb-5">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
              <Box className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
              Active Shipments
              
            </h2>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" /> 
              Recent Events
            </h2>
            <div className="flex-1">
              <Delivery className="h-full" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
            Fleet Status
          </h2>
          <Fleet />
        </div>
      </div>
    </>
  );
};

export default Overview;
