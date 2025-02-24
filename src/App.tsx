import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Overview from './components/Overview';
import { ThemeProvider } from './functions/themeProvider';
import { ShipmentsPage } from './components/Shipments/Shipments';
import { SideBar } from './components/SideBar';
import { Fleet } from './components/Fleet/Fleet';

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
        <div className='flex w-full'>
          <SideBar />
        <div className='flex-1'>  
        <Routes>
        <Route path="/" element={<Overview />} />
        <Route path= '/shipments' element={<ShipmentsPage />} />
        <Route path='/fleet' element={<Fleet />} />
        </Routes>
        </div>
        </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
