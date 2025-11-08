// Verifica si el usuario esta logeado mediante sessionStorage
const token = sessionStorage.getItem('token'); 
if (!token) {
  alert('Acceso restringido. Iniciá sesión primero.');
  window.location.href = 'login.html';
}

// Función para listar usuarios
function listarUsuarios() {
  fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('userList');
      container.innerHTML = '';

      data.users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('user-card');
        div.innerHTML = `
          <p><strong>${user.firstName} ${user.lastName}</strong></p>
          <p>Email: ${user.email}</p>
          <p>Empresa: ${user.company.name}</p>
          <img src="${user.image}" alt="Foto de ${user.firstName}" width="100">
          <button onclick="editarUsuario(${user.id})">Editar</button>
          <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
        `;
        container.appendChild(div);
      });
    });
}

// Función para crear un nuevo usuario
function crearUsuario() {
  const nuevoUsuario = {
    firstName: 'Nuevo',
    lastName: 'Usuario',
    email: 'nuevo@ejemplo.com'
  };

  fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoUsuario)
  })
  .then(res => res.json())
  .then(data => {
    alert('Usuario creado con ID: ' + data.id);
    listarUsuarios();
  });
}

// Función para editar un usuario
function editarUsuario(id) {
  const cambios = {
    lastName: 'Modificado'
  };

  fetch(`https://dummyjson.com/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios)
  })
  .then(res => res.json())
  .then(data => {
    alert('Usuario actualizado: ' + data.lastName);
    listarUsuarios();
  });
}

// Función para eliminar un usuario
function eliminarUsuario(id) {
  fetch(`https://dummyjson.com/users/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    alert('Usuario eliminado: ' + data.id);
    listarUsuarios();
  });
}

// Ejecutamos la carga inicial
listarUsuarios();
