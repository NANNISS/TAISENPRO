import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Users, Award, Target } from 'lucide-react';

const TablaClasificacion = () => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('A');
  const [grupos, setGrupos] = useState(['A', 'B', 'C', 'D']);
  
  // Mock data - después conectar con BD
  const [equipos, setEquipos] = useState({
    'A': [
      { pos: 1, id: 1, nombre: 'Los Tigres FC', logo: null, pj: 6, pg: 5, pe: 1, pp: 0, gf: 18, gc: 5, dif: 13, pts: 16 },
      { pos: 2, id: 2, nombre: 'Águilas United', logo: null, pj: 6, pg: 4, pe: 1, pp: 1, gf: 15, gc: 7, dif: 8, pts: 13 },
      { pos: 3, id: 3, nombre: 'Leones FC', logo: null, pj: 6, pg: 3, pe: 2, pp: 1, gf: 12, gc: 8, dif: 4, pts: 11 },
      { pos: 4, id: 4, nombre: 'Halcones CF', logo: null, pj: 6, pg: 2, pe: 2, pp: 2, gf: 10, gc: 10, dif: 0, pts: 8 },
      { pos: 5, id: 5, nombre: 'Pumas SC', logo: null, pj: 6, pg: 1, pe: 2, pp: 3, gf: 6, gc: 12, dif: -6, pts: 5 },
      { pos: 6, id: 6, nombre: 'Cóndores FC', logo: null, pj: 6, pg: 0, pe: 1, pp: 5, gf: 3, gc: 16, dif: -13, pts: 1 },
    ],
    'B': [
      { pos: 1, id: 7, nombre: 'Dragones FC', logo: null, pj: 6, pg: 5, pe: 0, pp: 1, gf: 20, gc: 6, dif: 14, pts: 15 },
      { pos: 2, id: 8, nombre: 'Titanes United', logo: null, pj: 6, pg: 4, pe: 2, pp: 0, gf: 14, gc: 5, dif: 9, pts: 14 },
      { pos: 3, id: 9, nombre: 'Gladiadores SC', logo: null, pj: 6, pg: 3, pe: 1, pp: 2, gf: 11, gc: 9, dif: 2, pts: 10 },
      { pos: 4, id: 10, nombre: 'Guerreros CF', logo: null, pj: 6, pg: 2, pe: 1, pp: 3, gf: 8, gc: 11, dif: -3, pts: 7 },
      { pos: 5, id: 11, nombre: 'Vikingos FC', logo: null, pj: 6, pg: 1, pe: 1, pp: 4, gf: 7, gc: 14, dif: -7, pts: 4 },
      { pos: 6, id: 12, nombre: 'Espartanos SC', logo: null, pj: 6, pg: 0, pe: 1, pp: 5, gf: 4, gc: 19, dif: -15, pts: 1 },
    ],
    'C': [
      { pos: 1, id: 13, nombre: 'Relámpagos FC', logo: null, pj: 5, pg: 4, pe: 1, pp: 0, gf: 16, gc: 4, dif: 12, pts: 13 },
      { pos: 2, id: 14, nombre: 'Truenos United', logo: null, pj: 5, pg: 3, pe: 2, pp: 0, gf: 12, gc: 6, dif: 6, pts: 11 },
      { pos: 3, id: 15, nombre: 'Rayos SC', logo: null, pj: 5, pg: 2, pe: 2, pp: 1, gf: 9, gc: 7, dif: 2, pts: 8 },
      { pos: 4, id: 16, nombre: 'Tornados CF', logo: null, pj: 5, pg: 1, pe: 2, pp: 2, gf: 7, gc: 9, dif: -2, pts: 5 },
      { pos: 5, id: 17, nombre: 'Huracanes FC', logo: null, pj: 5, pg: 1, pe: 0, pp: 4, gf: 5, gc: 13, dif: -8, pts: 3 },
      { pos: 6, id: 18, nombre: 'Ciclones SC', logo: null, pj: 5, pg: 0, pe: 1, pp: 4, gf: 3, gc: 13, dif: -10, pts: 1 },
    ],
    'D': [
      { pos: 1, id: 19, nombre: 'Fénix FC', logo: null, pj: 5, pg: 5, pe: 0, pp: 0, gf: 18, gc: 2, dif: 16, pts: 15 },
      { pos: 2, id: 20, nombre: 'Halcones SC', logo: null, pj: 5, pg: 3, pe: 1, pp: 1, gf: 11, gc: 6, dif: 5, pts: 10 },
      { pos: 3, id: 21, nombre: 'Búhos United', logo: null, pj: 5, pg: 2, pe: 2, pp: 1, gf: 8, gc: 7, dif: 1, pts: 8 },
      { pos: 4, id: 22, nombre: 'Gavilanes CF', logo: null, pj: 5, pg: 1, pe: 3, pp: 1, gf: 6, gc: 6, dif: 0, pts: 6 },
      { pos: 5, id: 23, nombre: 'Cuervos FC', logo: null, pj: 5, pg: 1, pe: 0, pp: 4, gf: 5, gc: 12, dif: -7, pts: 3 },
      { pos: 6, id: 24, nombre: 'Lechuzas SC', logo: null, pj: 5, pg: 0, pe: 0, pp: 5, gf: 2, gc: 17, dif: -15, pts: 0 },
    ]
  });

  const [estadisticasGenerales, setEstadisticasGenerales] = useState({
    totalEquipos: 24,
    partidosJugados: 72,
    golesAnotados: 312,
    promedioGoles: 4.3
  });

  const equiposGrupoActual = equipos[grupoSeleccionado] || [];

  const getPosicionColor = (pos) => {
    if (pos <= 2) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (pos <= 4) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-slate-400 bg-slate-700/30 border-slate-600/30';
  };

  const getPosicionIcon = (pos) => {
    if (pos === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (pos <= 2) return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (pos <= 4) return <Minus className="w-5 h-5 text-yellow-400" />;
    return <TrendingDown className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Tabla de Clasificación
              </h1>
              <p className="text-slate-400">Copa Apertura 2026 - Fase de Grupos</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">Actualizado en Tiempo Real</span>
            </div>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span className="text-slate-400 text-sm">Equipos</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticasGenerales.totalEquipos}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-green-400" />
              <span className="text-slate-400 text-sm">Partidos</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticasGenerales.partidosJugados}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-yellow-400" />
              <span className="text-slate-400 text-sm">Goles</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticasGenerales.golesAnotados}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              <span className="text-slate-400 text-sm">Promedio</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticasGenerales.promedioGoles}</p>
            <p className="text-slate-400 text-xs">goles/partido</p>
          </div>
        </div>

        {/* Selector de Grupos */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex gap-2 flex-wrap">
            {grupos.map(grupo => (
              <button
                key={grupo}
                onClick={() => setGrupoSeleccionado(grupo)}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                  grupoSeleccionado === grupo
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Grupo {grupo}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
          
          {/* Header de la tabla */}
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Grupo {grupoSeleccionado}</h2>
            <p className="text-slate-400 text-sm">Clasifican los 2 primeros de cada grupo</p>
          </div>

          {/* Tabla Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/30">
                <tr className="text-slate-400 text-sm">
                  <th className="text-left py-4 px-6 font-semibold">POS</th>
                  <th className="text-left py-4 px-6 font-semibold">EQUIPO</th>
                  <th className="text-center py-4 px-4 font-semibold">PJ</th>
                  <th className="text-center py-4 px-4 font-semibold">PG</th>
                  <th className="text-center py-4 px-4 font-semibold">PE</th>
                  <th className="text-center py-4 px-4 font-semibold">PP</th>
                  <th className="text-center py-4 px-4 font-semibold">GF</th>
                  <th className="text-center py-4 px-4 font-semibold">GC</th>
                  <th className="text-center py-4 px-4 font-semibold">DIF</th>
                  <th className="text-center py-4 px-6 font-semibold">PTS</th>
                </tr>
              </thead>
              <tbody>
                {equiposGrupoActual.map((equipo, index) => (
                  <tr 
                    key={equipo.id}
                    className={`border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                      index === 0 ? 'bg-green-500/5' : ''
                    } ${index === 1 ? 'bg-green-500/5' : ''}`}
                  >
                    <td className="py-4 px-6">
                      <div className={`flex items-center gap-2 border ${getPosicionColor(equipo.pos)} rounded-lg px-3 py-2 w-fit`}>
                        {getPosicionIcon(equipo.pos)}
                        <span className="font-bold">{equipo.pos}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-white">{equipo.nombre}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 text-slate-300 font-medium">{equipo.pj}</td>
                    <td className="text-center py-4 px-4 text-green-400 font-bold">{equipo.pg}</td>
                    <td className="text-center py-4 px-4 text-yellow-400 font-medium">{equipo.pe}</td>
                    <td className="text-center py-4 px-4 text-red-400 font-medium">{equipo.pp}</td>
                    <td className="text-center py-4 px-4 text-slate-300 font-medium">{equipo.gf}</td>
                    <td className="text-center py-4 px-4 text-slate-300 font-medium">{equipo.gc}</td>
                    <td className="text-center py-4 px-4">
                      <span className={`font-bold ${
                        equipo.dif > 0 ? 'text-green-400' : 
                        equipo.dif < 0 ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {equipo.dif > 0 ? '+' : ''}{equipo.dif}
                      </span>
                    </td>
                    <td className="text-center py-4 px-6">
                      <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-4 py-2 inline-block">
                        <span className="text-cyan-400 font-bold text-lg">{equipo.pts}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabla Mobile */}
          <div className="md:hidden divide-y divide-slate-700/50">
            {equiposGrupoActual.map((equipo, index) => (
              <div 
                key={equipo.id}
                className={`p-4 ${index === 0 || index === 1 ? 'bg-green-500/5' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 border ${getPosicionColor(equipo.pos)} rounded-lg px-2 py-1`}>
                      {getPosicionIcon(equipo.pos)}
                      <span className="font-bold text-sm">{equipo.pos}</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{equipo.nombre}</p>
                      <p className="text-xs text-slate-400">{equipo.pj} partidos</p>
                    </div>
                  </div>
                  <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-3 py-1">
                    <span className="text-cyan-400 font-bold text-lg">{equipo.pts}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <p className="text-slate-400 text-xs">PG</p>
                    <p className="text-green-400 font-bold">{equipo.pg}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">PE</p>
                    <p className="text-yellow-400 font-bold">{equipo.pe}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">PP</p>
                    <p className="text-red-400 font-bold">{equipo.pp}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">DIF</p>
                    <p className={`font-bold ${
                      equipo.dif > 0 ? 'text-green-400' : 
                      equipo.dif < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {equipo.dif > 0 ? '+' : ''}{equipo.dif}
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700/50 flex justify-around text-xs text-slate-400">
                  <span>GF: <span className="text-white font-semibold">{equipo.gf}</span></span>
                  <span>GC: <span className="text-white font-semibold">{equipo.gc}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Leyenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 border border-green-500/50 rounded"></div>
              <span className="text-slate-300">Clasifican a Octavos de Final</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300">Líder del grupo</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700 text-slate-400 text-xs">
            <p><strong className="text-white">PJ:</strong> Partidos Jugados | <strong className="text-white">PG:</strong> Ganados | <strong className="text-white">PE:</strong> Empatados | <strong className="text-white">PP:</strong> Perdidos</p>
            <p><strong className="text-white">GF:</strong> Goles a Favor | <strong className="text-white">GC:</strong> Goles en Contra | <strong className="text-white">DIF:</strong> Diferencia | <strong className="text-white">PTS:</strong> Puntos</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TablaClasificacion;