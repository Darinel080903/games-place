const register = document.getElementById('register');
const errors = document.getElementById('errors');
const view = document.getElementById('view');

register.addEventListener('click', (e) => {
    e.preventDefault();

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const address = document.getElementById('address').value;

    switch (true) {
        case first_name === '' || last_name === '' || email === '' || password === '' || password2 === '' || address === '':
            errors.innerHTML = '<div class="alert alert-danger">Por favor rellena todos los campos!</div>';
            break;

        case password !== password2:
            errors.innerHTML = '<div class="alert alert-danger">Las contraseñas no coinciden!</div>';
            break;

        default:
            errors.innerHTML = '';
            fetch('http://localhost:4000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                    address
                })
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json);

                    view.innerHTML = '';
                    view.innerHTML += `<h1>Gracias por registrarte ${first_name}</h1>`;
                    view.innerHTML += `Redireccionando a la pagina de inicio de sesion...`;
                    view.innerHTML += `<div class="progress">
                               <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                               </div>`

                    setTimeout(() => {
                        window.location.href = './login.html';
                    }, 10000);
                })
                .catch(err => console.log(err));
            break;
    }

});