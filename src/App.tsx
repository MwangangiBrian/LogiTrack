import Dashboard from './components/Dashboard';
import { ThemeProvider } from './functions/themeProvider';

function App() {
  return (
    <>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </>
  );
}

export default App;
