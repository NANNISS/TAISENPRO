import { equiposAPI } from './api';

export const equipoService = {
  registrarEquipo: async (datosEquipo) => {
    try {
      return await equiposAPI.create(datosEquipo);
    } catch (error) {
      console.error('Error al registrar equipo:', error);
      throw error;
    }
  },

  obtenerEquipoPorCodigo: async (codigo) => {
    try {
      return await equiposAPI.getByCodigo(codigo);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  obtenerEquipos: async (torneoId) => {
    try {
      return await equiposAPI.getAll(torneoId);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};