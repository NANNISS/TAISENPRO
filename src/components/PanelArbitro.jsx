import React, { useState } from 'react';
import { Shield, Calendar, MapPin, Clock, Users, Award, CheckCircle, AlertCircle } from 'lucide-react';

const PanelArbitro = () => {
  const [arbitro, setArbitro] = useState({
    nombre: 'Carlos Ramírez',
    cedula: '1234567',
    experiencia: '5 años',
    categoria: 'Nacional'
  });

  const [partidosAsignados, setPartidosAsignados] = useState([
    {
      id: 1,
      fecha: '2025-11-05',
      hora: '18:00',
      equipoLocal: 'Los Tigres FC',
      equipoVisitante: 'Águilas United',
      cancha: 'Cancha Principal',
      estado: 'PENDIENTE',
      categoria: 'Fase de Grupos'
    },
    {
      id: 2,
      fecha: '2025-11-06',
      hora: '20:00',
      equipoLocal: 'Leones FC',
      equipoVisitante: 'Halcones CF',
      cancha: 'Cancha 2',
      estado: 'PENDIENTE',
      categoria: 'Fase de Grupos'
    },
    {
      id: 3,
      fecha: '2025-11-12',
      hora: '19:00',
      equipoLocal: 'Pumas SC',
      equipoVisitante: 'Cóndores FC',
      cancha: 'Cancha Principal',
      estado: 'PENDIENTE',
      categoria: 'Fase de Grupos'
    }
  ]);

  const [partidosDirigidos, setPartidosDirigidos] = useState([
    {
      id: 1,
      fecha: '2025-10-29',
      equipoLocal: 'Dragones FC',
      equipoVisitante: 'Titanes United',
      resultado: '3 - 2',
      tarjetasAmarillas: 4,
      tarjetasRojas: 1
    },
    {
      id: 2,
      fecha: '2025-10-22',
      equipoLocal: 'Relámpagos FC',
      equipoVisitante: 'Truenos United',
      resultado: '1 - 1',
      tarjetasAmarillas: 2,
      tarjetasRojas: 0
    },
    {
      id: 3,
      fecha: '2025-10-15',
      equipoLocal: 'Fénix FC',
      equipoVisitante: 'Halcones SC',
      resultado: '4 - 0',
      tarjetasAmarillas: 1,
      tarjetasRojas: 0
    }
  ]);

  const [estadisticas, setEstadisticas] = useState({
    partidosDirigidos: 15,
    tarjetasAmarillas: 23,
    tarjetasRojas: 3,
    promedioTarjetas: 1.7
  });

  const formatearFecha = (fecha) => {
    const opciones = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'PENDIENTE': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'EN_CURSO': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'FINALIZADO': return 'bg-slate-600/20 text-slate-400 border-slate-600/30';
      default: return 'bg-slate-600/20 text-slate-400 border-slate-600/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-14 h-14 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{arbitro.nombre}</h1>
              <div className="flex items-center gap-4 text-slate-300 flex-wrap">
                <span>Cédula: {arbitro.cedula}</span>
                <span>•</span>
                <span>Categoría: {arbitro.categoria}</span>
                <span>•</span>
                <span>Experiencia: {arbitro.experiencia}</span>
              </div>
            </div>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all">
              Mi Perfil
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-400 text-sm">Partidos</span>
            </div>
            <p className="text-3xl font-bold text-white">{estadisticas.partidosDirigidos}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">Amarillas</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{estadisticas.tarjetasAmarillas}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-slate-400 text-sm">Rojas</span>
            </div>
            <p className="text-3xl font-bold text-red-400">{estadisticas.tarjetasRojas}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Promedio</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{estadisticas.promedioTarjetas}</p>
            <p className="text-slate-400 text-xs">tarjetas/partido</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Partidos Asignados */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" />
              Partidos Asignados ({partidosAsignados.length})
            </h2>
            
            <div className="space-y-4">
              {partidosAsignados.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No tienes partidos asignados</p>
                </div>
              ) : (
                partidosAsignados.map(partido => (
                  <div key={partido.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-3 py-1 rounded-full border ${getEstadoColor(partido.estado)}`}>
                            {partido.estado}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {partido.categoria}
                          </span>
                        </div>
                        <p className="text-white font-bold text-lg mb-1">
                          {partido.equipoLocal} <span className="text-slate-500">vs</span> {partido.equipoVisitante}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        {formatearFecha(partido.fecha)} - {partido.hora}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {partido.cancha}
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all">
                      Ver Detalles del Partido
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Historial de Partidos */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Partidos Dirigidos
            </h2>
            
            <div className="space-y-4">
              {partidosDirigidos.map(partido => (
                <div key={partido.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-bold text-lg mb-1">
                        {partido.equipoLocal} <span className="text-slate-500">vs</span> {partido.equipoVisitante}
                      </p>
                      <p className="text-slate-400 text-sm">{formatearFecha(partido.fecha)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-2xl">{partido.resultado}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-6 bg-yellow-400 rounded"></div>
                      <span className="text-slate-300 text-sm">{partido.tarjetasAmarillas} Amarillas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-6 bg-red-600 rounded"></div>
                      <span className="text-slate-300 text-sm">{partido.tarjetasRojas} Rojas</span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-semibold transition-all border border-yellow-500/30">
                Ver Historial Completo
              </button>
            </div>
          </div>
        </div>

        {/* Información Importante */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            Información Importante
          </h3>
          <div className="space-y-3 text-slate-300">
            <p>• Debes llegar 30 minutos antes del partido asignado</p>
            <p>• Verifica que tengas tarjetas amarillas y rojas</p>
            <p>• Reporta cualquier incidente al finalizar el partido</p>
            <p>• En caso de emergencia, contacta al organizador</p>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-xl p-6 text-left transition-all group">
            <Calendar className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Calendario Completo</h3>
            <p className="text-slate-400 text-sm">Ver todos los partidos</p>
          </button>

          <button className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 rounded-xl p-6 text-left transition-all group">
            <AlertCircle className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Reglamento</h3>
            <p className="text-slate-400 text-sm">Normas y reglas</p>
          </button>

          <button className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl p-6 text-left transition-all group">
            <Users className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-1">Contactos</h3>
            <p className="text-slate-400 text-sm">Organizadores y soporte</p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PanelArbitro;