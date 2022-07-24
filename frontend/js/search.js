const searchbtn = document.getElementById('searchbtn');
const searchinput = document.getElementById('search');
const gamecards = document.getElementById('gamecard');

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const search = encodeURIComponent(searchinput.value);
    
    fetch(`http://localhost:4000/api/games/search/${search}`)
    .then(res => res.json())
    .then(data => {

        console.log(data.data);
        

        gamecards.innerHTML = `
        <div class="col">
            <div class="card card-border shadow-sm ">
              <div class="container-fluid d-flex justify-content-center ">
              <a href="product.html?id=${data.data.id}">

                <img src="${data.data.image}" alt=""
                  class="bd-placeholder-img card-img-top img-fluid card-image rounded-3 mt-3  d-flex justify-content-center" style="">
              </a>
              </div>
              <div class="card-body">
                <p class="card-text text " style=" font-size: 2rem;"><b>${data.data.title}</b></p>
                <p class="card-text text-muted"><b>PLATAFORMA: </b>${data.data.platform}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <b class="fs-2 price"><b>$</b>${data.data.price}.00</b><small> MXN</small>
                  </div>
                  <span class="align-bottom text-muted text-end" id=""> ${data.data.stock} Disponibles!</span>
                </div>
              </div>
            </div>
          </div>
        `;

        if(data.right.data) {
            gamecards.innerHTML += `
            <div class="col">
                <div class="card card-border shadow-sm ">
                  <div class="container-fluid d-flex justify-content-center ">
                  <a href="product.html?id=${data.right.data.id}">

                    <img src="${data.right.data.image}" alt=""
                      class="bd-placeholder-img card-img-top img-fluid card-image rounded-3 mt-3  d-flex justify-content-center" style="">
                  </a>
                  </div>
                  <div class="card-body">
                    <p class="card-text text " style=" font-size: 2rem;"><b>${data.right.data.title}</b></p>
                    <p class="card-text text-muted"><b>PLATAFORMA: </b>${data.right.data.platform}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <b class="fs-2 price"><b>$</b>${data.right.data.price}.00</b><small> MXN</small>
                      </div>
                      <span class="align-bottom text-muted text-end" id=""> ${data.right.data.stock} Disponibles!</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
        }

        if(data.left.data) {
            gamecards.innerHTML += `
            <div class="col">
                <div class="card card-border shadow-sm ">
                  <div class="container-fluid d-flex justify-content-center ">
                  <a href="product.html?id=${data.left.data.id}">

                    <img src="${data.left.data.image}" alt=""
                      class="bd-placeholder-img card-img-top img-fluid card-image rounded-3 mt-3  d-flex justify-content-center" style="">
                  </a>
                  </div>
                  <div class="card-body">
                    <p class="card-text text " style=" font-size: 2rem;"><b>${data.left.data.title}</b></p>
                    <p class="card-text text-muted"><b>PLATAFORMA: </b>${data.left.data.platform}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <b class="fs-2 price"><b>$</b>${data.left.data.price}.00</b><small> MXN</small>
                      </div>
                      <span class="align-bottom text-muted text-end" id=""> ${data.left.data.stock} Disponibles!</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
        }

        })
    })

const showGames = (data) => {
    data.forEach(game => {
        if (game.stock) {
          gamecard.innerHTML += `
              <div class="col">
              <div class="card card-border shadow-sm ">
                <div class="container-fluid d-flex justify-content-center ">
                <a href="product.html?id=${game.id}">
  
                  <img src="${game.image}" alt=""
                    class="bd-placeholder-img card-img-top img-fluid card-image rounded-3 mt-3  d-flex justify-content-center" style="">
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
}