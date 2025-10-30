import React, { useState } from 'react';
import { Users, Award, Star, Shirt, Phone, Mail, Copy, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

const MiEquipo = () => {
  const [equipo, setEquipo] = useState({
    nombre: 'Los Tigres FC',
    logo: null,
    codigoInvitacion: 'TEAM-XYZ123',
    cupos: '11/11',
    capitan: 'Juan Pérez'
  });

  const [jugadores, setJugadores] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      numero: 10,
      posicion: 'Mediocampista',
      esCapitan: true,
      telefono: '+595 981 234 567',
      email: 'juan@email.com',
      estado: 'confirmado'
    },
    {
      id: 2,
      nombre: 'Carlos Gómez',
      numero: 7,
      posicion: 'Delantero',
      esCapitan: false,
      telefono: '+595 982 345 678',
      email: 'carlos@email.com',
      estado: 'confirmado'
    },
    {
      id: 3,
      nombre: 'Luis Torres',
      numero: 9,
      posicion: 'Delantero',
      esCapitan: false,
      telefono: '+595 983 456 789',
      email: 'luis@email.com',
      estado: 'confirmado'
    },
    {
      id: 4,
      nombre: 'Miguel Sánchez',
      numero: 1,
      posicion: 'Portero',
      esCapitan: false,
      telefono: '+595 984 567 890',
      email: 'miguel@email.com',
      estado: 'confirmado'
    },
    {
      id: 5,
      nombre: 'Diego Ramírez',
      numero: 4,
      posicion: 'Defensa',
      esCapitan: false,
      telefono: '+595 985 678 901',
      email: 'diego@email.com',
      estado: 'confirmado'
    },
    {
      id: 6,
      nombre: 'Roberto Silva',
      numero: 6,
      posicion: 'Mediocampista',
      esCapitan: false,
      telefono: '+595 986 789 012',
      email: 'roberto@email.com',
      estado: 'confirmado'
    },
    {
      id: 7,
      nombre: 'Fernando López',
      numero: 8,
      posicion: 'Mediocampista',
      esCapitan: false,
      telefono: '+595 987 890 123',
      email: 'fernando@email.com',
      estado: 'confirmado'
    },
    {
      id: 8,
      nombre: 'Andrés Martínez',
      numero: 11,
      posicion: 'Extremo',
      esCapitan: false,
      telefono: '+595 988 901 234',
      email: 'andres@email.com',
      estado: 'confirmado'
    },
    {
      id: 9,
      nombre: 'Pablo González',
      numero: 5,
      posicion: 'Defensa',
      esCapitan: false,
      telefono: '+595 989 012 345',
      email: 'pablo@email.com',
      estado: 'confirmado'
    },
    {
      id: 10,
      nombre: 'Ricardo Núñez',
      numero: 3,
      posicion: 'Defensa',
      esCapitan: false,
      telefono: '+595 990 123 456',
      email: 'ricardo@email.com',
      estado: 'confirmado'
    },
    {
      id: 11,
      nombre: 'Javier Ruiz',
      numero: 2,
      posicion: 'Defensa',
      esCapitan: false,
      telefono: '+595 991 234 567',
      email: 'javier@email.com',
      estado: 'confirmado'
    }
  ]);

  const [verContactos, setVerContactos] = useState(false);

  const copiarCodigo = () => {
    navigator.clipboard.writeText(equipo.codigoInvitacion);
    alert('¡Código copiado!');
  };

  const copiarLink = () => {
    const link = `${window.location.origin}/unirse-equipo/${equipo.codigoInvitacion}`;
    navigator.clipboard.writeText(link);
    alert('¡Link copiado!');
  };

  const jugadoresPorPosicion = {
    'Portero': jugadores.filter(j => j.posicion === 'Portero'),
    'Defensa': jugadores.filter(j => j.posicion === 'Defensa'),
    'Mediocampista': jugadores.filter(j => j.posicion === 'Mediocampista'),
    'Delantero': jugadores.filter(j => j.posicion === 'Delantero' || j.posicion === 'Extremo')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header del Equipo */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
              <Users className="w-20 h-20 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{equipo.nombre}</h1>
              <div className="flex items-center gap-4 text-slate-300 flex-wrap mb-4">
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Capitán: {equipo.capitan}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Cupos: {equipo.cupos}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg w-fit">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Equipo Completo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Código de Invitación */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-cyan-400" />
            Código de Invitación
          </h3>
          <p className="text-slate-400 mb-4">Comparte este código para invitar más jugadores:</p>
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px] bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 font-mono text-xl text-cyan-400 font-bold text-center">
              {equipo.codigoInvitacion}
            </div>
            <button
              onClick={copiarCodigo}
              className="px-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copiar Código
            </button>
            <button
              onClick={copiarLink}
              className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copiar Link
            </button>
          </div>
        </div>

        {/* Toggle Ver Contactos */}
        <div className="flex justify-end">
          <button
            onClick={() => setVerContactos(!verContactos)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              verContactos
                ? 'bg-cyan-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            {verContactos ? 'Ocultar Contactos' : 'Ver Contactos'}
          </button>
        </div>

        {/* Plantilla por Posición */}
        <div className="space-y-6">
          {Object.entries(jugadoresPorPosicion).map(([posicion, jugadoresPosicion]) => (
            <div key={posicion} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shirt className="w-6 h-6 text-cyan-400" />
                  {posicion}s ({jugadoresPosicion.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jugadoresPosicion.map(jugador => (
                  <div key={jugador.id} className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:bg-slate-700/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                        {jugador.numero}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-white font-bold text-lg">{jugador.nombre}</h3>
                          {jugador.esCapitan && (
                            <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{jugador.posicion}</p>

                        {verContactos && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Phone className="w-4 h-4 text-cyan-400" />
                              <a href={`tel:${jugador.telefono}`} className="hover:text-cyan-400 transition-colors">
                                {jugador.telefono}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                              <Mail className="w-4 h-4 text-cyan-400" />
                              <a href={`mailto:${jugador.email}`} className="hover:text-cyan-400 transition-colors truncate">
                                {jugador.email}
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Confirmado
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas del Equipo */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Estadísticas del Equipo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Partidos</p>
              <p className="text-3xl font-bold text-white">8</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Victorias</p>
              <p className="text-3xl font-bold text-green-400">5</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Empates</p>
              <p className="text-3xl font-bold text-yellow-400">2</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Derrotas</p>
              <p className="text-3xl font-bold text-red-400">1</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MiEquipo;