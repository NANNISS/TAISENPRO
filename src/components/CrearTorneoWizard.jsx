import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Trophy, Users, Layout, Clock, CheckCircle, Save, Loader, AlertTriangle, User } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, addDoc, collection } from 'firebase/firestore';

// --- Global Variables (Provided by Canvas Environment) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
// ---------------------------------------------------------

const CrearTorneoWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    modalidad: '',
    maxEquipos: 16,
    formato: '',
    equiposPorGrupo: 4,
    duracionPartido: 60,
    jugadoresPorEquipo: { min: 7, max: 14 },
    reglasDesempate: 'penales'
  });

  // FIREBASE STATE
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // UI STATE
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  const totalSteps = 5;

  const modalidades = {
    'F5': { nombre: 'Fútbol 5', jugadores: { min: 5, max: 10 }, duracion: 50 },
    'F7': { nombre: 'Fútbol 7', jugadores: { min: 7, max: 14 }, duracion: 60 },
    'F11': { nombre: 'Fútbol 11', jugadores: { min: 11, max: 23 }, duracion: 90 }
  };

  // --- 1. FIREBASE INITIALIZATION AND AUTHENTICATION ---
  useEffect(() => {
    if (Object.keys(firebaseConfig).length === 0) return;

    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);
      setAuth(firebaseAuth);

      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setIsAuthReady(true);
        } else {
          // If no user, sign in using the provided token or anonymously
          if (initialAuthToken) {
            await signInWithCustomToken(firebaseAuth, initialAuthToken);
          } else {
            await signInAnonymously(firebaseAuth);
          }
          // The onAuthStateChanged listener will fire again with the new user.
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase initialization or authentication error:", error);
      setMessage({ type: 'error', text: 'Error al inicializar la autenticación.' });
      setIsAuthReady(true); // Stop blocking even if failed
    }
  }, []);
  // ---------------------------------------------------


  const handleModalidadChange = (mod) => {
    const config = modalidades[mod];
    setFormData({
      ...formData,
      modalidad: mod,
      duracionPartido: config.duracion,
      jugadoresPorEquipo: config.jugadores
    });
  };

  const handleNext = () => {
    // Basic validation before moving to the next step
    if (currentStep === 1 && (!formData.nombre || !formData.fechaInicio || !formData.fechaFin)) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos requeridos en esta sección.' });
      return;
    }
    if (currentStep === 2 && !formData.modalidad) {
      setMessage({ type: 'error', text: 'Por favor, selecciona una Modalidad.' });
      return;
    }
    if (currentStep === 3 && !formData.formato) {
      setMessage({ type: 'error', text: 'Por favor, selecciona un Formato de Clasificación.' });
      return;
    }

    setMessage(null);
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setMessage(null);
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // --- 2. FIREBASE SUBMISSION LOGIC ---
  const handleSubmit = async () => {
    if (!isAuthReady || !db || !userId) {
      setMessage({ type: 'error', text: 'El sistema no está listo para guardar. Intenta de nuevo.' });
      return;
    }

    setIsSaving(true);
    setMessage(null);
    
    // Path: /artifacts/{appId}/users/{userId}/tournaments
    const collectionPath = `artifacts/${appId}/users/${userId}/tournaments`;

    try {
      const docRef = await addDoc(collection(db, collectionPath), {
        ...formData,
        createdAt: new Date(),
        createdBy: userId,
      });

      console.log('Torneo creado exitosamente con ID:', docRef.id);
      setMessage({ type: 'success', text: '¡Torneo creado exitosamente! Ya puedes gestionarlo.' });
      
      // Reset form or navigate, but for now, just show success message
      setFormData({
        nombre: '', fechaInicio: '', fechaFin: '', modalidad: '', maxEquipos: 16, formato: '', equiposPorGrupo: 4, duracionPartido: 60, jugadoresPorEquipo: { min: 7, max: 14 }, reglasDesempate: 'penales'
      });
      setCurrentStep(1); // Go back to step 1
    } catch (error) {
      console.error('Error al crear el torneo en Firestore:', error);
      setMessage({ type: 'error', text: 'Error al guardar el torneo. Revisa la consola para más detalles.' });
    } finally {
      setIsSaving(false);
    }
  };
  // -----------------------------------

  const steps = [
    { number: 1, title: 'Info General', icon: Trophy },
    { number: 2, title: 'Modalidad', icon: Users },
    { number: 3, title: 'Formato', icon: Layout },
    { number: 4, title: 'Reglas', icon: Clock },
    { number: 5, title: 'Confirmar', icon: CheckCircle }
  ];

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center text-white">
          <Loader className="w-6 h-6 animate-spin mr-3" />
          Cargando configuración...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 font-inter">
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Crear Nuevo Torneo</h1>
          <p className="text-slate-400">Configura tu torneo paso a paso</p>
        </div>

        {/* User Info and Status */}
        <div className="flex justify-between items-center mb-6 p-3 bg-slate-700/50 rounded-lg border border-slate-700">
            <div className="flex items-center text-sm text-slate-300">
                <User className="w-4 h-4 mr-2 text-cyan-400" />
                ID de Administrador: 
                <span className="ml-2 font-mono text-xs text-white bg-slate-800 p-1 rounded">
                    {userId || 'Error de autenticación'}
                </span>
            </div>
            {isSaving && (
                <div className="flex items-center text-sm text-cyan-400">
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Guardando...
                </div>
            )}
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-semibold ${
                    currentStep >= step.number ? 'text-white' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Box */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-300' : 'bg-red-500/10 border border-red-500/50 text-red-300'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            <p className="font-medium text-sm">{message.text}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          
          {/* Paso 1: Información General */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Información General</h2>
              
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Nombre del Torneo *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Copa Apertura 2026"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Fecha de Finalización *
                  </label>
                  <input
                    type="date"
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Modalidad */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Modalidad del Torneo</h2>
              
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-4">
                  Selecciona la Modalidad *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(modalidades).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleModalidadChange(key)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.modalidad === key
                          ? 'border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/50'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">{key}</div>
                        <div className="text-sm text-slate-300 font-semibold">{value.nombre}</div>
                        <div className="text-xs text-slate-400 mt-2">
                          {value.jugadores.min}-{value.jugadores.max} jugadores
                        </div>
                        <div className="text-xs text-slate-400">
                          {value.duracion} min por partido
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Número Máximo de Equipos
                </label>
                <select
                  value={formData.maxEquipos}
                  onChange={(e) => setFormData({ ...formData, maxEquipos: parseInt(e.target.value) })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                >
                  <option value={8}>8 equipos</option>
                  <option value={16}>16 equipos</option>
                  <option value={32}>32 equipos</option>
                  <option value={64}>64 equipos</option>
                </select>
              </div>
            </div>
          )}

          {/* Paso 3: Formato */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Formato de Clasificación</h2>
              
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-4">
                  Tipo de Formato *
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'grupos', label: 'Fase de Grupos + Eliminatorias', desc: 'Grupos clasificatorios seguidos de octavos, cuartos, etc.' },
                    { value: 'eliminacion', label: 'Eliminación Directa', desc: 'Un solo partido por ronda, el perdedor queda eliminado' },
                    { value: 'todos-contra-todos', label: 'Todos contra Todos', desc: 'Cada equipo juega contra todos los demás' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, formato: option.value })}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        formData.formato === option.value
                          ? 'border-cyan-500 bg-cyan-500/20'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-semibold text-white">{option.label}</div>
                      <div className="text-sm text-slate-400 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.formato === 'grupos' && (
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Equipos por Grupo
                  </label>
                  <select
                    value={formData.equiposPorGrupo}
                    onChange={(e) => setFormData({ ...formData, equiposPorGrupo: parseInt(e.target.value) })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value={3}>3 equipos</option>
                    <option value={4}>4 equipos</option>
                    <option value={5}>5 equipos</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Paso 4: Reglas de Juego */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Reglas del Partido</h2>
              
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Duración del Partido (minutos totales)
                </label>
                <input
                  type="number"
                  value={formData.duracionPartido}
                  onChange={(e) => setFormData({ ...formData, duracionPartido: parseInt(e.target.value) })}
                  min={20}
                  max={120}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Se divide en 2 tiempos de {formData.duracionPartido / 2} minutos cada uno
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Jugadores Mínimos
                  </label>
                  <input
                    type="number"
                    value={formData.jugadoresPorEquipo.min}
                    onChange={(e) => setFormData({
                      ...formData,
                      jugadoresPorEquipo: { ...formData.jugadoresPorEquipo, min: parseInt(e.target.value) }
                    })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Jugadores Máximos
                  </label>
                  <input
                    type="number"
                    value={formData.jugadoresPorEquipo.max}
                    onChange={(e) => setFormData({
                      ...formData,
                      jugadoresPorEquipo: { ...formData.jugadoresPorEquipo, max: parseInt(e.target.value) }
                    })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-4">
                  Reglas de Desempate (Fase Eliminatoria)
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'penales', label: 'Penales Directos', desc: 'Si termina empatado, se define por penales' },
                    { value: 'tiempo-extra', label: 'Tiempo Extra + Penales', desc: 'Se juegan 2 tiempos extra de 15 min, luego penales' },
                    { value: 'gol-oro', label: 'Gol de Oro', desc: 'Primer gol en tiempo extra gana el partido' }
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, reglasDesempate: option.value })}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        formData.reglasDesempate === option.value
                          ? 'border-cyan-500 bg-cyan-500/20'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-semibold text-white">{option.label}</div>
                      <div className="text-sm text-slate-400 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Paso 5: Resumen */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen del Torneo</h2>
              
              <div className="bg-slate-700/30 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Nombre</p>
                    <p className="text-white font-semibold">{formData.nombre || 'Sin nombre'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Modalidad</p>
                    <p className="text-white font-semibold">{modalidades[formData.modalidad]?.nombre || 'No seleccionada'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Fecha Inicio</p>
                    <p className="text-white font-semibold">{formData.fechaInicio || 'No definida'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Fecha Fin</p>
                    <p className="text-white font-semibold">{formData.fechaFin || 'No definida'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Equipos</p>
                    <p className="text-white font-semibold">{formData.maxEquipos}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Formato</p>
                    <p className="text-white font-semibold capitalize">{formData.formato || 'No definido'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Duración</p>
                    <p className="text-white font-semibold">{formData.duracionPartido} minutos</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Jugadores</p>
                    <p className="text-white font-semibold">{formData.jugadoresPorEquipo.min} - {formData.jugadoresPorEquipo.max}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-300 font-semibold">Todo listo para crear el torneo</p>
                  <p className="text-green-400 text-sm mt-1">Revisa que toda la información sea correcta antes de confirmar</p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-cyan-500/50 disabled:opacity-50"
              >
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSaving || !formData.nombre || !formData.modalidad || !formData.formato} // Disable if critical fields are missing or saving
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-green-500/50 disabled:opacity-50 disabled:bg-slate-700"
              >
                {isSaving ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Guardando...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        Crear Torneo
                    </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearTorneoWizard;