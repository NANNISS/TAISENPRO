// src/services/equipoService.js

const API_URL = 'http://localhost:3001';

export const equipoService = {
  // Registrar nuevo equipo
  registrarEquipo: async (datosEquipo) => {
    try {
      const response = await fetch(`${API_URL}/equipos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEquipo)
      });

      if (!response.ok) {
        throw new Error('Error al registrar el equipo');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener equipo por código
  obtenerEquipoPorCodigo: async (codigo) => {
    try {
      const response = await fetch(`${API_URL}/equipos/codigo/${codigo}`);
      
      if (!response.ok) {
        throw new Error('Equipo no encontrado');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener todos los equipos
  obtenerEquipos: async () => {
    try {
      const response = await fetch(`${API_URL}/equipos`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};