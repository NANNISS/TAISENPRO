import React, { useState, useEffect } from 'react';
import { Users, Award, AlertCircle, Clock } from 'lucide-react';

const MarcadorPublico = ({ partidoId }) => {
  const [partido, setPartido] = useState({
    equipoLocal: { nombre: 'Los Tigres FC', logo: null },
    equipoVisitante: { nombre: 'Águilas United', logo: null },
    marcadorLocal: 3,
    marcadorVisitante: 2,
    minuto: 38,
    estado: 'SEGUNDO_TIEMPO'
  });

  const [goles, setGoles] = useState([
    { equipo: 'local', jugador: 'Juan Pérez', numero: 10, minuto: 5, tiempo: '1T' },
    { equipo: 'visitante', jugador: 'Pedro Ramírez', numero: 11, minuto: 12, tiempo: '1T' },
    { equipo: 'local', jugador: 'Carlos Gómez', numero: 7, minuto: 28, tiempo: '2T' },
    { equipo: 'visitante', jugador: 'Miguel Sosa', numero: 8, minuto: 32, tiempo: '2T' },
    { equipo: 'local', jugador: 'Luis Torres', numero: 9, minuto: 35, tiempo: '2T' },
  ]);

  const [tarjetas, setTarjetas] = useState([
    { equipo: 'local', jugador: 'Juan Pérez', numero: 10, tipo: 'amarilla', minuto: 15 },
    { equipo: 'visitante', jugador: 'Diego Ruiz', numero: 6, tipo: 'amarilla', minuto: 22 },
  ]);

  // Simular actualización en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPartido(prev => ({
        ...prev,
        minuto: prev.minuto < 50 ? prev.minuto + 1 : prev.minuto
      }));
    }, 60000); // cada minuto

    return () => clearInterval(interval);
  }, []);

  const getEstadoTexto = () => {
    switch(partido.estado) {
      case 'PRIMER_TIEMPO': return 'Primer Tiempo';
      case 'DESCANSO': return 'DESCANSO';
      case 'SEGUNDO_TIEMPO': return 'Segundo Tiempo';
      case 'FINALIZADO': return 'FINAL';
      default: return 'Por Iniciar';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl space-y-6">
        
        {/* Marcador Principal - GRANDE */}
        <div className="bg-gradient-to-r from-slate-800/90 to-slate-800/70 backdrop-blur-xl border-4 border-slate-700/50 rounded-3xl p-12 shadow-2xl">
          
          {/* EN VIVO Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 px-8 py-3 bg-red-500/20 border-2 border-red-500/50 rounded-full">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-bold text-2xl">EN VIVO</span>
            </div>
          </div>

          {/* Estado y Minuto */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-700/50 rounded-xl">
              <Clock className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-bold text-3xl">{getEstadoTexto()}</span>
              {partido.estado !== 'DESCANSO' && partido.estado !== 'FINALIZADO' && (
                <span className="text-cyan-400 font-bold text-3xl ml-4">{partido.minuto}'</span>
              )}
            </div>
          </div>

          {/* Marcador */}
          <div className="grid grid-cols-3 gap-8 items-center mb-8">
            
            {/* Equipo Local */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Users className="w-24 h-24 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{partido.equipoLocal.nombre}</h2>
              <p className="text-slate-400 text-xl">LOCAL</p>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="bg-black/40 rounded-3xl p-8 border-4 border-slate-700">
                <div className="text-9xl font-bold text-white tracking-wider">
                  {partido.marcadorLocal} <span className="text-slate-600">-</span> {partido.marcadorVisitante}
                </div>
              </div>
            </div>

            {/* Equipo Visitante */}
            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <Users className="w-24 h-24 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{partido.equipoVisitante.nombre}</h2>
              <p className="text-slate-400 text-xl">VISITANTE</p>
            </div>
          </div>
        </div>

        {/* Eventos del Partido */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Goles */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              Goles
            </h3>
            <div className="space-y-4">
              {goles.length === 0 ? (
                <p className="text-slate-400 text-center py-8 text-xl">No hay goles aún</p>
              ) : (
                goles.map((gol, index) => (
                  <div key={index} className="bg-slate-700/40 rounded-xl p-5 flex items-center justify-between border border-slate-600/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                        gol.equipo === 'local' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                      }`}>
                        {gol.numero}
                      </div>
                      <div>
                        <p className="text-white font-bold text-2xl">{gol.jugador}</p>
                        <p className="text-slate-400 text-lg">
                          {gol.equipo === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold text-3xl">{gol.minuto}'</p>
                      <p className="text-slate-500 text-lg">{gol.tiempo}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tarjetas */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-400" />
              Tarjetas
            </h3>
            <div className="space-y-4">
              {tarjetas.length === 0 ? (
                <p className="text-slate-400 text-center py-8 text-xl">No hay tarjetas</p>
              ) : (
                tarjetas.map((tarjeta, index) => (
                  <div key={index} className="bg-slate-700/40 rounded-xl p-5 flex items-center justify-between border border-slate-600/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${
                        tarjeta.equipo === 'local' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                      }`}>
                        {tarjeta.numero}
                      </div>
                      <div>
                        <p className="text-white font-bold text-2xl">{tarjeta.jugador}</p>
                        <p className="text-slate-400 text-lg">
                          {tarjeta.equipo === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-12 rounded ${tarjeta.tipo === 'amarilla' ? 'bg-yellow-400' : 'bg-red-600'}`}></div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold text-3xl">{tarjeta.minuto}'</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-slate-500 text-xl">Copa Apertura 2026 • Powered by TAISENPRO</p>
        </div>

      </div>
    </div>
  );
};

export default MarcadorPublico;