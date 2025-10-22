// ./Javascript/login.js

// 1. Esperamos a que todo el HTML se cargue para empezar a trabajar.
document.addEventListener('DOMContentLoaded', () => {

    // 2. Buscamos el formulario de login en el HTML por su id.
    const loginForm = document.getElementById('login-form');

    // 3. Le decimos al formulario que esté atento a cuando el usuario intente "enviar" los datos.
    loginForm.addEventListener('submit', (evento) => {
        
        // 4. Evitamos que la página se recargue, que es lo que hacen los formularios por defecto.
        evento.preventDefault();

        // 5. Buscamos los campos de usuario y contraseña y el párrafo para mensajes de error.
        const usuarioInput = document.getElementById('usuario');
        const passwordInput = document.getElementById('password');
        const errorMensaje = document.getElementById('error-mensaje');

        // 6. Obtenemos el texto que el usuario escribió en los campos.
        const usuario = usuarioInput.value;
        const password = passwordInput.value;

        
        // 7. Comparamos si el usuario y la contraseña son los correctos.

        if (usuario === 'admin' && password === 'admin123') {
            
            // ¡ÉXITO! El usuario es correcto.
            
            // 8. Guardamos una "llave" en la memoria del navegador (sessionStorage)
            sessionStorage.setItem('isAdmin', 'true');

            // 9. Le damos la orden al navegador de ir a la página de profesionales.
            //    ¡Esta es la redirección!
            window.location.href = 'gestion-medicos.html';

        } else {
            
            // ¡FALLO! Los datos son incorrectos.
            
            // 10. Mostramos un mensaje de error al usuario.
            errorMensaje.textContent = 'Usuario o contraseña incorrectos.';

            // Opcional: Limpiar el campo de contraseña para que lo intente de nuevo.
            passwordInput.value = '';
        }
    });
});