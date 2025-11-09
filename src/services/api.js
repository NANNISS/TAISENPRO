const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper para hacer peticiones
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================================
// TORNEOS
// ============================================
export const torneosAPI = {
  getAll: () => fetchAPI('/torneos'),
  getById: (id) => fetchAPI(`/torneos/${id}`),
  create: (data) => fetchAPI('/torneos', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ============================================
// EQUIPOS
// ============================================
export const equiposAPI = {
  getAll: (torneoId) => fetchAPI(`/equipos${torneoId ? `?torneo_id=${torneoId}` : ''}`),
  getById: (id) => fetchAPI(`/equipos/${id}`),
  getByCodigo: (codigo) => fetchAPI(`/equipos/codigo/${codigo}`),
  create: (data) => fetchAPI('/equipos', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ============================================
// JUGADORES
// ============================================
export const jugadoresAPI = {
  getAll: (equipoId) => fetchAPI(`/jugadores${equipoId ? `?equipo_id=${equipoId}` : ''}`),
  create: (data) => fetchAPI('/jugadores', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ============================================
// PARTIDOS
// ============================================
export const partidosAPI = {
  getAll: (torneoId) => fetchAPI(`/partidos${torneoId ? `?torneo_id=${torneoId}` : ''}`),
  create: (data) => fetchAPI('/partidos', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchAPI(`/partidos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
};

// ============================================
// GOLES
// ============================================
export const golesAPI = {
  getByPartido: (partidoId) => fetchAPI(`/eventos-gol/${partidoId}`),
  create: (data) => fetchAPI('/eventos-gol', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ============================================
// SANCIONES
// ============================================
export const sancionesAPI = {
  getByPartido: (partidoId) => fetchAPI(`/sanciones/${partidoId}`),
  create: (data) => fetchAPI('/sanciones', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ============================================
// CLASIFICACIÓN
// ============================================
export const clasificacionAPI = {
  getByTorneo: (torneoId, grupo) => 
    fetchAPI(`/clasificacion/${torneoId}${grupo ? `?grupo=${grupo}` : ''}`)
};

// ============================================
// LOGIN
// ============================================
export const authAPI = {
  login: (email, password) => fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
};