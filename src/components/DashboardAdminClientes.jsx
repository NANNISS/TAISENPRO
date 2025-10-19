import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, Plus, BarChart3, Settings, LogOut, Edit2, Trash2, Eye } from 'lucide-react';

const DashboardAdminCliente = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [torneos, setTorneos] = useState([]);
  const [stats, setStats] = useState({
    totalTorneos: 0,
    totalEquipos: 0,
    partidosHoy: 0,
    jugadoresActivos: 0
  });
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminCliente'));
    if (!admin) {
      window.location.href = '/';
      return;
    }
    setAdminData(admin);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const torneosRes = await fetch(`${API_URL}/torneos`);
      const torneosData = await torneosRes.json();
      setTorneos(torneosData);

      const equiposRes = await fetch(`${API_URL}/equipos`);
      const equiposData = await equiposRes.json();

      setStats({
        totalTorneos: torneosData.length,
        totalEquipos: equiposData.length,
        partidosHoy: 5,
        jugadoresActivos: 120
      });

    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminCliente');
    window.location.href = '/';
  };

  const handleCrearTorneo = () => {
    alert('Funcionalidad de crear torneo próximamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">⚽</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TAISENPRO</h1>
              <p className="text-xs text-slate-400">Panel Administrativo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-white">{adminData?.user_name}</p>
              <p className="text-xs text-slate-400">{adminData?.correo}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Torneos Activos', value: stats.totalTorneos, color: 'from-purple-500', icon: Trophy },
            { label: 'Equipos Registrados', value: stats.totalEquipos, color: 'from-cyan-500', icon: Users },
            { label: 'Partidos Hoy', value: stats.partidosHoy, color: 'from-green-500', icon: Calendar },
            { label: 'Jugadores Activos', value: stats.jugadoresActivos, color: 'from-pink-500', icon: BarChart3 }
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${stat.color} to-slate-800 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm font-medium">{stat.label}</p>
                  <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <stat.icon className="w-12 h-12 text-white/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 mb-6">
          <div className="flex gap-2 p-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vista General', icon: BarChart3 },
              { id: 'torneos', label: 'Mis Torneos', icon: Trophy },
              { id: 'configuracion', label: 'Configuración', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Bienvenido, {adminData?.user_name}!</h2>
              <p className="text-slate-400 mb-6">
                Desde aquí puedes gestionar todos tus torneos deportivos, equipos inscritos y partidos programados.
              </p>
              
              <button
                onClick={handleCrearTorneo}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Crear Nuevo Torneo
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {[
                  { accion: 'Nuevo equipo inscrito', detalle: 'Atlético Rayos - Apertura 2026', tiempo: 'Hace 2 horas' },
                  { accion: 'Partido finalizado', detalle: 'Invictos FC 2 - 1 Halcones', tiempo: 'Hace 5 horas' },
                  { accion: 'Torneo creado', detalle: 'Copa Amigos 2026', tiempo: 'Hace 1 día' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{item.accion}</p>
                      <p className="text-sm text-slate-400">{item.detalle}</p>
                    </div>
                    <span className="text-xs text-slate-500">{item.tiempo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'torneos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Mis Torneos</h2>
              <button
                onClick={handleCrearTorneo}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-all"
              >
                <Plus className="w-5 h-5" />
                Nuevo Torneo
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <p className="text-slate-400 mt-4">Cargando torneos...</p>
              </div>
            ) : torneos.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-12 text-center">
                <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No tienes torneos creados</h3>
                <p className="text-slate-400 mb-6">Crea tu primer torneo y comienza a gestionar tus eventos deportivos</p>
                <button
                  onClick={handleCrearTorneo}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-bold transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Crear Mi Primer Torneo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {torneos.map(torneo => (
                  <div key={torneo.id_torneo} className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{torneo.nombre}</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold">
                        ACTIVO
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-slate-400 text-sm">
                        <span className="font-semibold">Modalidad:</span> Fútbol {torneo.modalidad}
                      </p>
                      <p className="text-slate-400 text-sm">
                        <span className="font-semibold">Inicio:</span> {new Date(torneo.fecha_inicio).toLocaleDateString()}
                      </p>
                      <p className="text-slate-400 text-sm">
                        <span className="font-semibold">Duración:</span> {torneo.duracion_partido_min} min por partido
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg font-semibold transition-all">
                        <Eye className="w-4 h-4" />
                        Ver
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg font-semibold transition-all">
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg font-semibold transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Configuración</h2>
            <p className="text-slate-400">Próximamente: Configuración de cuenta y preferencias</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardAdminCliente;