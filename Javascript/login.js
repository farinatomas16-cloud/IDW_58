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
  .then(res => res.json())
  .then(data => {
    console.log('Respuesta:', data);
   if (data.accessToken) {
  sessionStorage.setItem('token', data.accessToken);
  window.location.href = 'admin.html';
}

  })
  .catch(error => {
    console.error('Error en el login:', error);
    alert('Error de conexión');
  });
});
