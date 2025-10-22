import { inicializarStorage, obtenerMedicos } from './storage.js';
import { agregarMedico, eliminarMedico, modificarMedico } from './medicos.js';
import { mostrarMedicosEnTabla } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarStorage();
  mostrarMedicosEnTabla();

  const formularioMedico = document.getElementById('form-medico');

  formularioMedico.addEventListener('submit', evento => {
    evento.preventDefault();

    const campoNombre = document.getElementById('nombre');
    const campoEspecialidad = document.getElementById('especialidad');

    const nombre = campoNombre.value.trim();
    const especialidad = campoEspecialidad.value.trim();

    if (nombre && especialidad) {
      if (formularioMedico.dataset.editando === 'true') {
        const idMedico = Number(formularioMedico.dataset.idEditar);
        modificarMedico(idMedico, { nombre, especialidad });
        delete formularioMedico.dataset.editando;
        delete formularioMedico.dataset.idEditar;
      } else {
        agregarMedico({ nombre, especialidad });
      }

      mostrarMedicosEnTabla();
      formularioMedico.reset();
    }
  });
});

/**
 * Elimina un médico por su ID.
 * @param {number} id - ID del médico a eliminar.
 */
window.borrarMedico = function(id) {
  eliminarMedico(id);
  mostrarMedicosEnTabla();
};

/**
 * Carga los datos del médico en el formulario para editar.
 * @param {number} id - ID del médico a editar.
 */
window.editarMedico = function(id) {
  const listaMedicos = obtenerMedicos();
  const medicoSeleccionado = listaMedicos.find(m => m.id === id);
  if (!medicoSeleccionado) return;

  document.getElementById('nombre').value = medicoSeleccionado.nombre;
  document.getElementById('especialidad').value = medicoSeleccionado.especialidad;

  const formularioMedico = document.getElementById('form-medico');
  formularioMedico.dataset.editando = 'true';
  formularioMedico.dataset.idEditar = id;
};
