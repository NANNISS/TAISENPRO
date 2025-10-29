import React, { useState } from 'react';
import { User, Mail, Phone, Lock, CheckCircle, AlertCircle, Loader2, Hash, Zap } from 'lucide-react'; // Agregué Hash y Zap

// --- LÓGICA DE SERVICIO INCLUIDA EN ESTE ARCHIVO PARA EVITAR ERRORES DE RESOLUCIÓN ---
const API_URL = 'http://localhost:3001';

const equipoService = {
  /**
   * Registra un nuevo jugador en un equipo usando un código de invitación.
   * @param {object} datosJugador - Contiene nombre, email, telefono, codigoInvitacion, posicion, numero.
   * @returns {Promise<object>} - Retorna { success, jugador, equipo }
   */
  unirseAEquipo: async (datosJugador) => {
    try {
      // Nota: El servicio debe ser actualizado en el backend para aceptar 'posicion' y 'numero'.
      const response = await fetch(`${API_URL}/jugadores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosJugador)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
// --- FIN LÓGICA DE SERVICIO ---


const RegistroJugadores = () => {
  const [step, setStep] = useState(1); // 1: Formulario, 2: Éxito
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    codigoInvitacion: '',
    posicion: 'Mediocampista', // Valor predeterminado
    numero: ''
  });
  const [equipoUnido, setEquipoUnido] = useState(null);

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

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.codigoInvitacion || !formData.posicion || !formData.numero) {
      setError('Por favor, completa todos los campos obligatorios.');
      setLoading(false);
      return;
    }

    try {
      const resultado = await equipoService.unirseAEquipo(formData);

      if (resultado && resultado.success) {
        setEquipoUnido(resultado.equipo);
        setStep(2); // Pasar al paso de éxito
      } else {
        setError(resultado.error || 'No se pudo unir al equipo. Verifica el código de invitación.');
      }
    } catch (err) {
      console.error('Error de unión:', err);
      const errorMessage = err.message.includes('Failed to fetch') 
          ? 'Error de conexión. Asegúrate de que el servidor (http://localhost:3001) esté funcionando.' 
          : err.message;

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // VISTA DE ÉXITO (Paso 2)
  if (step === 2 && equipoUnido) {
    return (
      <div className="min-h-screen bg-slate-900 p-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl text-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Bienvenido!</h1>
            <p className="text-slate-400">Te has unido exitosamente al equipo **{equipoUnido.nombreEquipo}**.</p>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Tu Rol</h3>
            <div className="space-y-3 text-slate-300">
              <p className="flex justify-between items-center"><span className="text-slate-400">Jugador:</span> <span className="font-semibold text-white">{formData.nombre}</span></p>
              <p className="flex justify-between items-center"><span className="text-slate-400">Posición:</span> <span className="font-semibold text-white">{formData.posicion}</span></p>
              <p className="flex justify-between items-center"><span className="text-slate-400">Número de Camiseta:</span> <span className="font-semibold text-white">{formData.numero}</span></p>
              <p className="flex justify-between items-center"><span className="text-slate-400">Equipo:</span> <span className="font-semibold text-white">{equipoUnido.nombreEquipo}</span></p>
              <p className="flex justify-between items-center"><span className="text-slate-400">Capitán:</span> <span className="font-semibold text-white">{equipoUnido.nombreCapitan}</span></p>
            </div>
          </div>

          <button
            onClick={() => { setStep(1); setFormData({...formData, nombre: '', email: '', telefono: '', codigoInvitacion: '', numero: ''}); }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-xl transition-all"
          >
            Unir Otro Jugador
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
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Unirme a un Equipo</h1>
          <p className="text-slate-400">Ingresa tus datos y el código de invitación.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CAMPO CÓDIGO DE INVITACIÓN */}
          <div className="space-y-4">
            <label htmlFor="codigoInvitacion" className="block text-slate-300 text-sm font-semibold mb-2">Código de Invitación *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
              <input
                id="codigoInvitacion"
                type="text"
                name="codigoInvitacion"
                required
                value={formData.codigoInvitacion}
                onChange={handleChange}
                placeholder="Ej: ABC123XYZ"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 font-mono text-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors"
              />
            </div>
            <p className="text-xs text-slate-500">Pídele este código a tu capitán.</p>
          </div>

          {/* SECCIÓN DATOS DEL JUGADOR */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Mis Datos</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-slate-300 text-sm font-semibold mb-2">Nombre Completo *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre y apellido"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 text-sm font-semibold mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-slate-300 text-sm font-semibold mb-2">Teléfono *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    id="telefono"
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+595 981 234 567"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors"
                  />
                </div>
              </div>
              
              {/* NUEVOS CAMPOS: POSICIÓN Y NÚMERO */}
              <div>
                <label htmlFor="posicion" className="block text-slate-300 text-sm font-semibold mb-2">Posición *</label>
                <div className="relative">
                  <Zap className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" /> {/* Icono de rayo para la posición */}
                  <select
                    id="posicion"
                    name="posicion"
                    required
                    value={formData.posicion}
                    onChange={handleChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors appearance-none"
                  >
                    <option value="Delantero" className="bg-slate-800">Delantero</option>
                    <option value="Mediocampista" className="bg-slate-800">Mediocampista</option>
                    <option value="Defensor" className="bg-slate-800">Defensor</option>
                    <option value="Arquero" className="bg-slate-800">Arquero</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="numero" className="block text-slate-300 text-sm font-semibold mb-2">Número de Camiseta *</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" /> {/* Icono de numeral */}
                  <input
                    id="numero"
                    type="number"
                    name="numero"
                    required
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Ej: 10"
                    min="1"
                    max="99"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-colors"
                  />
                </div>
              </div>
              {/* FIN NUEVOS CAMPOS */}
            </div>
          </div>

          {/* BOTÓN DE ENVÍO */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Uniéndome...
              </>
            ) : (
              'Unirme al Equipo Ahora'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroJugadores;
