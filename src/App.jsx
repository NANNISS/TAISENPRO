import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdminCliente from './components/LoginAdminCliente';
import DashboardAdminClientes from "./components/DashboardAdminClientes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAdminCliente />} />
        <Route path="/dashboard-admin" element={<DashboardAdminClientes />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;