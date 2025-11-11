// Capturamos el evento submit del formulario
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita el envío tradicional

  // Capturamos los datos del formulario
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  console.log('Enviando a DummyJSON:', { username, password });

  // Enviamos los datos a la API pública de DummyJSON
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => {
    if (!res.ok) throw new Error('Usuario o contraseña incorrectos');
    return res.json();
  })
  .then(data => {
    console.log('Respuesta:', data);

    if (data.token) {
      // Guardamos el token de sesión
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data)); // opcional: guardar datos del usuario

      // Redirigimos al panel de administración
      window.location.href = 'admin.html';
    } else {
      alert('No se recibió token de autenticación.');
    }
  })
  .catch(error => {
    console.error('Error en el login:', error);
    alert('Error en el inicio de sesión. Verifique los datos.');
  });
});
