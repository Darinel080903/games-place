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
                localStorage.removeItem('userlogged');

                userlogged = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    address: user.address,
                    is_admin: user.is_admin
                }

                localStorage.setItem('userlogged', JSON.stringify(userlogged));

                errors.innerHTML = '';

                if(user.is_admin) {
                    window.location.href = 'registro_juego.html';
                } else {
                    window.location.href = 'home.html';
                }
            }
            else {
                errors.innerHTML = 'Usuario o contraseña incorrectos';
            }
                
        });
    })
})