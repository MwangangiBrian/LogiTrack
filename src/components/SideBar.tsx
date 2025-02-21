import { ForkliftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { sidebarItems } from '../constants';

const SideBar = () => {
  return (
    <div className="flex flex-col h-screen w-auto border-r-2 items-start justify-start">
      <div className="flex gap-3 items-center p-2">
        <ForkliftIcon />
        <span className="sm:block hidden">LogiTrack</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
      <nav>
        {sidebarItems.map((item) => (
          <Button key={item.name} variant="ghost" className="flex items-center justify-start" asChild>
            <div>
              <item.icon />
              <span className="sm:block hidden">{item.name}</span>
            </div>
          </Button>
        ))}
      </nav>
      </div>
    </div>
  );
};

export default SideBar;
