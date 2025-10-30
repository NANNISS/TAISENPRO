import React, { useState } from 'react';
import { Users, Trophy, Target, Calendar, AlertCircle, MapPin, Clock, Award, TrendingUp, Shirt } from 'lucide-react';

const DashboardJugador = () => {
  const [jugador, setJugador] = useState({
    nombre: 'Juan Pérez',
    equipo: 'Los Tigres FC',
    numero: 10,
    posicion: 'Mediocampista Ofensivo',
    foto: null
  });

  const [estadisticas, setEstadisticas] = useState({
    partidosJugados: 8,
    goles: 5,
    asistencias: 3,
    tarjetasAmarillas: 2,
    tarjetasRojas: 0,
    minutosJugados: 640
  });

  const [proximosPartidos, setProximosPartidos] = useState([
    {
      id: 1,
      fecha: '2025-11-05',
      hora: '18:00',
      rival: 'Águilas United',
      cancha: 'Cancha Principal',
      tipo: 'Fase de Grupos'
    },
    {
      id: 2,
      fecha: '2025-11-12',
      hora: '20:00',
      rival: 'Leones FC',
      cancha: 'Cancha 2',
      tipo: 'Fase de Grupos'
    },
    {
      id: 3,
      fecha: '2025-11-19',
      hora: '19:00',
      rival: 'Halcones CF',
      cancha: 'Cancha Principal',
      tipo: 'Fase de Grupos'
    }
  ]);

  const [ultimosPartidos, setUltimosPartidos] = useState([
    {
      id: 1,
      fecha: '2025-10-29',
      rival: 'Pumas SC',
      resultado: '3 - 1',
      ganado: true,
      goles: 1,
      asistencias: 1,
      minutos: 90
    },
    {
      id: 2,
      fecha: '2025-10-22',
      rival: 'Cóndores FC',
      resultado: '2 - 2',
      ganado: false,
      goles: 0,
      asistencias: 1,
      minutos: 85
    },
    {
      id: 3,
      fecha: '2025-10-15',
      rival: 'Dragones FC',
      resultado: '1 - 2',
      ganado: false,
      goles: 1,
      asistencias: 0,
      minutos: 90
    }
  ]);

  const formatearFecha = (fecha) => {
    const opciones = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl">
              {jugador.numero}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{jugador.nombre}</h1>
              <div className="flex items-center gap-4 text-slate-300 flex-wrap">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  {jugador.equipo}
                </span>
                <span className="flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-cyan-400" />
                  {jugador.posicion}
                </span>
              </div>
            </div>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Partidos</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticas.partidosJugados}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-slate-400 text-sm">Goles</span>
            </div>
            <p className="text-3xl font-bold text-green-400">{estadisticas.goles}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Asistencias</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{estadisticas.asistencias}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Minutos</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{estadisticas.minutosJugados}'</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-slate-400 text-sm">Amarillas</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{estadisticas.tarjetasAmarillas}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-slate-400 text-sm">Rojas</span>
            </div>
            <p className="text-3xl font-bold text-red-500">{estadisticas.tarjetasRojas}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Próximos Partidos */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" />
              Próximos Partidos
            </h2>
            
            <div className="space-y-4">
              {proximosPartidos.map(partido => (
                <div key={partido.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-bold text-lg">vs {partido.rival}</p>
                      <p className="text-slate-400 text-sm">{partido.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">{formatearFecha(partido.fecha)}</p>
                      <p className="text-slate-400 text-sm">{partido.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {partido.cancha}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-semibold transition-all border border-cyan-500/30">
              Ver Calendario Completo
            </button>
          </div>

          {/* Últimos Partidos */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Últimos Partidos
            </h2>
            
            <div className="space-y-4">
              {ultimosPartidos.map(partido => (
                <div key={partido.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-bold text-lg">vs {partido.rival}</p>
                      <p className="text-slate-400 text-sm">{formatearFecha(partido.fecha)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-2xl ${partido.ganado ? 'text-green-400' : 'text-slate-400'}`}>
                        {partido.resultado}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        partido.ganado ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/50 text-slate-400'
                      }`}>
                        {partido.ganado ? 'Victoria' : 'Empate/Derrota'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-slate-400 text-xs">Goles</p>
                      <p className="text-white font-bold">{partido.goles}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Asist.</p>
                      <p className="text-white font-bold">{partido.asistencias}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Mins</p>
                      <p className="text-white font-bold">{partido.minutos}'</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-semibold transition-all border border-yellow-500/30">
              Ver Historial Completo
            </button>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-xl p-6 text-left transition-all group">
            <Users className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Mi Equipo</h3>
            <p className="text-slate-400 text-sm">Ver compañeros y plantilla</p>
          </button>

          <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl p-6 text-left transition-all group">
            <TrendingUp className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Mis Estadísticas</h3>
            <p className="text-slate-400 text-sm">Detalles completos</p>
          </button>

          <button className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 rounded-xl p-6 text-left transition-all group">
            <Trophy className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Clasificación</h3>
            <p className="text-slate-400 text-sm">Ver tabla del grupo</p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardJugador;