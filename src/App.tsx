import Overview from './components/Overview';
import { ThemeProvider } from './functions/themeProvider';

function App() {
  return (
    <>
      <ThemeProvider>
        <Overview />
      </ThemeProvider>
    </>
  );
}

export default App;
