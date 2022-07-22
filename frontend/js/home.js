let gamecard = document.getElementById('gamecard');

fetch('http://localhost:4000/api/games')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        data.forEach(game => {
            if(game.stock){
              gamecard.innerHTML += `
            <div class="col">
            <div class="card card-border shadow-sm h-100">
              <div class="container-fluid d-flex justify-content-center">
              <a href="product.html?id=${game.id}">
                <img src="${game.image}" alt=""
                  class="bd-placeholder-img card-img-top img-fluid d-flex justify-content-center" >
              </a>
              </div>
              <div class="card-body">
                <p class="card-text text " style=" font-size: 2rem;"><b>${game.title}</b></p>
                <p class="card-text text-muted"><b>PLATAFORMA: </b>${game.platform}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <b class="fs-2 price"><b>$</b>${game.price}.00</b><small> MXN</small>
                  </div>
                  <span class="align-bottom text-muted text-end" id=""> ${game.stock} Disponibles!</span>
                </div>
              </div>
            </div>
          </div>
            `;
            }
            
        });
    })