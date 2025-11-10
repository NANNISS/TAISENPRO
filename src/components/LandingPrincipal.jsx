import React from 'react';
import { Trophy, Users, Calendar, Target, ArrowRight, CheckCircle, Zap, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPrincipal = () => {
  const navigate = useNavigate();

  const handleCreateTournament = () => {
    navigate('/login-admin');
  };

  const deportes = [
    {
      id: 1,
      nombre: 'Fútbol',
      icono: '⚽',
      descripcion: 'Torneos de Fútbol 5, 7 y 11',
      activo: true

    },
    {
      id: 2,
      nombre: 'Basketball',
      icono: '🏀',
      descripcion: 'Próximamente',
      activo: false
    },
    {
      id: 3,
      nombre: 'Volleyball',
      icono: '🏐',
      descripcion: 'Próximamente',
      activo: false
    }
  ];

  const caracteristicas = [
    {
      icono: <Calendar className="w-8 h-8" />,
      titulo: 'Gestión Automatizada',
      descripcion: 'Sistema completo de sorteos, calendarios y gestión de partidos'
    },
    {
      icono: <Users className="w-8 h-8" />,
      titulo: 'Registro Fácil',
      descripcion: 'Inscripción de equipos y jugadores en minutos'
    },
    {
      icono: <Trophy className="w-8 h-8" />,
      titulo: 'Marcador EN VIVO',
      descripcion: 'Seguimiento en tiempo real de todos los partidos'
    },
    {
      icono: <Target className="w-8 h-8" />,
      titulo: 'Estadísticas Completas',
      descripcion: 'Goles, asistencias, tarjetas y más'
    },
    {
      icono: <Shield className="w-8 h-8" />,
      titulo: 'Control de Árbitros',
      descripcion: 'Panel exclusivo para registro de incidentes'
    },
    {
      icono: <Award className="w-8 h-8" />,
      titulo: 'Tablas y Clasificación',
      descripcion: 'Actualización automática en tiempo real'
    }
  ];

  const planes = [
    {
      nombre: 'Básico',
      precio: 'Gratis',
      descripcion: 'Ideal para torneos pequeños',
      caracteristicas: [
        'Hasta 8 equipos',
        'Registro de equipos',
        'Marcador básico',
        'Tabla de clasificación',
        'Soporte por email'
      ],
      destacado: false
    },
    {
      nombre: 'Pro',
      precio: '$99',
      descripcion: 'Para torneos profesionales',
      caracteristicas: [
        'Equipos ilimitados',
        'Marcador EN VIVO',
        'Estadísticas avanzadas',
        'Panel de árbitros',
        'Landing personalizada',
        'Soporte prioritario 24/7'
      ],
      destacado: true
    },
    {
      nombre: 'Enterprise',
      precio: 'Contactar',
      descripcion: 'Para organizaciones grandes',
      caracteristicas: [
        'Todo de Pro +',
        'Múltiples torneos',
        'API personalizada',
        'White label',
        'Consultoría dedicada',
        'Integración personalizada'
      ],
      destacado: false
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm">Plataforma #1 en Gestión de Torneos</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Organiza Torneos <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Como un Profesional
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              La plataforma más completa para gestionar torneos deportivos.
              Desde la inscripción hasta las estadísticas finales, todo en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCreateTournament} // 👈 ¡AGREGA ESTO!
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 group">
                Crear Mi Torneo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all">
                Ver Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-cyan-400 mb-2">500+</p>
              <p className="text-slate-400">Torneos Creados</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-green-400 mb-2">10K+</p>
              <p className="text-slate-400">Equipos Registrados</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-yellow-400 mb-2">50K+</p>
              <p className="text-slate-400">Jugadores Activos</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-purple-400 mb-2">99.9%</p>
              <p className="text-slate-400">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deportes Disponibles */}
<div className="max-w-7xl mx-auto px-4 py-20">
    {/* ... (Títulos y subtítulos) ... */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deportes.map(deporte => (
            // APLICACIÓN DEL BOTÓN y onClick AQUÍ:
            <button
                key={deporte.id}
                disabled={!deporte.activo}
                // Si está activo, asigna la función de navegación; si no, asigna null.
                onClick={deporte.activo ? handleCreateTournament : null} 
                className={`p-8 rounded-2xl border transition-all ${
                    deporte.activo
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50 hover:scale-105 cursor-pointer'
                        : 'bg-slate-800/30 border-slate-700/50 opacity-50 cursor-not-allowed'
                }`}
            >
                <div className="text-6xl mb-4">{deporte.icono}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{deporte.nombre}</h3>
                <p className="text-slate-400">{deporte.descripcion}</p>
                {deporte.activo && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-cyan-400">
                        <span className="font-semibold">Disponible</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                )}
            </button>
        ))}
    </div>
</div>

      {/* Características */}
      <div className="bg-slate-800/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Todo lo que Necesitas</h2>
            <p className="text-slate-400 text-lg">Herramientas profesionales para gestionar tu torneo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caracteristicas.map((feat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/80 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {feat.icono}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.titulo}</h3>
                <p className="text-slate-400">{feat.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Planes */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Planes y Precios</h2>
          <p className="text-slate-400 text-lg">Elige el plan perfecto para tu torneo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planes.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${plan.destacado
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 scale-105'
                : 'bg-slate-800/50 border border-slate-700/50'
                }`}
            >
              {plan.destacado && (
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold py-1 px-4 rounded-full inline-block mb-4">
                  Más Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.nombre}</h3>
              <p className="text-slate-400 mb-4">{plan.descripcion}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.precio}</span>
                {plan.precio !== 'Contactar' && plan.precio !== 'Gratis' && (
                  <span className="text-slate-400">/torneo</span>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {plan.caracteristicas.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={plan.precio !== 'Contactar' ? handleCreateTournament : null}
                className={`w-full py-3 rounded-lg font-bold transition-all ${plan.destacado
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
                {plan.precio === 'Contactar' ? 'Contactar Ventas' : 'Comenzar Ahora'}
              </button> 
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-y border-cyan-500/30">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para Organizar tu Torneo?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Únete a cientos de organizadores que ya confían en TAISENPRO
          </p>
          <button
            onClick={handleCreateTournament}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all shadow-lg text-lg flex items-center justify-center gap-2 mx-auto group">
            Crear Torneo Gratis
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">TAISENPRO</h3>
              <p className="text-slate-400 text-sm">
                La plataforma más completa para gestión de torneos deportivos.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 TAISENPRO. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPrincipal;