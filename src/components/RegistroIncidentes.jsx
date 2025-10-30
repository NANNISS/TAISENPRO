import React, { useState } from 'react';
import { AlertCircle, FileText, User, Calendar, Clock, DollarSign, Save, Trash2, Plus, CheckCircle } from 'lucide-react';

const RegistroIncidentes = ({ partidoId }) => {
  const [partido, setPartido] = useState({
    id: 1,
    equipoLocal: 'Los Tigres FC',
    equipoVisitante: 'Águilas United',
    fecha: '2025-11-05',
    hora: '18:00',
    minutoActual: 35
  });

  const [jugadoresLocal, setJugadoresLocal] = useState([
    { id: 1, nombre: 'Juan Pérez', numero: 10 },
    { id: 2, nombre: 'Carlos Gómez', numero: 7 },
    { id: 3, nombre: 'Luis Torres', numero: 9 },
    { id: 4, nombre: 'Miguel Sánchez', numero: 1 },
    { id: 5, nombre: 'Diego Ramírez', numero: 4 }
  ]);

  const [jugadoresVisitante, setJugadoresVisitante] = useState([
    { id: 6, nombre: 'Pedro Ramírez', numero: 11 },
    { id: 7, nombre: 'Miguel Sosa', numero: 8 },
    { id: 8, nombre: 'Diego Ruiz', numero: 6 },
    { id: 9, nombre: 'Roberto Silva', numero: 3 },
    { id: 10, nombre: 'Fernando López', numero: 5 }
  ]);

  const [incidentes, setIncidentes] = useState([
    {
      id: 1,
      tipo: 'tarjeta_amarilla',
      jugador: 'Juan Pérez',
      numero: 10,
      equipo: 'Los Tigres FC',
      minuto: 15,
      motivo: 'Falta táctica',
      multa: 50000
    },
    {
      id: 2,
      tipo: 'tarjeta_amarilla',
      jugador: 'Diego Ruiz',
      numero: 6,
      equipo: 'Águilas United',
      minuto: 22,
      motivo: 'Conducta antideportiva',
      multa: 50000
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [incidenteActual, setIncidenteActual] = useState({
    tipo: 'tarjeta_amarilla',
    jugadorId: '',
    equipo: 'local',
    minuto: partido.minutoActual,
    motivo: '',
    descripcion: '',
    multa: 0
  });

  const [guardado, setGuardado] = useState(false);

  const tiposIncidente = [
    { value: 'tarjeta_amarilla', label: 'Tarjeta Amarilla', color: 'yellow', multa: 50000 },
    { value: 'tarjeta_roja', label: 'Tarjeta Roja', color: 'red', multa: 200000 },
    { value: 'doble_amarilla', label: 'Doble Amarilla', color: 'red', multa: 150000 },
    { value: 'lesion', label: 'Lesión', color: 'blue', multa: 0 },
    { value: 'agresion', label: 'Agresión', color: 'purple', multa: 500000 },
    { value: 'otro', label: 'Otro Incidente', color: 'slate', multa: 0 }
  ];

  const motivosPredefinidos = [
    'Falta táctica',
    'Conducta antideportiva',
    'Juego brusco',
    'Protestar al árbitro',
    'Lenguaje ofensivo',
    'Entrada peligrosa',
    'Simulación',
    'Perder tiempo',
    'Otro'
  ];

  const abrirModal = () => {
    setIncidenteActual({
      tipo: 'tarjeta_amarilla',
      jugadorId: '',
      equipo: 'local',
      minuto: partido.minutoActual,
      motivo: '',
      descripcion: '',
      multa: 50000
    });
    setMostrarModal(true);
  };

  const handleTipoChange = (tipo) => {
    const tipoSeleccionado = tiposIncidente.find(t => t.value === tipo);
    setIncidenteActual({
      ...incidenteActual,
      tipo,
      multa: tipoSeleccionado.multa
    });
  };

  const agregarIncidente = () => {
    const jugadores = incidenteActual.equipo === 'local' ? jugadoresLocal : jugadoresVisitante;
    const jugador = jugadores.find(j => j.id === parseInt(incidenteActual.jugadorId));

    if (!jugador) {
      alert('Selecciona un jugador');
      return;
    }

    const nuevoIncidente = {
      id: Date.now(),
      tipo: incidenteActual.tipo,
      jugador: jugador.nombre,
      numero: jugador.numero,
      equipo: incidenteActual.equipo === 'local' ? partido.equipoLocal : partido.equipoVisitante,
      minuto: incidenteActual.minuto,
      motivo: incidenteActual.motivo,
      descripcion: incidenteActual.descripcion,
      multa: incidenteActual.multa
    };

    setIncidentes([...incidentes, nuevoIncidente]);
    setMostrarModal(false);
  };

  const eliminarIncidente = (id) => {
    if (confirm('¿Seguro que deseas eliminar este incidente?')) {
      setIncidentes(incidentes.filter(inc => inc.id !== id));
    }
  };

  const guardarReporte = () => {
    // Aquí iría la lógica para guardar en BD
    console.log('Guardando reporte:', {
      partidoId: partido.id,
      incidentes
    });
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const getTipoColor = (tipo) => {
    const tipoInfo = tiposIncidente.find(t => t.value === tipo);
    return tipoInfo?.color || 'slate';
  };

  const getTipoLabel = (tipo) => {
    const tipoInfo = tiposIncidente.find(t => t.value === tipo);
    return tipoInfo?.label || tipo;
  };

  const totalMultas = incidentes.reduce((sum, inc) => sum + inc.multa, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-8 h-8 text-yellow-400" />
                Registro de Incidentes y Multas
              </h1>
              <div className="text-slate-300">
                <p className="font-semibold text-lg mb-1">
                  {partido.equipoLocal} vs {partido.equipoVisitante}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(partido.fecha).toLocaleDateString('es-ES')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {partido.hora}
                  </span>
                  <span className="text-cyan-400 font-semibold">
                    Minuto: {partido.minutoActual}'
                  </span>
                </div>
              </div>
            </div>
            
            {guardado && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Guardado</span>
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-400 text-sm">T. Amarillas</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {incidentes.filter(i => i.tipo === 'tarjeta_amarilla').length}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-slate-400 text-sm">T. Rojas</span>
            </div>
            <p className="text-3xl font-bold text-red-400">
              {incidentes.filter(i => i.tipo === 'tarjeta_roja' || i.tipo === 'doble_amarilla').length}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <span className="text-slate-400 text-sm">Total Incidentes</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{incidentes.length}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-slate-400 text-sm">Total Multas</span>
            </div>
            <p className="text-2xl font-bold text-green-400">
              ₲{totalMultas.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Botón Agregar */}
        <div>
          <button
            onClick={abrirModal}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Registrar Nuevo Incidente
          </button>
        </div>

        {/* Lista de Incidentes */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Incidentes Registrados ({incidentes.length})
          </h2>
          
          {incidentes.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No hay incidentes registrados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidentes.map(incidente => (
                <div key={incidente.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Tipo de Incidente */}
                      <div className={`px-4 py-2 rounded-lg border-2 ${
                        incidente.tipo === 'tarjeta_amarilla' ? 'bg-yellow-400/20 border-yellow-400' :
                        incidente.tipo === 'tarjeta_roja' ? 'bg-red-500/20 border-red-500' :
                        incidente.tipo === 'doble_amarilla' ? 'bg-red-500/20 border-red-500' :
                        incidente.tipo === 'lesion' ? 'bg-blue-500/20 border-blue-500' :
                        incidente.tipo === 'agresion' ? 'bg-purple-500/20 border-purple-500' :
                        'bg-slate-500/20 border-slate-500'
                      }`}>
                        <span className={`font-bold text-sm ${
                          incidente.tipo === 'tarjeta_amarilla' ? 'text-yellow-400' :
                          incidente.tipo === 'tarjeta_roja' ? 'text-red-400' :
                          incidente.tipo === 'doble_amarilla' ? 'text-red-400' :
                          incidente.tipo === 'lesion' ? 'text-blue-400' :
                          incidente.tipo === 'agresion' ? 'text-purple-400' :
                          'text-slate-400'
                        }`}>
                          {getTipoLabel(incidente.tipo)}
                        </span>
                      </div>

                      {/* Info del Jugador */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {incidente.numero}
                          </div>
                          <div>
                            <p className="text-white font-bold">{incidente.jugador}</p>
                            <p className="text-slate-400 text-sm">{incidente.equipo}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mt-3">
                          <div>
                            <span className="text-slate-400">Minuto: </span>
                            <span className="text-cyan-400 font-semibold">{incidente.minuto}'</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Motivo: </span>
                            <span className="text-white font-semibold">{incidente.motivo}</span>
                          </div>
                          {incidente.multa > 0 && (
                            <div>
                              <span className="text-slate-400">Multa: </span>
                              <span className="text-green-400 font-semibold">₲{incidente.multa.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {incidente.descripcion && (
                          <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-slate-300 text-sm">{incidente.descripcion}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => eliminarIncidente(incidente.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                      title="Eliminar incidente"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón Guardar Reporte */}
        <div className="flex justify-end">
          <button
            onClick={guardarReporte}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
          >
            <Save className="w-6 h-6" />
            Guardar Reporte Final
          </button>
        </div>

        {/* Modal Agregar Incidente */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Registrar Incidente</h3>

              <div className="space-y-6">
                {/* Tipo de Incidente */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-3">
                    Tipo de Incidente *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {tiposIncidente.map(tipo => (
                      <button
                        key={tipo.value}
                        onClick={() => handleTipoChange(tipo.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          incidenteActual.tipo === tipo.value
                            ? `bg-${tipo.color}-500/20 border-${tipo.color}-500 text-${tipo.color}-400`
                            : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="font-semibold text-sm">{tipo.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipo */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Equipo *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setIncidenteActual({ ...incidenteActual, equipo: 'local', jugadorId: '' })}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                        incidenteActual.equipo === 'local'
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                          : 'bg-slate-700/30 border-slate-600 text-slate-400'
                      }`}
                    >
                      {partido.equipoLocal}
                    </button>
                    <button
                      onClick={() => setIncidenteActual({ ...incidenteActual, equipo: 'visitante', jugadorId: '' })}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                        incidenteActual.equipo === 'visitante'
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-slate-700/30 border-slate-600 text-slate-400'
                      }`}
                    >
                      {partido.equipoVisitante}
                    </button>
                  </div>
                </div>

                {/* Jugador */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Jugador *
                  </label>
                  <select
                    value={incidenteActual.jugadorId}
                    onChange={(e) => setIncidenteActual({ ...incidenteActual, jugadorId: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="">Selecciona un jugador</option>
                    {(incidenteActual.equipo === 'local' ? jugadoresLocal : jugadoresVisitante).map(jugador => (
                      <option key={jugador.id} value={jugador.id}>
                        #{jugador.numero} - {jugador.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minuto */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Minuto del Incidente *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={incidenteActual.minuto}
                    onChange={(e) => setIncidenteActual({ ...incidenteActual, minuto: parseInt(e.target.value) })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                {/* Motivo */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Motivo *
                  </label>
                  <select
                    value={incidenteActual.motivo}
                    onChange={(e) => setIncidenteActual({ ...incidenteActual, motivo: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="">Selecciona un motivo</option>
                    {motivosPredefinidos.map(motivo => (
                      <option key={motivo} value={motivo}>{motivo}</option>
                    ))}
                  </select>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Descripción Detallada (Opcional)
                  </label>
                  <textarea
                    value={incidenteActual.descripcion}
                    onChange={(e) => setIncidenteActual({ ...incidenteActual, descripcion: e.target.value })}
                    placeholder="Describe el incidente con más detalle..."
                    rows="3"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  ></textarea>
                </div>

                {/* Multa */}
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Monto de la Multa (₲)
                  </label>
                  <input
                    type="number"
                    value={incidenteActual.multa}
                    onChange={(e) => setIncidenteActual({ ...incidenteActual, multa: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                  <p className="text-slate-400 text-xs mt-1">
                    Multa sugerida: ₲{tiposIncidente.find(t => t.value === incidenteActual.tipo)?.multa.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={agregarIncidente}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
                >
                  Registrar Incidente
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegistroIncidentes;