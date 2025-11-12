const medicos = [
  {
    nombre: "Cristian Gómez",
    especialidad: "Cardiología",
    horarios: ["Lunes 9-12", "Miércoles 14-17"],
    turnos: ["10:00", "10:30", "11:00"]
  },
  {
    nombre: "Elisa Pérez",
    especialidad: "Pediatría",
    horarios: ["Martes 8-11", "Jueves 15-18"],
    turnos: ["15:00", "15:30", "16:00"]
  },
  {
    nombre: "Graciela Verdum",
    especialidad: "Dermatología",
    horarios: ["Viernes 10-13"],
    turnos: ["10:00", "10:30", "11:00"]
  },
  {
    nombre: "Juan Lopez",
    especialidad: "Cardologo",
    horarios: ["Viernes 8-13"],
    turnos: ["9:00", "11:30", "12:00"]
  }
];

// Renderiza la tabla según filtros
function renderizarTabla() {
  const filtroEsp = document.getElementById("filtroEspecialidad").value.toLowerCase();
  const filtroNom = document.getElementById("filtroNombre").value.toLowerCase();
  const tabla = document.getElementById("tabla-medicos");
  tabla.innerHTML = "";

  const filtrados = medicos.filter(m =>
    (filtroEsp === "" || m.especialidad.toLowerCase().includes(filtroEsp)) &&
    (filtroNom === "" || m.nombre.toLowerCase().includes(filtroNom))
  );

  filtrados.forEach(medico => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${medico.nombre}</td>
      <td>${medico.especialidad}</td>
      <td><ul>${medico.horarios.map(h => `<li>${h}</li>`).join("")}</ul></td>
      <td>
        <select class="form-select turno-select">
          ${medico.turnos.map(t => `<option>${t}</option>`).join("")}
        </select>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Calcula el valor final con descuento
function calcularTurno() {
  const valorBase = parseFloat(document.getElementById("valorBase").value);
  const descuento = parseFloat(document.getElementById("obraSocial").value);
  const valorFinal = valorBase - (valorBase * descuento / 100);
  document.getElementById("resultado").innerText = `Total con descuento: $${valorFinal}`;
}

// Solicita el turno y muestra resumen
function solicitarTurno() {
  const valorBase = parseFloat(document.getElementById("valorBase").value);
  const descuento = parseFloat(document.getElementById("obraSocial").value);
  const valorFinal = valorBase - (valorBase * descuento / 100);

  const fila = document.querySelector("#tabla-medicos tr");
  if (!fila) {
    document.getElementById("resultado").innerText = "No hay médicos disponibles.";
    return;
  }

  const nombre = fila.children[0].innerText;
  const especialidad = fila.children[1].innerText;
  const horario = fila.children[2].innerText;
  const turno = fila.querySelector("select").value;

  document.getElementById("resultado").innerHTML = `
    <h5>Turno solicitado</h5>
    <p><strong>Médico:</strong> ${nombre}</p>
    <p><strong>Especialidad:</strong> ${especialidad}</p>
    <p><strong>Horario:</strong> ${horario}</p>
    <p><strong>Turno elegido:</strong> ${turno}</p>
    <p><strong>Total con descuento:</strong> $${valorFinal}</p>
  `;
}

// Eventos
document.getElementById("filtroEspecialidad").addEventListener("change", renderizarTabla);
document.getElementById("filtroNombre").addEventListener("input", renderizarTabla);
document.getElementById("btnCalcular").addEventListener("click", calcularTurno);
document.getElementById("btnSolicitar").addEventListener("click", solicitarTurno);

// Inicialización
renderizarTabla();