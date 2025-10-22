import { obtenerMedicos } from './storage.js';

/**
 * Muestra la lista de médicos en una tabla HTML.
 */
export function mostrarMedicosEnTabla() {
  const cuerpoTabla = document.getElementById('tabla-medicos');
  cuerpoTabla.innerHTML = '';

  obtenerMedicos().forEach(medico => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarMedico(${medico.id})">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="borrarMedico(${medico.id})">🗑️</button>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}
