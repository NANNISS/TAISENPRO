import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin
import LoginAdminCliente from './components/LoginAdminCliente';
import DashboardAdminClientes from './components/DashboardAdminClientes';
import CrearTorneoWizard from './components/CrearTorneoWizard';

// Equipos
import RegistroEquipo from './components/RegistroEquipo';
import ListaEquipos from './components/ListaEquipos';

// Jugador
import RegistroJugadores from './components/RegistroJugadores'; // ⬅️ Sin 'es'
import PerfilJugador from './components/PerfilJugador';
import DashboardJugador from './components/DashboardJugador';
import MiEquipo from './components/MiEquipo';

// Árbitro
import LoginArbitro from './components/LoginArbitro';
import PanelArbitro from './components/PanelArbitro';
import RegistroIncidentes from './components/RegistroIncidentes';

// Público
import LandingPrincipal from './components/LandingPrincipal';
import LandingTorneo from './components/LandingTorneo';
import CuadroEliminatorias from './components/CuadroEliminatorias';
import TablaClasificacion from './components/TablaClasificacion';

// Partidos
import MarcadorEnVivo from './components/MarcadorEnVivo';
import MarcadorPublico from './components/MarcadorPublico';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<LandingPrincipal />} />
        <Route path="/torneo/:id" element={<LandingTorneo />} />
        <Route path="/eliminatorias" element={<CuadroEliminatorias />} />
        <Route path="/tabla-clasificacion" element={<TablaClasificacion />} />
        
        {/* Admin */}
        <Route path="/login-admin" element={<LoginAdminCliente />} />
        <Route path="/dashboard-admin" element={<DashboardAdminClientes />} />
        <Route path="/crear-torneo" element={<CrearTorneoWizard />} />
        
        {/* Equipos */}
        <Route path="/registro-equipo" element={<RegistroEquipo />} />
        <Route path="/lista-equipos" element={<ListaEquipos />} />
        
        {/* Jugador */}
        <Route path="/registro-jugadores" element={<RegistroJugadores />} />
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