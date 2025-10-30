import React, { useState } from 'react';
import { Trophy, Users, Calendar, MapPin, Clock } from 'lucide-react';

const CuadroEliminatorias = () => {
  const [eliminatorias, setEliminatorias] = useState({
    octavos: [
      { id: 1, equipo1: 'Los Tigres FC', goles1: 3, equipo2: 'Cóndores FC', goles2: 0, ganador: 'Los Tigres FC', fecha: '2025-11-20', hora: '18:00', cancha: 'Principal' },
      { id: 2, equipo1: 'Águilas United', goles1: 2, equipo2: 'Pumas SC', goles2: 1, ganador: 'Águilas United', fecha: '2025-11-20', hora: '20:00', cancha: 'Cancha 2' },
      { id: 3, equipo1: 'Leones FC', goles1: 4, equipo2: 'Halcones CF', goles2: 1, ganador: 'Leones FC', fecha: '2025-11-21', hora: '18:00', cancha: 'Principal' },
      { id: 4, equipo1: 'Dragones FC', goles1: 2, equipo2: 'Espartanos SC', goles2: 2, ganador: 'Dragones FC', fecha: '2025-11-21', hora: '20:00', cancha: 'Cancha 2', penales: '5-4' },
      { id: 5, equipo1: 'Titanes United', goles1: null, equipo2: 'Vikingos FC', goles2: null, ganador: null, fecha: '2025-11-22', hora: '18:00', cancha: 'Principal' },
      { id: 6, equipo1: 'Gladiadores SC', goles1: null, equipo2: 'Guerreros CF', goles2: null, ganador: null, fecha: '2025-11-22', hora: '20:00', cancha: 'Cancha 2' },
      { id: 7, equipo1: 'Relámpagos FC', goles1: null, equipo2: 'Ciclones SC', goles2: null, ganador: null, fecha: '2025-11-23', hora: '18:00', cancha: 'Principal' },
      { id: 8, equipo1: 'Fénix FC', goles1: null, equipo2: 'Lechuzas SC', goles2: null, ganador: null, fecha: '2025-11-23', hora: '20:00', cancha: 'Cancha 2' },
    ],
    cuartos: [
      { id: 1, equipo1: 'Los Tigres FC', goles1: 2, equipo2: 'Águilas United', goles2: 1, ganador: 'Los Tigres FC', fecha: '2025-11-27', hora: '19:00', cancha: 'Principal' },
      { id: 2, equipo1: 'Leones FC', goles1: 1, equipo2: 'Dragones FC', goles2: 3, ganador: 'Dragones FC', fecha: '2025-11-27', hora: '21:00', cancha: 'Principal' },
      { id: 3, equipo1: null, goles1: null, equipo2: null, goles2: null, ganador: null, fecha: '2025-11-28', hora: '19:00', cancha: 'Principal' },
      { id: 4, equipo1: null, goles1: null, equipo2: null, goles2: null, ganador: null, fecha: '2025-11-28', hora: '21:00', cancha: 'Principal' },
    ],
    semifinal: [
      { id: 1, equipo1: 'Los Tigres FC', goles1: null, equipo2: 'Dragones FC', goles2: null, ganador: null, fecha: '2025-12-04', hora: '19:00', cancha: 'Principal' },
      { id: 2, equipo1: null, goles1: null, equipo2: null, goles2: null, ganador: null, fecha: '2025-12-04', hora: '21:00', cancha: 'Principal' },
    ],
    final: {
      equipo1: null,
      goles1: null,
      equipo2: null,
      goles2: null,
      ganador: null,
      fecha: '2025-12-11',
      hora: '20:00',
      cancha: 'Principal'
    }
  });

  const PartidoCard = ({ partido, tipo }) => {
    const esJugado = partido.goles1 !== null && partido.goles2 !== null;
    const tieneEquipos = partido.equipo1 && partido.equipo2;

    return (
      <div className={`bg-slate-700/30 rounded-lg p-4 border ${
        esJugado ? 'border-green-500/30' : 'border-slate-600/30'
      } hover:bg-slate-700/50 transition-all`}>
        
        {/* Fecha y Hora */}
        {tieneEquipos && (
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-600/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Calendar className="w-3 h-3" />
              {new Date(partido.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Clock className="w-3 h-3" />
              {partido.hora}
            </div>
          </div>
        )}

        {/* Equipos */}
        <div className="space-y-2">
          {/* Equipo 1 */}
          <div className={`flex items-center justify-between p-2 rounded ${
            partido.ganador === partido.equipo1 ? 'bg-green-500/20' : 'bg-slate-800/50'
          }`}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold truncate ${
                partido.equipo1 ? 'text-white' : 'text-slate-500'
              }`}>
                {partido.equipo1 || 'Por definir'}
              </span>
            </div>
            {esJugado && (
              <span className="text-white font-bold text-xl ml-2">{partido.goles1}</span>
            )}
          </div>

          {/* VS */}
          <div className="text-center text-slate-500 text-xs font-semibold">VS</div>

          {/* Equipo 2 */}
          <div className={`flex items-center justify-between p-2 rounded ${
            partido.ganador === partido.equipo2 ? 'bg-green-500/20' : 'bg-slate-800/50'
          }`}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold truncate ${
                partido.equipo2 ? 'text-white' : 'text-slate-500'
              }`}>
                {partido.equipo2 || 'Por definir'}
              </span>
            </div>
            {esJugado && (
              <span className="text-white font-bold text-xl ml-2">{partido.goles2}</span>
            )}
          </div>
        </div>

        {/* Info adicional */}
        {tieneEquipos && (
          <div className="mt-3 pt-3 border-t border-slate-600/50">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MapPin className="w-3 h-3" />
              {partido.cancha}
            </div>
            {partido.penales && (
              <div className="mt-2 text-center">
                <span className="text-yellow-400 text-xs font-semibold">
                  Penales: {partido.penales}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Cuadro de Eliminatorias
              </h1>
              <p className="text-slate-400">Copa Apertura 2026 - Fase Final</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">En Vivo</span>
            </div>
          </div>
        </div>

        {/* Cuadro de Eliminatorias - Horizontal Scroll */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="grid grid-cols-4 gap-6">
              
              {/* OCTAVOS DE FINAL */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white text-center mb-6 py-2 bg-slate-700/50 rounded-lg">
                  Octavos de Final
                </h2>
                {eliminatorias.octavos.map(partido => (
                  <PartidoCard key={partido.id} partido={partido} tipo="octavos" />
                ))}
              </div>

              {/* CUARTOS DE FINAL */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white text-center mb-6 py-2 bg-slate-700/50 rounded-lg">
                  Cuartos de Final
                </h2>
                <div className="space-y-[180px]">
                  {eliminatorias.cuartos.map(partido => (
                    <PartidoCard key={partido.id} partido={partido} tipo="cuartos" />
                  ))}
                </div>
              </div>

              {/* SEMIFINALES */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white text-center mb-6 py-2 bg-slate-700/50 rounded-lg">
                  Semifinales
                </h2>
                <div className="space-y-[380px]">
                  {eliminatorias.semifinal.map(partido => (
                    <PartidoCard key={partido.id} partido={partido} tipo="semifinal" />
                  ))}
                </div>
              </div>

              {/* FINAL */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white text-center mb-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  FINAL
                </h2>
                <div className="mt-[380px]">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                      <p className="text-yellow-400 font-bold">GRAN FINAL</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-bold">
                            {eliminatorias.final.equipo1 || 'Semifinal 1'}
                          </span>
                        </div>
                        {eliminatorias.final.goles1 !== null && (
                          <span className="text-white font-bold text-2xl">{eliminatorias.final.goles1}</span>
                        )}
                      </div>

                      <div className="text-center text-yellow-400 text-sm font-semibold">VS</div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-bold">
                            {eliminatorias.final.equipo2 || 'Semifinal 2'}
                          </span>
                        </div>
                        {eliminatorias.final.goles2 !== null && (
                          <span className="text-white font-bold text-2xl">{eliminatorias.final.goles2}</span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-yellow-500/30 pt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(eliminatorias.final.fecha).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          day: '2-digit', 
                          month: 'long' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Clock className="w-4 h-4" />
                        {eliminatorias.final.hora}
                      </div>
                      <div className="flex items-center gap-2 text-yellow-400">
                        <MapPin className="w-4 h-4" />
                        {eliminatorias.final.cancha}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Leyenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded"></div>
              <span className="text-slate-300">Ganador del partido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-700/30 border border-slate-600/30 rounded"></div>
              <span className="text-slate-300">Partido pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Gran Final</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CuadroEliminatorias;