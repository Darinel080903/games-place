const login = document.getElementById('login');

login.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:4000/api/users')
    .then(res => res.json())
    .then(data => {
        data.forEach(user =>  {
            if(user.email === email && user.password === password) {
                localStorage.setItem('user', JSON.stringify(user));

                console.log(user);

                localStorage.setItem('userPassword', user.password);

                errors.innerHTML = '';

                if(user.is_admin) {
                    window.location.href = 'registro_juego.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
            else {
                errors.innerHTML = 'Usuario o contraseña incorrectos';
            }
                
        });
    })
})