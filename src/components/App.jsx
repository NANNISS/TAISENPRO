import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdminCliente from './LoginAdminCliente';
import DashboardAdminCliente from './components/DashboardAdminCliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdminCliente />} />
        <Route path="/dashboard-admin" element={<DashboardAdminCliente />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;