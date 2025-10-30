import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdminCliente from './components/LoginAdminCliente';
import DashboardAdminClientes from "./components/DashboardAdminClientes";
import RegistroEquipo from './components/RegistroEquipo';

// Jugador
import PerfilJugador from './components/PerfilJugador';
import DashboardJugador from './components/DashboardJugador';
import MiEquipo from './components/MiEquipo';

// Árbitro
import LoginArbitro from './components/LoginArbitro';
import PanelArbitro from './components/PanelArbitro';
import RegistroIncidentes from './components/RegistroIncidentes';

// Público
import LandingPrincipal from './components/LandingPrincipal';
import CuadroEliminatorias from './components/CuadroEliminatorias';

// Partidos
import MarcadorEnVivo from './components/MarcadorEnVivo';
import MarcadorPublico from './components/MarcadorPublico';
import TablaClasificacion from './components/TablaClasificacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<LandingPrincipal />} />
        <Route path="/eliminatorias" element={<CuadroEliminatorias />} />
        <Route path="/tabla-clasificacion" element={<TablaClasificacion />} />
        
        {/* Admin */}
        <Route path="/login-admin" element={<LoginAdminCliente />} />
        <Route path="/dashboard-admin" element={<DashboardAdminClientes />} />
        
        {/* Equipos */}
        <Route path="/registro-equipo" element={<RegistroEquipo />} />
        
        {/* Jugador */}
        <Route path="/perfil-jugador" element={<PerfilJugador />} />
        <Route path="/dashboard-jugador" element={<DashboardJugador />} />
        <Route path="/mi-equipo" element={<MiEquipo />} />
        
        {/* Árbitro */}
        <Route path="/login-arbitro" element={<LoginArbitro />} />
        <Route path="/panel-arbitro" element={<PanelArbitro />} />
        <Route path="/registro-incidentes/:partidoId" element={<RegistroIncidentes />} />
        
        {/* Partidos */}
        <Route path="/marcador/:id" element={<MarcadorEnVivo />} />
        <Route path="/marcador-publico/:id" element={<MarcadorPublico />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;