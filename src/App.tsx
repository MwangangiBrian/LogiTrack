import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './functions/themeProvider';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
