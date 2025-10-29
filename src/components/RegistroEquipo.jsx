import React, { useState } from 'react';
import { Trophy, User, Mail, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// --- LÓGICA DE SERVICIO INCLUIDA EN ESTE ARCHIVO PARA EVITAR ERRORES DE RESOLUCIÓN ---

const equipoService = {
  /**
   * Registra un nuevo equipo y retorna un código de invitación simulado.
   * @param {object} datosEquipo - Contiene nombreEquipo, nombreCapitan, emailCapitan.
   * @returns {Promise<object>} - Retorna { success, equipo, codigoInvitacion, warning }
   */
  registrarEquipo: async (datosEquipo) => {
    // Simulamos la operación de registro sin intentar fetch para evitar errores de red.
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulación de generación de código único. Usamos ABCDEF para la prueba del registro de jugador.
            const codigoInvitacion = 'ABCDEF'; 

            resolve({
                success: true, 
                equipo: { ...datosEquipo, id: Date.now() },
                codigoInvitacion: codigoInvitacion,
                warning: 'Operación simulada: El backend no está conectado. El código de invitación es ABCDEF (cópialo para el registro de jugador).'
            });
        }, 1500);
    });
  },
};
// --- FIN LÓGICA DE SERVICIO ---


const RegistroEquipo = () => {
  const [step, setStep] = useState(1); // 1: Formulario, 2: Éxito
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombreEquipo: '',
    nombreCapitan: '',
    emailCapitan: '',
  });
  const [resultadoRegistro, setResultadoRegistro] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.nombreEquipo || !formData.nombreCapitan || !formData.emailCapitan) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    try {
      const resultado = await equipoService.registrarEquipo(formData);

      if (resultado.success) {
        setResultadoRegistro(resultado);
        setStep(2); // Pasar al paso de éxito
      } else {
        setError(resultado.error || 'No se pudo registrar el equipo.');
      }
    } catch (err) {
        // En este entorno simulado, si hay un error aquí es un error lógico interno
        setError(err.message || 'Ocurrió un error inesperado al simular el registro.');
    } finally {
      setLoading(false);
    }
  };
  
  // VISTA DE ÉXITO (Paso 2)
  if (step === 2 && resultadoRegistro) {
    const copyToClipboard = () => {
        // Usamos document.execCommand('copy') por restricciones del iFrame
        const el = document.createElement('textarea');
        el.value = resultadoRegistro.codigoInvitacion;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        // Usamos alert temporalmente, pero un modal personalizado es mejor en producción.
        window.alert('Código de invitación copiado al portapapeles!');
    };


    return (
      <div className="min-h-screen bg-slate-900 p-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl text-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Equipo Registrado!</h1>
            <p className="text-slate-400">**{resultadoRegistro.equipo.nombreEquipo}** está listo para el torneo.</p>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Código de Invitación</h3>
            <p className="text-slate-300 mb-4">Usa este código para que tus jugadores se unan (cópialo para probar el Registro de Jugador):</p>
            <div className="flex justify-center items-center space-x-3">
                <span className="text-4xl font-mono font-extrabold tracking-widest bg-slate-900 text-yellow-400 p-3 rounded-lg shadow-inner">
                    {resultadoRegistro.codigoInvitacion}
                </span>
                <button
                    onClick={copyToClipboard}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition-colors text-sm font-semibold"
                >
                    Copiar
                </button>
            </div>
            {resultadoRegistro.warning && (
              <div className="mt-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-3 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-300 text-xs text-left">{resultadoRegistro.warning}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
          >
            Registrar Otro Equipo
          </button>
        </div>
      </div>
    );
  }

  // VISTA DE REGISTRO (Paso 1)
  return (
    <div className="min-h-screen bg-slate-900 p-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Registro de Nuevo Equipo</h1>
          <p className="text-slate-400">Completa los datos del equipo y del capitán.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CAMPO NOMBRE DEL EQUIPO */}
          <div>
            <label htmlFor="nombreEquipo" className="block text-slate-300 text-sm font-semibold mb-2">Nombre del Equipo *</label>
            <div className="relative">
              <Zap className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input
                id="nombreEquipo"
                type="text"
                name="nombreEquipo"
                required
                value={formData.nombreEquipo}
                onChange={handleChange}
                placeholder="Ej: Los Dragones FC"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-colors"
              />
            </div>
          </div>
          
          {/* SECCIÓN DATOS DEL CAPITÁN */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Datos del Capitán</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="nombreCapitan" className="block text-slate-300 text-sm font-semibold mb-2">Tu Nombre Completo *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    id="nombreCapitan"
                    type="text"
                    name="nombreCapitan"
                    required
                    value={formData.nombreCapitan}
                    onChange={handleChange}
                    placeholder="Nombre y apellido del capitán"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="emailCapitan" className="block text-slate-300 text-sm font-semibold mb-2">Tu Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    id="emailCapitan"
                    type="email"
                    name="emailCapitan"
                    required
                    value={formData.emailCapitan}
                    onChange={handleChange}
                    placeholder="email@delcapitan.com"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN DE ENVÍO */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-orange-600 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              'Registrar Equipo'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroEquipo;
