import { ChevronLeft, Menu, Truck } from 'lucide-react';
import { sidebarItems } from '../constants';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden md:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div
        className={cn(
          ' inset-y-0 z-20 flex flex-col bg-background transition-all duration-150 ease-in-out ',
          isCollapsed ? 'w-[72px]' : 'w-72',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="border-b border-border">
          <div
            className={cn(
              'flex h-16 items-center gap-2 px-4',
              isCollapsed && 'justify-center px-2'
            )}
          >
            {!isCollapsed && (
              <a href="/" className="flex gap-2 items-center font-semibold">
                <Truck />
                <span className="text-lg">LogiTrack</span>
              </a>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn('ml-auto h-8 w-8', isCollapsed && 'ml-0')}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft
                className={cn(
                  'h-4 w-4 transition-transform',
                  isCollapsed && 'rotate-180'
                )}
              />
              <span className="sr-only">
                {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
              </span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {sidebarItems.map((item) => (
                <div key={item.name}>
                  {!isCollapsed && (
                    <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {item.name}
                    </h3>
                  )}
                  <div>
                    {item.navItems?.map((navItem) => (
                      <div
                        key={navItem.itemName}
                        className="flex items-center justify-between px-1 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                      >
                          <Link to={navItem.link}>
                        <div className='flex items-center justify-center'>
                          <button className=' bg-transparent  hover: cursor-pointer border-0' >
                            <div className=''>
                              <navItem.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                            </div>
                          </button>
                          {!isCollapsed && (
                            <>
                              <div>{navItem.itemName}</div>
                            </>
                          )}
                        </div>
                          </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
