import { useTheme } from '../functions/themeProvider';
import { Button } from './ui/button';
import { MoonStar, Sun } from 'lucide-react';
export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className="sticky top-0 flex gap-2 items-center justify-around">
        <div>LogiTrack</div>
        <div>
          <Button
            onClick={toggleTheme}
            className="bg-transparent text-purple-800 hover:bg-transparent border-0"
          >
            {theme === 'light' ? <Sun /> : <MoonStar />}
          </Button>
        </div>
      </div>
    </>
  );
};
