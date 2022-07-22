const games = document.getElementById('games');
const update = document.getElementById('update');
const errors = document.getElementById('errors');
var updated = false;

fetch('http://localhost:4000/api/orders')
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {
            console.log(game);

            if(game.status == 'Rentado'){
                games.innerHTML += `
                <tr class="fs-5">
                        <th scope="row" >${data.indexOf(game) + 1}</th>
                        <td>${game.game_title}</td>
                        <td class="text-center"><img src="${game.image}" class="img-fluid" width="100px"></td>
                        <td id="game_id">${game.unique_id}</td>
                        <td id="stock">${game.email}</td>
                    </tr>
                `;
            }
        });
    })

const verify = document.getElementById('verify');
verify.addEventListener('click', () => {
    const code = document.getElementById('code').value;
    
    fetch(`http://localhost:4000/api/orders/`)
        .then(response => response.json())
        .then(data => {
            data.forEach(game => {
                if (game.unique_id == code) {
                    fetch(`http://localhost:4000/api/orders/detailstatus/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            unique_id: code,
                            status: 'Entregado'
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            location.reload();
                        })
                    }else{
                        errors.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <strong>Error!</strong>
                            El código ingresado no existe.
                        </div>
                        `;
                    }
            })
        })
})