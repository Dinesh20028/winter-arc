import MainLayout from './components/layout/MainLayout';
import { AppProvider, useApp } from './context/AppContext';

function AppShell() {
  const { settings } = useApp();

  const themeClass =
    settings.theme === 'Midnight'
      ? 'bg-[#01030a]'
      : settings.theme === 'Dim'
        ? 'bg-[#0b1120]'
        : 'bg-slate-950';

  return (
    <div
      className={`min-h-screen ${themeClass} transition-colors duration-500`}
    >
      <MainLayout />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;