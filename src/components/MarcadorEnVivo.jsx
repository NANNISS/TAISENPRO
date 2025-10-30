import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, StopCircle, Plus, Minus, AlertCircle, Award, Clock, Users } from 'lucide-react';

const MarcadorEnVivo = ({ partidoId }) => {
  // Estados principales
  const [partido, setPartido] = useState({
    id: 1,
    equipoLocal: { id: 1, nombre: 'Los Tigres FC', logo: null },
    equipoVisitante: { id: 2, nombre: 'Águilas United', logo: null },
    marcadorLocal: 0,
    marcadorVisitante: 0,
    duracionTiempo: 25, // minutos por tiempo
    estado: 'PENDIENTE' // PENDIENTE, PRIMER_TIEMPO, DESCANSO, SEGUNDO_TIEMPO, FINALIZADO
  });

  const [tiempo, setTiempo] = useState(0); // segundos
  const [corriendo, setCorriendo] = useState(false);
  const [goles, setGoles] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [jugadoresLocal, setJugadoresLocal] = useState([
    { id: 1, nombre: 'Juan Pérez', numero: 10 },
    { id: 2, nombre: 'Carlos Gómez', numero: 7 },
    { id: 3, nombre: 'Luis Torres', numero: 9 }
  ]);
  const [jugadoresVisitante, setJugadoresVisitante] = useState([
    { id: 4, nombre: 'Pedro Ramírez', numero: 11 },
    { id: 5, nombre: 'Miguel Sosa', numero: 8 },
    { id: 6, nombre: 'Diego Ruiz', numero: 6 }
  ]);

  const [mostrarModalGol, setMostrarModalGol] = useState(false);
  const [mostrarModalTarjeta, setMostrarModalTarjeta] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState('');

  const intervalRef = useRef(null);

  // Cronómetro
  useEffect(() => {
    if (corriendo) {
      intervalRef.current = setInterval(() => {
        setTiempo(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [corriendo]);

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const iniciarPartido = () => {
    setPartido({ ...partido, estado: 'PRIMER_TIEMPO' });
    setCorriendo(true);
  };

  const pausarReanudar = () => {
    setCorriendo(!corriendo);
  };

  const finalizarTiempo = () => {
    setCorriendo(false);
    if (partido.estado === 'PRIMER_TIEMPO') {
      setPartido({ ...partido, estado: 'DESCANSO' });
    } else if (partido.estado === 'SEGUNDO_TIEMPO') {
      setPartido({ ...partido, estado: 'FINALIZADO' });
    }
  };

  const iniciarSegundoTiempo = () => {
    setTiempo(0);
    setPartido({ ...partido, estado: 'SEGUNDO_TIEMPO' });
    setCorriendo(true);
  };

  const agregarGol = (equipo, jugadorId) => {
    const minuto = Math.floor(tiempo / 60);
    const jugador = equipo === 'local' 
      ? jugadoresLocal.find(j => j.id === jugadorId)
      : jugadoresVisitante.find(j => j.id === jugadorId);

    const nuevoGol = {
      id: Date.now(),
      equipo,
      jugador: jugador.nombre,
      numero: jugador.numero,
      minuto,
      tiempo: partido.estado === 'PRIMER_TIEMPO' ? '1T' : '2T'
    };

    setGoles([...goles, nuevoGol]);

    if (equipo === 'local') {
      setPartido({ ...partido, marcadorLocal: partido.marcadorLocal + 1 });
    } else {
      setPartido({ ...partido, marcadorVisitante: partido.marcadorVisitante + 1 });
    }

    setMostrarModalGol(false);
  };

  const quitarGol = (equipo) => {
    if (equipo === 'local' && partido.marcadorLocal > 0) {
      setPartido({ ...partido, marcadorLocal: partido.marcadorLocal - 1 });
      const ultimoGolLocal = goles.filter(g => g.equipo === 'local').pop();
      if (ultimoGolLocal) {
        setGoles(goles.filter(g => g.id !== ultimoGolLocal.id));
      }
    } else if (equipo === 'visitante' && partido.marcadorVisitante > 0) {
      setPartido({ ...partido, marcadorVisitante: partido.marcadorVisitante - 1 });
      const ultimoGolVisitante = goles.filter(g => g.equipo === 'visitante').pop();
      if (ultimoGolVisitante) {
        setGoles(goles.filter(g => g.id !== ultimoGolVisitante.id));
      }
    }
  };

  const agregarTarjeta = (equipo, jugadorId, tipo) => {
    const minuto = Math.floor(tiempo / 60);
    const jugador = equipo === 'local'
      ? jugadoresLocal.find(j => j.id === jugadorId)
      : jugadoresVisitante.find(j => j.id === jugadorId);

    const nuevaTarjeta = {
      id: Date.now(),
      equipo,
      jugador: jugador.nombre,
      numero: jugador.numero,
      tipo,
      minuto,
      tiempo: partido.estado === 'PRIMER_TIEMPO' ? '1T' : '2T'
    };

    setTarjetas([...tarjetas, nuevaTarjeta]);
    setMostrarModalTarjeta(false);
  };

  const abrirModalGol = (equipo) => {
    setEquipoSeleccionado(equipo);
    setMostrarModalGol(true);
  };

  const abrirModalTarjeta = (equipo, tipo) => {
    setEquipoSeleccionado(equipo);
    setTipoTarjeta(tipo);
    setMostrarModalTarjeta(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Marcador EN VIVO</h1>
              <p className="text-slate-400">Copa Apertura 2026</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-semibold">EN VIVO</span>
            </div>
          </div>
        </div>

        {/* Marcador Principal */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          
          {/* Estado del partido */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">
                {partido.estado === 'PENDIENTE' && 'Por Iniciar'}
                {partido.estado === 'PRIMER_TIEMPO' && 'Primer Tiempo'}
                {partido.estado === 'DESCANSO' && 'Descanso'}
                {partido.estado === 'SEGUNDO_TIEMPO' && 'Segundo Tiempo'}
                {partido.estado === 'FINALIZADO' && 'FINALIZADO'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center mb-8">
            
            {/* Equipo Local */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{partido.equipoLocal.nombre}</h2>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => abrirModalGol('local')}
                  disabled={partido.estado === 'PENDIENTE' || partido.estado === 'FINALIZADO'}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => quitarGol('local')}
                  disabled={partido.marcadorLocal === 0}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Marcador y Cronómetro */}
            <div className="text-center">
              <div className="bg-black/30 rounded-3xl p-6 mb-4">
                <div className="text-8xl font-bold text-white mb-2">
                  {partido.marcadorLocal} - {partido.marcadorVisitante}
                </div>
                <div className="text-4xl font-mono text-cyan-400 font-bold">
                  {formatearTiempo(tiempo)}
                </div>
              </div>

              {/* Controles */}
              <div className="flex justify-center gap-2">
                {partido.estado === 'PENDIENTE' && (
                  <button
                    onClick={iniciarPartido}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar Partido
                  </button>
                )}

                {(partido.estado === 'PRIMER_TIEMPO' || partido.estado === 'SEGUNDO_TIEMPO') && (
                  <>
                    <button
                      onClick={pausarReanudar}
                      className="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                    >
                      {corriendo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      {corriendo ? 'Pausar' : 'Reanudar'}
                    </button>
                    <button
                      onClick={finalizarTiempo}
                      className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                    >
                      <StopCircle className="w-5 h-5" />
                      Finalizar Tiempo
                    </button>
                  </>
                )}

                {partido.estado === 'DESCANSO' && (
                  <button
                    onClick={iniciarSegundoTiempo}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar 2do Tiempo
                  </button>
                )}
              </div>
            </div>

            {/* Equipo Visitante */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{partido.equipoVisitante.nombre}</h2>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => abrirModalGol('visitante')}
                  disabled={partido.estado === 'PENDIENTE' || partido.estado === 'FINALIZADO'}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => quitarGol('visitante')}
                  disabled={partido.marcadorVisitante === 0}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tarjetas */}
          {(partido.estado === 'PRIMER_TIEMPO' || partido.estado === 'SEGUNDO_TIEMPO') && (
            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-slate-700">
              <div className="flex gap-2">
                <button
                  onClick={() => abrirModalTarjeta('local', 'amarilla')}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-all"
                >
                  <AlertCircle className="w-5 h-5" />
                  Amarilla Local
                </button>
                <button
                  onClick={() => abrirModalTarjeta('local', 'roja')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-all"
                >
                  <AlertCircle className="w-5 h-5" />
                  Roja Local
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => abrirModalTarjeta('visitante', 'amarilla')}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-all"
                >
                  <AlertCircle className="w-5 h-5" />
                  Amarilla Visitante
                </button>
                <button
                  onClick={() => abrirModalTarjeta('visitante', 'roja')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-all"
                >
                  <AlertCircle className="w-5 h-5" />
                  Roja Visitante
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Eventos del partido */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Goles */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Goles
            </h3>
            <div className="space-y-2">
              {goles.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No hay goles registrados</p>
              ) : (
                goles.map(gol => (
                  <div key={gol.id} className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        gol.equipo === 'local' ? 'bg-blue-500' : 'bg-red-500'
                      }`}>
                        <span className="text-white font-bold">{gol.numero}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{gol.jugador}</p>
                        <p className="text-slate-400 text-sm">{gol.equipo === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">{gol.minuto}'</p>
                      <p className="text-slate-500 text-sm">{gol.tiempo}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tarjetas */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
              Tarjetas
            </h3>
            <div className="space-y-2">
              {tarjetas.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No hay tarjetas registradas</p>
              ) : (
                tarjetas.map(tarjeta => (
                  <div key={tarjeta.id} className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tarjeta.equipo === 'local' ? 'bg-blue-500' : 'bg-red-500'
                      }`}>
                        <span className="text-white font-bold">{tarjeta.numero}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{tarjeta.jugador}</p>
                        <p className="text-slate-400 text-sm">{tarjeta.equipo === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-8 rounded ${tarjeta.tipo === 'amarilla' ? 'bg-yellow-400' : 'bg-red-600'}`}></div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold">{tarjeta.minuto}'</p>
                        <p className="text-slate-500 text-sm">{tarjeta.tiempo}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Gol */}
        {mostrarModalGol && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-4">
                Registrar Gol - {equipoSeleccionado === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(equipoSeleccionado === 'local' ? jugadoresLocal : jugadoresVisitante).map(jugador => (
                  <button
                    key={jugador.id}
                    onClick={() => agregarGol(equipoSeleccionado, jugador.id)}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
                  >
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="font-bold">{jugador.numero}</span>
                    </div>
                    <span className="font-semibold">{jugador.nombre}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMostrarModalGol(false)}
                className="w-full mt-4 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Modal Tarjeta */}
        {mostrarModalTarjeta && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Tarjeta {tipoTarjeta === 'amarilla' ? (
                  <div className="w-6 h-8 bg-yellow-400 rounded"></div>
                ) : (
                  <div className="w-6 h-8 bg-red-600 rounded"></div>
                )}
                - {equipoSeleccionado === 'local' ? partido.equipoLocal.nombre : partido.equipoVisitante.nombre}
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(equipoSeleccionado === 'local' ? jugadoresLocal : jugadoresVisitante).map(jugador => (
                  <button
                    key={jugador.id}
                    onClick={() => agregarTarjeta(equipoSeleccionado, jugador.id, tipoTarjeta)}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg flex items-center gap-3 transition-all"
                  >
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="font-bold">{jugador.numero}</span>
                    </div>
                    <span className="font-semibold">{jugador.nombre}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setMostrarModalTarjeta(false)}
                className="w-full mt-4 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MarcadorEnVivo;