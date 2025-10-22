import { obtenerMedicos, guardarMedicos } from './storage.js';

/**
 * Agrega un nuevo médico a la lista.
 * @param {Object} nuevoMedico - Objeto con nombre y especialidad.
 */
export function agregarMedico(nuevoMedico) {
  const lista = obtenerMedicos();
  nuevoMedico.id = Date.now(); // ID único
  lista.push(nuevoMedico);
  guardarMedicos(lista);
}

/**
 * Modifica los datos de un médico existente.
 * @param {number} id - ID del médico a modificar.
 * @param {Object} datosActualizados - Nuevos datos.
 */
export function modificarMedico(id, datosActualizados) {
  const lista = obtenerMedicos().map(medico =>
    medico.id === id ? { ...medico, ...datosActualizados } : medico
  );
  guardarMedicos(lista);
}

/**
 * Elimina un médico por su ID.
 * @param {number} id - ID del médico a eliminar.
 */
export function eliminarMedico(id) {
  const lista = obtenerMedicos().filter(medico => medico.id !== id);
  guardarMedicos(lista);
}
