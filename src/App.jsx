import MainLayout from './components/layout/MainLayout'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  )
}

export default App