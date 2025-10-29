import React, { useState, useEffect } from 'react';
import { Users, User, Zap, Trophy, Shield, Loader2, AlertCircle, Hash, ChevronDown, ChevronUp } from 'lucide-react';

// --- DATOS SIMULADOS ---
const MOCK_EQUIPOS = [
  { id: 1, nombreEquipo: 'Los Invencibles FC', nombreCapitan: 'Juan Pérez', victorias: 10, derrotas: 0, empatados: 2, logoUrl: 'https://placehold.co/100x100/1e293b/a5f3fc?text=IFC' },
  { id: 2, nombreEquipo: 'Tiburones Rojos', nombreCapitan: 'María López', victorias: 7, derrotas: 3, empatados: 2, logoUrl: 'https://placehold.co/100x100/1e293b/fca5a5?text=TR' },
  { id: 3, nombreEquipo: 'Atlético Relámpago', nombreCapitan: 'Carlos Silva', victorias: 5, derrotas: 5, empatados: 1, logoUrl: 'https://placehold.co/100x100/1e293b/c4b5fd?text=AR' },
  { id: 4, nombreEquipo: 'Los Halcones', nombreCapitan: 'Ana Gómez', victorias: 3, derrotas: 7, empatados: 0, logoUrl: 'https://placehold.co/100x100/1e293b/fcd34d?text=LH' },
];

const MOCK_JUGADORES = {
  1: [ // Los Invencibles FC
    { id: 'j1', nombre: 'Lucas Acosta', posicion: 'Delantero', numero: 10 },
    { id: 'j2', nombre: 'Martín Soria', posicion: 'Defensor', numero: 4 },
    { id: 'j3', nombre: 'Andrés Gil', posicion: 'Mediocampista', numero: 8 },
    { id: 'j4', nombre: 'Pedro Galarza', posicion: 'Arquero', numero: 1 },
  ],
  2: [ // Tiburones Rojos
    { id: 'j5', nombre: 'Camila Ríos', posicion: 'Mediocampista', numero: 17 },
    { id: 'j6', nombre: 'Valeria Cruz', posicion: 'Delantero', numero: 9 },
  ],
  3: [ // Atlético Relámpago
    { id: 'j7', nombre: 'Javier Torres', posicion: 'Defensor', numero: 2 },
  ],
  4: [], // Los Halcones (equipo sin jugadores registrados para ejemplo)
};

// --- LÓGICA DE SERVICIO INCLUIDA EN ESTE ARCHIVO PARA EVITAR ERRORES DE RESOLUCIÓN ---
const API_URL = 'http://localhost:3001';

const equipoService = {
  /**
   * Obtiene la lista de todos los equipos registrados.
   */
  obtenerEquipos: async () => {
    try {
      const response = await fetch(`${API_URL}/equipos`);
      if (!response.ok) {
        console.warn(`Advertencia: Falló la conexión a ${API_URL}/equipos. Usando datos simulados.`);
        return { success: true, equipos: MOCK_EQUIPOS };
      }
      return await response.json();
    } catch (error) {
      console.error('Error de red al obtener equipos. Usando datos simulados:', error);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, equipos: MOCK_EQUIPOS };
    }
  },

  /**
   * Obtiene la lista de jugadores para un equipo específico.
   */
  obtenerJugadoresPorEquipo: async (equipoId) => {
    try {
      // Simulación de una llamada API real (que devolvería la lista de jugadores)
      const response = await fetch(`${API_URL}/equipos/${equipoId}/jugadores`);

      if (!response.ok) {
        console.warn(`Advertencia: Falló la conexión a ${API_URL}/equipos/${equipoId}/jugadores. Usando datos simulados.`);
        return MOCK_JUGADORES[equipoId] || [];
      }
      
      const result = await response.json();
      return result.jugadores || [];

    } catch (error) {
      console.error(`Error de red al obtener jugadores para el equipo ${equipoId}. Usando datos simulados.`, error);
      // Retorna los mocks si falla la conexión
      return MOCK_JUGADORES[equipoId] || [];
    }
  }
};
// --- FIN LÓGICA DE SERVICIO ---


// --------------------------------------------------------------------------------
// SUB-COMPONENTE: LISTA DE JUGADORES
// --------------------------------------------------------------------------------
const ListaJugadores = ({ equipoId }) => {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJugadores = async () => {
            setLoading(true);
            const data = await equipoService.obtenerJugadoresPorEquipo(equipoId);
            setJugadores(data);
            setLoading(false);
        };
        fetchJugadores();
    }, [equipoId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin mr-2" />
                <span className="text-slate-400 text-sm">Cargando plantel...</span>
            </div>
        );
    }

    if (jugadores.length === 0) {
        return (
            <div className="text-center p-4 text-slate-500 text-sm bg-slate-700/30 rounded-b-xl">
                Aún no hay jugadores registrados en este equipo.
            </div>
        );
    }

    return (
        <div className="p-4 bg-slate-700/30 rounded-b-xl mt-4">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center border-b border-slate-600 pb-2">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Plantel
            </h4>
            <div className="space-y-2">
                {jugadores.map((jugador) => (
                    <div key={jugador.id} className="flex justify-between items-center text-sm p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <span className="text-slate-300 font-medium">{jugador.nombre}</span>
                        <div className="flex items-center space-x-3">
                            <span className="text-cyan-400 flex items-center">
                                <Zap className="w-4 h-4 mr-1" />{jugador.posicion}
                            </span>
                            <span className="text-pink-400 font-bold flex items-center">
                                <Hash className="w-4 h-4 mr-1" />{jugador.numero}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --------------------------------------------------------------------------------
// SUB-COMPONENTE: TARJETA DE EQUIPO
// --------------------------------------------------------------------------------
const EquipoCard = ({ equipo, isExpanded, onClick }) => {
    const safeLogoUrl = equipo.logoUrl && equipo.logoUrl.startsWith('http') 
        ? equipo.logoUrl 
        : `https://placehold.co/100x100/1e293b/ffffff?text=${equipo.nombreEquipo.slice(0, 3).toUpperCase()}`;

    const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

    return (
        <div className={`bg-slate-800/70 border ${isExpanded ? 'border-cyan-500/70' : 'border-slate-700'} rounded-xl transition-all shadow-xl`}>
            
            {/* CABECERA DE LA TARJETA (CLICKEABLE) */}
            <div 
                className="p-5 cursor-pointer flex flex-col hover:bg-slate-800/90 rounded-t-xl transition-colors"
                onClick={() => onClick(equipo.id)}
            >
                <div className="flex items-center space-x-4">
                    <img 
                        src={safeLogoUrl} 
                        alt={`Logo de ${equipo.nombreEquipo}`} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500 shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/1e293b/ffffff?text=Logo"; }}
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white truncate">{equipo.nombreEquipo}</h2>
                        <p className="text-sm text-slate-400 flex items-center">
                            <User className="w-4 h-4 mr-1 text-cyan-400" />
                            Capitán: {equipo.nombreCapitan}
                        </p>
                    </div>
                    <ChevronIcon className={`w-6 h-6 text-cyan-400 transition-transform ${isExpanded ? 'transform rotate-0' : 'transform rotate-180'}`} />
                </div>

                {/* ESTADÍSTICAS */}
                <div className="grid grid-cols-3 gap-4 text-center mt-4 pt-4 border-t border-slate-700">
                    <div className="p-2 bg-slate-700/50 rounded-lg">
                        <Zap className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-white">{equipo.victorias || 0}</p>
                        <p className="text-xs text-slate-400">Victorias</p>
                    </div>
                    <div className="p-2 bg-slate-700/50 rounded-lg">
                        <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-white">{equipo.empatados || 0}</p>
                        <p className="text-xs text-slate-400">Empates</p>
                    </div>
                    <div className="p-2 bg-slate-700/50 rounded-lg">
                        <Shield className="w-5 h-5 text-red-400 mx-auto mb-1" />
                        <p className="text-lg font-bold text-white">{equipo.derrotas || 0}</p>
                        <p className="text-xs text-slate-400">Derrotas</p>
                    </div>
                </div>
            </div>

            {/* CONTENIDO EXPANDIBLE */}
            {isExpanded && <ListaJugadores equipoId={equipo.id} />}
        </div>
    );
}

// --------------------------------------------------------------------------------
// COMPONENTE PRINCIPAL: LISTA DE EQUIPOS
// --------------------------------------------------------------------------------
const ListaEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Estado para el equipo expandido

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const resultado = await equipoService.obtenerEquipos();
        if (resultado.success) {
          setEquipos(resultado.equipos);
          setError(null);
        } else {
          setError(resultado.error || 'Error al cargar los equipos.');
          setEquipos(MOCK_EQUIPOS);
        }
      } catch (err) {
        setError('No se pudo conectar al servidor. Mostrando datos simulados.');
        setEquipos(MOCK_EQUIPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  const handleCardClick = (id) => {
      // Si el equipo ya está seleccionado, lo deselecciona. Si no, selecciona el nuevo ID.
      setSelectedTeamId(prevId => prevId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8 font-sans">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h1 className="text-4xl font-extrabold text-white mb-2">Equipos del Torneo</h1>
                <p className="text-slate-400">Lista completa de participantes en la Copa Apertura 2026. ¡Haz click en un equipo para ver su plantel!</p>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                    <p className="text-cyan-400 ml-3">Cargando equipos...</p>
                </div>
            )}

            {!loading && error && (
                <div className="mb-6 bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-300 text-sm font-medium">{error}</p>
                </div>
            )}

            {!loading && equipos.length === 0 && !error && (
                <div className="text-center p-12 bg-slate-800/50 rounded-xl">
                    <Users className="w-10 h-10 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Aún no hay equipos registrados.</p>
                </div>
            )}

            {!loading && equipos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipos.map(equipo => (
                        <EquipoCard 
                            key={equipo.id} 
                            equipo={equipo} 
                            isExpanded={selectedTeamId === equipo.id}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default ListaEquipos;
