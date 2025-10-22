
const profesionales = [
    { id: 1, nombre: "Dr. Ana Pérez", especialidad: "Cardiología", horarios: ["09:00", "09:30", "11:00"] },
    { id: 2, nombre: "Dr. Carlos García", especialidad: "Ginecologia", horarios: ["14:00", "14:30", "15:00", "16:15"] },
    { id: 3, nombre: "Dra. Laura Martínez", especialidad: "Pediatria", horarios: ["08:30", "09:00", "10:30"] },
    { id: 4, nombre: "Dr. Juan Gómez", especialidad: "Cardiología", horarios: ["10:00", "11:30", "12:00"] }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('profesionales-container');
    const modalElement = document.getElementById('modal-horarios');
    const modal = new bootstrap.Modal(modalElement); 

    //  Función para mostrar los profesionales
    function mostrarProfesionales(listaProfesionales) {
        container.innerHTML = ''; 
        listaProfesionales.forEach(profesional => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.innerHTML = `
                <div class="card card-profesional h-100">
                    <div class="card-body text-center">
                        <h5 class="card-title">${profesional.nombre}</h5>
                        <p class="card-text text-muted">${profesional.especialidad}</p>
                    </div>
                </div>
            `;
            // Añadimos el evento para que al hacer clic nos muestre el modal
            card.querySelector('.card-profesional').addEventListener('click', () => {
                mostrarHorarios(profesional);
            });
            container.appendChild(card);
        });
    }

    // Función para mostrar los horarios en el modal
    function mostrarHorarios(profesional) {
        document.getElementById('modal-profesional-nombre').textContent = profesional.nombre;
        const horariosContainer = document.getElementById('modal-horarios-disponibles');
        horariosContainer.innerHTML = ''; 
        
        if (profesional.horarios.length > 0) {
            profesional.horarios.forEach(hora => {
                horariosContainer.innerHTML += `<a href="#" class="list-group-item list-group-item-action">${hora}</a>`;
            });
        } else {
            horariosContainer.innerHTML = '<p class="text-center">No hay horarios disponibles.</p>';
        }
        
        modal.show(); // Mostramos el modal
    }

    // Botones de filtro 
    const botonesFiltro = document.querySelectorAll('#filtros-especialidad button');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            const especialidad = boton.getAttribute('data-especialidad');
            
            // Actualizamos el estilo del botón activo
            botonesFiltro.forEach(b => b.classList.replace('btn-primary', 'btn-outline-primary'));
            boton.classList.replace('btn-outline-primary', 'btn-primary');

            if (especialidad === 'todos') {
                mostrarProfesionales(profesionales); 
            } else {
                const profesionalesFiltrados = profesionales.filter(p => p.especialidad === especialidad);
                mostrarProfesionales(profesionalesFiltrados); // Mostramos solo los filtrados por especialidad
            }
        });
    });

    // --- Carga inicial: mostramos todos los profesionales al cargar la página ---
    mostrarProfesionales(profesionales);
});