import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Heart, Droplet, AlertCircle, Shirt, Save, Camera, CheckCircle } from 'lucide-react';

const PerfilJugador = () => {
  const [step, setStep] = useState(1);
  const [guardado, setGuardado] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    nombreCompleto: '',
    cedula: '',
    fechaNacimiento: '',
    edad: '',
    telefono: '',
    email: '',
    foto: null,
    
    // Datos deportivos
    posicionPreferida: '',
    numeroCamiseta: '',
    pieHabil: 'Derecho',
    
    // Datos médicos
    tipoSangre: '',
    alergias: '',
    medicamentos: '',
    condicionesMedicas: '',
    contactoEmergencia: '',
    telefonoEmergencia: '',
    seguroMedico: ''
  });

  const posiciones = [
    'Portero',
    'Defensa Central',
    'Lateral Derecho',
    'Lateral Izquierdo',
    'Mediocampista Defensivo',
    'Mediocampista Central',
    'Mediocampista Ofensivo',
    'Extremo Derecho',
    'Extremo Izquierdo',
    'Delantero Centro'
  ];

  const tiposSangre = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const calcularEdad = (fecha) => {
    if (!fecha) return '';
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleFechaNacimiento = (fecha) => {
    setFormData({
      ...formData,
      fechaNacimiento: fecha,
      edad: calcularEdad(fecha)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en BD
    console.log('Datos del jugador:', formData);
    setGuardado(true);
    setTimeout(() => {
      // Redirigir al dashboard del jugador
    }, 2000);
  };

  const siguientePaso = () => {
    if (step < 3) setStep(step + 1);
  };

  const pasoAnterior = () => {
    if (step > 1) setStep(step - 1);
  };

  if (guardado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">¡Perfil Completado!</h2>
          <p className="text-slate-400 mb-6">Tu información ha sido guardada exitosamente</p>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all">
            Ir a Mi Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Completar Mi Perfil</h1>
          <p className="text-slate-400">Por favor completa toda tu información para poder participar</p>
          
          {/* Progress Bar */}
          <div className="mt-6 flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${
                  step >= num ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-700'
                }`}></div>
                <p className={`text-xs mt-1 ${step >= num ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {num === 1 && 'Datos Personales'}
                  {num === 2 && 'Datos Deportivos'}
                  {num === 3 && 'Datos Médicos'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          
          {/* PASO 1: Datos Personales */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-cyan-400" />
                Datos Personales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                    placeholder="Juan Pérez González"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Cédula de Identidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    placeholder="1234567"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Fecha de Nacimiento *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="date"
                      required
                      value={formData.fechaNacimiento}
                      onChange={(e) => handleFechaNacimiento(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                    />
                  </div>
                </div>

                {formData.edad && (
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                      Edad
                    </label>
                    <div className="bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3">
                      <span className="text-white font-bold text-lg">{formData.edad} años</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+595 981 234 567"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Foto del Jugador (Opcional)
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                    <Camera className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">Click para subir tu foto</p>
                    <p className="text-slate-500 text-sm mt-2">JPG, PNG hasta 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: Datos Deportivos */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shirt className="w-6 h-6 text-cyan-400" />
                Datos Deportivos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Posición Preferida *
                  </label>
                  <select
                    required
                    value={formData.posicionPreferida}
                    onChange={(e) => setFormData({ ...formData, posicionPreferida: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="">Selecciona una posición</option>
                    {posiciones.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Número de Camiseta Preferido *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="99"
                    value={formData.numeroCamiseta}
                    onChange={(e) => setFormData({ ...formData, numeroCamiseta: e.target.value })}
                    placeholder="10"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                  <p className="text-slate-500 text-xs mt-1">Del 1 al 99</p>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Pie Hábil *
                  </label>
                  <div className="flex gap-4">
                    {['Derecho', 'Izquierdo', 'Ambos'].map(pie => (
                      <button
                        key={pie}
                        type="button"
                        onClick={() => setFormData({ ...formData, pieHabil: pie })}
                        className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                          formData.pieHabil === pie
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                            : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {pie}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-cyan-400 font-semibold text-sm">Nota importante</p>
                  <p className="text-slate-300 text-sm">El número de camiseta es una preferencia. Si está ocupado, el capitán te asignará otro número.</p>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: Datos Médicos */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Datos Médicos
              </h2>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold text-sm">Información crítica</p>
                  <p className="text-slate-300 text-sm">Estos datos son esenciales para tu seguridad. Sé preciso y honesto.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-red-400" />
                    Tipo de Sangre *
                  </label>
                  <select
                    required
                    value={formData.tipoSangre}
                    onChange={(e) => setFormData({ ...formData, tipoSangre: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  >
                    <option value="">Selecciona tu tipo</option>
                    {tiposSangre.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    ¿Tienes Alergias? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.alergias}
                    onChange={(e) => setFormData({ ...formData, alergias: e.target.value })}
                    placeholder="Escribe 'Ninguna' si no tienes"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Medicamentos que tomas regularmente
                  </label>
                  <textarea
                    value={formData.medicamentos}
                    onChange={(e) => setFormData({ ...formData, medicamentos: e.target.value })}
                    placeholder="Escribe 'Ninguno' si no tomas medicamentos"
                    rows="2"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Condiciones Médicas / Lesiones Previas
                  </label>
                  <textarea
                    value={formData.condicionesMedicas}
                    onChange={(e) => setFormData({ ...formData, condicionesMedicas: e.target.value })}
                    placeholder="Ejemplo: Asma, lesión de rodilla, operaciones previas, etc. Escribe 'Ninguna' si no aplica"
                    rows="3"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  ></textarea>
                </div>

                <div className="md:col-span-2 border-t border-slate-700 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4">Contacto de Emergencia</h3>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Nombre del Contacto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactoEmergencia}
                    onChange={(e) => setFormData({ ...formData, contactoEmergencia: e.target.value })}
                    placeholder="María Pérez (Madre)"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Teléfono de Emergencia *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefonoEmergencia}
                    onChange={(e) => setFormData({ ...formData, telefonoEmergencia: e.target.value })}
                    placeholder="+595 981 234 567"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-semibold mb-2">
                    Seguro Médico (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.seguroMedico}
                    onChange={(e) => setFormData({ ...formData, seguroMedico: e.target.value })}
                    placeholder="Nombre de la compañía y número de póliza"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botones de Navegación */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            {step > 1 && (
              <button
                onClick={pasoAnterior}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
              >
                Anterior
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={siguientePaso}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Guardar Perfil
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerfilJugador;