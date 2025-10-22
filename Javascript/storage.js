// Clave para almacenar médicos en LocalStorage
export const CLAVE_MEDICOS = 'listaMedicos';

/**
 * Inicializa el LocalStorage con médicos por defecto si está vacío.
 */
export function inicializarStorage() {
  if (!localStorage.getItem(CLAVE_MEDICOS)) {
    const medicosPorDefecto = [
      { id: 1, nombre: "Juan López", especialidad: "Cardiología" },
      { id: 2, nombre: "Cecilia Fernandez", especialidad: "Clínica Médica" },
      { id: 3, nombre: "Hugo Gonzales", especialidad: "Ginecología" },
      { id: 4, nombre: "Victoria Rodriguez", especialidad: "Psiquiatría" }
    ];
    localStorage.setItem(CLAVE_MEDICOS, JSON.stringify(medicosPorDefecto));
  }
}

/**
 * Devuelve la lista actual de médicos desde LocalStorage.
 */
export function obtenerMedicos() {
  return JSON.parse(localStorage.getItem(CLAVE_MEDICOS)) || [];
}

/**
 * Guarda una lista actualizada de médicos en LocalStorage.
 * @param {Array} listaActualizada - Lista de médicos.
 */
export function guardarMedicos(listaActualizada) {
  localStorage.setItem(CLAVE_MEDICOS, JSON.stringify(listaActualizada));
}
