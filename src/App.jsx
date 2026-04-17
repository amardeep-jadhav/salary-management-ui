import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import EmployeesPage from './pages/EmployeesPage'
import InsightsPage from './pages/InsightsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main className="container-fluid py-4 px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/employees" replace />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App