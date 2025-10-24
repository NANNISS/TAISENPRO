import React, { useState } from 'react';
import { Users, User, Mail, Phone, Upload, CheckCircle, Copy } from 'lucide-react';

const RegistroEquipo = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombreEquipo: '',
    logoEquipo: null,
    nombreCapitan: '',
    emailCapitan: '',
    telefonoCapitan: ''
  });
  const [codigoInvitacion, setCodigoInvitacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generar código único
    const codigo = 'TEAM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setCodigoInvitacion(codigo);
    setStep(2);
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoInvitacion);
    alert('¡Código copiado al portapapeles!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        {step === 1 ? (
          // Formulario de Registro
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Registrar Mi Equipo</h1>
              <p className="text-slate-400">Copa Apertura 2026 - Fútbol 7</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nombre del Equipo */}
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Nombre del Equipo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombreEquipo}
                  onChange={(e) => setFormData({ ...formData, nombreEquipo: e.target.value })}
                  placeholder="Ej: Los Invencibles FC"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              {/* Logo del Equipo */}
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Logo del Equipo (Opcional)
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Click para subir o arrastra tu logo aquí</p>
                  <p className="text-slate-500 text-xs mt-1">PNG, JPG hasta 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, logoEquipo: e.target.files[0] })}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Datos del Capitán</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={formData.nombreCapitan}
                        onChange={(e) => setFormData({ ...formData, nombreCapitan: e.target.value })}
                        placeholder="Ej: Juan Pérez"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={formData.emailCapitan}
                        onChange={(e) => setFormData({ ...formData, emailCapitan: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={formData.telefonoCapitan}
                        onChange={(e) => setFormData({ ...formData, telefonoCapitan: e.target.value })}
                        placeholder="+595 981 234 567"
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
              >
                Registrar Equipo
              </button>

              <p className="text-center text-slate-400 text-sm">
                Al registrarte aceptas los <a href="#" className="text-cyan-400 hover:underline">términos y condiciones</a> del torneo
              </p>
            </form>
          </div>
        ) : (
          // Confirmación y Código de Invitación
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">¡Equipo Registrado!</h1>
              <p className="text-slate-400">Tu equipo ha sido inscrito exitosamente</p>
            </div>

            <div className="bg-slate-700/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Detalles del Equipo</h3>
              <div className="space-y-2 text-slate-300">
                <p><span className="text-slate-400">Nombre:</span> <span className="font-semibold">{formData.nombreEquipo}</span></p>
                <p><span className="text-slate-400">Capitán:</span> <span className="font-semibold">{formData.nombreCapitan}</span></p>
                <p><span className="text-slate-400">Email:</span> <span className="font-semibold">{formData.emailCapitan}</span></p>
                <p><span className="text-slate-400">Teléfono:</span> <span className="font-semibold">{formData.telefonoCapitan}</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Código de Invitación para Jugadores</h3>
              <p className="text-slate-300 text-sm mb-4">
                Comparte este código con tus jugadores para que se unan al equipo:
              </p>
              
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 font-mono text-xl text-cyan-400 font-bold text-center">
                  {codigoInvitacion}
                </div>
                <button
                  onClick={copiarCodigo}
                  className="px-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all">
                Ir al Panel de Mi Equipo
              </button>
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-all">
                Descargar Reglamento (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroEquipo;