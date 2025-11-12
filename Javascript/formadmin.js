document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();

  // Validación local
  if (usuario === 'admin' && clave === '12345') {
    sessionStorage.setItem('token', 'admin-token'); // token ficticio
    sessionStorage.setItem('admin', 'true');
    window.location.href = 'profesionales.html' ; // redirige al panel
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});