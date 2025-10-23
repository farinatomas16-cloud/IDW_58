import { inicializarStorage, obtenerMedicos } from './storage.js';
import { agregarMedico, eliminarMedico, modificarMedico } from './medicos.js';
import { mostrarMedicosEnTabla } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarStorage();
  mostrarMedicosEnTabla();

  const formularioMedico = document.getElementById('form-medico');
  const alertContainer = document.getElementById('alertContainer');

  // Función para mostrar alertas Bootstrap
  function mostrarAlerta(mensaje, tipo = 'success') {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${tipo} alert-dismissible fade show mt-3" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    setTimeout(() => alertContainer.innerHTML = '', 3000);
  }

  // Manejar envío del formulario
  formularioMedico.addEventListener('submit', evento => {
    evento.preventDefault();

    const campoNombre = document.getElementById('nombre');
    const campoEspecialidad = document.getElementById('especialidad');

    const nombre = campoNombre.value.trim();
    const especialidad = campoEspecialidad.value.trim();

    if (!nombre || !especialidad) {
      mostrarAlerta('Por favor, complete todos los campos correctamente.', 'warning');
      return;
    }

    if (formularioMedico.dataset.editando === 'true') {
      const idMedico = Number(formularioMedico.dataset.idEditar);
      modificarMedico(idMedico, { nombre, especialidad });
      delete formularioMedico.dataset.editando;
      delete formularioMedico.dataset.idEditar;
      mostrarAlerta('Profesional actualizado correctamente.', 'info');
    } else {
      agregarMedico({ nombre, especialidad });
      mostrarAlerta('Profesional agregado con éxito.', 'success');
    }

    mostrarMedicosEnTabla();
    formularioMedico.reset();
  });

  // Cancelar edición
  const cancelarBtn = document.getElementById('cancelarEdicion');
  if (cancelarBtn) {
    cancelarBtn.addEventListener('click', () => {
      formularioMedico.reset();
      delete formularioMedico.dataset.editando;
      delete formularioMedico.dataset.idEditar;
      cancelarBtn.classList.add('d-none');
      mostrarAlerta('Edición cancelada.', 'secondary');
    });
  }

  // Eliminar médico
  window.borrarMedico = function (id) {
    if (confirm('¿Seguro que querés eliminar este profesional?')) {
      eliminarMedico(id);
      mostrarMedicosEnTabla();
      mostrarAlerta('Profesional eliminado correctamente.', 'danger');
    }
  };

  // Editar médico
  window.editarMedico = function (id) {
    const listaMedicos = obtenerMedicos();
    const medicoSeleccionado = listaMedicos.find(m => m.id === id);
    if (!medicoSeleccionado) return;

    document.getElementById('nombre').value = medicoSeleccionado.nombre;
    document.getElementById('especialidad').value = medicoSeleccionado.especialidad;

    formularioMedico.dataset.editando = 'true';
    formularioMedico.dataset.idEditar = id;

    if (cancelarBtn) cancelarBtn.classList.remove('d-none');
    mostrarAlerta('Editando datos del profesional.', 'primary');
  };
});
