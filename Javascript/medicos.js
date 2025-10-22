import { obtenerMedicos, guardarMedicos } from './storage.js';

/**
 * Obtiene la lista de médicos, inicializando si no existe.
 * @returns {Array} Lista de médicos.
 */
function listaMedicos() {
  return obtenerMedicos() || [];
}

/**
 * Agrega un nuevo médico a la lista.
 * @param {Object} nuevoMedico - Objeto con { nombre, especialidad }.
 * @returns {boolean} true si se agregó correctamente, false si falla.
 */
export function agregarMedico(nuevoMedico) {
  if (!nuevoMedico.nombre || !nuevoMedico.especialidad) {
    alert('Debe ingresar nombre y especialidad del médico');
    return false;
  }

  const lista = listaMedicos();
  nuevoMedico.id = Date.now(); // ID único
  lista.push(nuevoMedico);
  guardarMedicos(lista);
  return true;
}

/**
 * Modifica los datos de un médico existente.
 * @param {number} id - ID del médico a modificar.
 * @param {Object} datosActualizados - Nuevos datos { nombre, especialidad }.
 * @returns {boolean} true si se modificó, false si no existe.
 */
export function modificarMedico(id, datosActualizados) {
  const lista = listaMedicos();
  const index = lista.findIndex(medico => medico.id === id);

  if (index === -1) {
    alert('No se encontró el médico a modificar');
    return false;
  }

  if (!datosActualizados.nombre || !datosActualizados.especialidad) {
    alert('Debe ingresar nombre y especialidad válidos');
    return false;
  }

  lista[index] = { ...lista[index], ...datosActualizados };
  guardarMedicos(lista);
  return true;
}

/**
 * Elimina un médico por su ID.
 * @param {number} id - ID del médico a eliminar.
 * @returns {boolean} true si se eliminó, false si no existe.
 */
export function eliminarMedico(id) {
  const lista = listaMedicos();
  const nuevoListado = lista.filter(medico => medico.id !== id);

  if (nuevoListado.length === lista.length) {
    alert('No se encontró el médico a eliminar');
    return false;
  }

  guardarMedicos(nuevoListado);
  return true;
}

/**
 * Busca médicos por nombre o especialidad (parcial, insensible a mayúsculas).
 * @param {string} texto - Texto a buscar.
 * @returns {Array} Lista de médicos coincidentes.
 */
export function buscarMedicos(texto) {
  const lista = listaMedicos();
  const busqueda = texto.toLowerCase();
  return lista.filter(
    medico =>
      medico.nombre.toLowerCase().includes(busqueda) ||
      medico.especialidad.toLowerCase().includes(busqueda)
  );
}

/**
 * Ordena la lista de médicos.
 * @param {string} campo - 'nombre' o 'especialidad'.
 * @param {string} direccion - 'asc' o 'desc'.
 * @returns {Array} Lista ordenada.
 */
export function ordenarMedicos(campo = 'nombre', direccion = 'asc') {
  const lista = listaMedicos();
  return lista.sort((a, b) => {
    if (a[campo].toLowerCase() < b[campo].toLowerCase()) return direccion === 'asc' ? -1 : 1;
    if (a[campo].toLowerCase() > b[campo].toLowerCase()) return direccion === 'asc' ? 1 : -1;
    return 0;
  });
}
