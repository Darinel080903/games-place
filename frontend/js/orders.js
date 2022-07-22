const gamesbody = document.getElementById('gamesbody');
const user= JSON.parse(localStorage.getItem('userlogged'));
var total = 0;

const buy = document.getElementById('buy');

fetch('http://localhost:4000/api/orders/user/'+user.id)
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {
        
            console.log(game);

            if(game.status != 'Disponible'){

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
                <div class="  text-end">
                    <p style="color:red;">Rentado</p>
                </div>
            </div>
            `;

            }
            
        });
        
    })


