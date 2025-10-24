import React from 'react';
import { Calendar, MapPin, Users, Trophy, DollarSign, Clock, ChevronRight, CheckCircle } from 'lucide-react';

const LandingTorneo = () => {
  // Datos de ejemplo del torneo (vendrían de la BD)
  const torneo = {
    nombre: 'Copa Apertura 2026',
    modalidad: 'Fútbol 7',
    fechaInicio: '15 de Octubre, 2026',
    fechaFin: '30 de Noviembre, 2026',
    ubicacion: 'Complejo Deportivo Central',
    equiposMax: 16,
    equiposInscritos: 8,
    premio: '$5,000',
    inscripcion: 'Gratuita'
  };

  const beneficios = [
    'Canchas de césped sintético premium',
    'Arbitraje profesional certificado',
    'Cobertura fotográfica y video',
    'Estadísticas en tiempo real',
    'Asistencia médica en cada jornada',
    'Trofeos para campeón y subcampeón'
  ];

  const testimonios = [
    {
      nombre: 'Carlos Méndez',
      equipo: 'FC Invictos',
      texto: 'La mejor organización que hemos tenido. Todo impecable, desde las canchas hasta los árbitros.'
    },
    {
      nombre: 'Ana Torres',
      equipo: 'Las Guerreras',
      texto: 'Nos encantó poder seguir los resultados en vivo. La plataforma es súper fácil de usar.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header con info del torneo */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TAISENPRO</span>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-all">
              Inscribir Mi Equipo
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-bold mb-4">
              🔥 INSCRIPCIONES ABIERTAS
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              {torneo.nombre}
            </h1>
            <p className="text-2xl text-cyan-400 font-bold mb-6">{torneo.modalidad}</p>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              El torneo amateur más grande de la región. ¡Inscribe tu equipo antes de que se agoten los cupos!
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <Calendar className="w-8 h-8 text-cyan-400 mb-3" />
              <div className="text-sm text-slate-400">Fechas</div>
              <div className="text-white font-bold">{torneo.fechaInicio}</div>
              <div className="text-slate-300 text-sm">al {torneo.fechaFin}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <MapPin className="w-8 h-8 text-cyan-400 mb-3" />
              <div className="text-sm text-slate-400">Ubicación</div>
              <div className="text-white font-bold">{torneo.ubicacion}</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <Users className="w-8 h-8 text-cyan-400 mb-3" />
              <div className="text-sm text-slate-400">Cupos</div>
              <div className="text-white font-bold">{torneo.equiposInscritos} / {torneo.equiposMax} equipos</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: `${(torneo.equiposInscritos / torneo.equiposMax) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para competir?</h2>
            <p className="text-slate-300 mb-6">
              Inscripción: <span className="text-2xl font-bold text-green-400">{torneo.inscripcion}</span>
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg inline-flex items-center gap-2">
              Inscribir Mi Equipo Ahora
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">¿Qué Incluye?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beneficios.map((beneficio, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-slate-300">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premio */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Premio en Efectivo</h2>
          <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            {torneo.premio}
          </div>
          <p className="text-slate-300">Para el equipo campeón + Trofeos y medallas</p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Lo Que Dicen Nuestros Capitanes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonios.map((test, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <p className="text-slate-300 mb-4 italic">"{test.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {test.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{test.nombre}</div>
                    <div className="text-sm text-slate-400">Capitán - {test.equipo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">¡No Te Quedes Fuera!</h2>
          <p className="text-xl text-slate-300 mb-8">
            Solo quedan {torneo.equiposMax - torneo.equiposInscritos} cupos disponibles
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg">
            Inscribir Mi Equipo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>Organizado por TAISENPRO © 2025</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition-colors">Reglamento</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingTorneo;