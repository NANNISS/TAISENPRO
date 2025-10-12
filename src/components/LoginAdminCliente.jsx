import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const LoginAdminCliente = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const API_URL = 'http://localhost:3001';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      return false;
    }

    if (!isLogin && !formData.email) {
      setError('El email es obligatorio para registrarse');
      return false;
    }

    if (!isLogin && formData.password !== formData.passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (!isLogin && formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/users`);
      const users = await response.json();

      const adminUser = users.find(u => u.user_name === formData.username && u.id_rol === 1);

      if (!adminUser) {
        setError('Usuario o contraseña incorrectos');
        setLoading(false);
        return;
      }

      if (adminUser.user_passw !== formData.password) {
        setError('Usuario o contraseña incorrectos');
        setLoading(false);
        return;
      }

      setSuccess('¡Login exitoso! Redirigiendo...');
      localStorage.setItem('adminCliente', JSON.stringify({
        id_user: adminUser.id_user,
        user_name: adminUser.user_name,
        correo: adminUser.correo,
        rol: 'ADMIN'
      }));

      setTimeout(() => {
        alert('Redirigiendo a Dashboard Admin (próximamente)');
      }, 1500);

    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const usersResponse = await fetch(`${API_URL}/users`);
      const users = await usersResponse.json();

      if (users.some(u => u.user_name === formData.username)) {
        setError('Este usuario ya existe');
        setLoading(false);
        return;
      }

      if (users.some(u => u.correo === formData.email)) {
        setError('Este email ya está registrado');
        setLoading(false);
        return;
      }

      const newUserResponse = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: formData.username,
          user_passw: formData.password,
          correo: formData.email,
          id_rol: 1
        })
      });

      if (!newUserResponse.ok) {
        throw new Error('Error al crear usuario');
      }

      setSuccess('¡Registro exitoso! Iniciando sesión...');
      localStorage.setItem('adminCliente', JSON.stringify({
        user_name: formData.username,
        correo: formData.email,
        rol: 'ADMIN'
      }));

      setTimeout(() => {
        alert('Redirigiendo a Dashboard Admin (próximamente)');
      }, 1500);

    } catch (err) {
      setError('Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-4">
              <span className="text-2xl font-bold">⚽</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              TAISENPRO
            </h1>
            <p className="text-slate-400 text-sm">Plataforma de Torneos Deportivos</p>
          </div>

          <div className="flex gap-2 mb-8 bg-slate-700/30 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-300 text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-8">
            
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Tu nombre de usuario"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    placeholder="Repite tu contraseña"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  />
                </div>
              </div>
            )}

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-3 rounded-lg transition-all mt-6 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Registrarse'
              )}
            </button>
          </div>

          <p className="text-center text-slate-400 text-xs mt-6">
            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              {isLogin ? 'Registrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          Demo: usuario: <span className="text-cyan-400">admin</span> | clave: <span className="text-cyan-400">admin123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginAdminCliente;