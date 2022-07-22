const gamesbody = document.getElementById('gamesbody');
const user= JSON.parse(localStorage.getItem('userlogged'));
var total = 0;

const buy = document.getElementById('buy');

fetch('http://localhost:4000/api/orders/user/'+user.id)
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {
        
            console.log(game);

            if(game.status != 'Rentado'){

            document.getElementById('nogames').style.display = 'none';

            gamesbody.innerHTML += `
            <div class="col-md-2 col-lg-2 col-xl-2 pb-3">
                  <img
                    src="${game.image}"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">${game.game_title}</p>
                  <p><span class="text-muted">Plataforma: </span>${game.platform}</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  
                  
                    
                  
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <p class="mb-0 fs-4">$${game.price}</p>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                </div>
            </div>
            `;

            document.getElementById('total').innerHTML = `
            $${total += parseInt(game.price)}
            `;
            }
            
        });
        
    })


buy.addEventListener('click', () => {
    fetch('http://localhost:4000/api/orders/user/'+user.id)
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {

            console.log(game);
            fetch(`http://localhost:4000/api/games/stock/${game.game_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stock: (game.stock - 1),
                })
            })
                .then(response => response.json())

            fetch(`http://localhost:4000/api/orders/detail/${game.game_in_order_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'Rentado'
                })
            })
            .then(response => response.json())
        })
    })
}
)


