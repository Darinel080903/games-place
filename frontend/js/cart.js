const gamesbody = document.getElementById('gamesbody');
const user = JSON.parse(localStorage.getItem('userlogged'));
var total = 0;
var rentado = false;

const buy = document.getElementById('buy');

if (user) {
    fetch('http://localhost:4000/api/orders/user/' + user.id)
        .then(response => response.json())
        .then(data => {
            data.forEach(game => {



                if (game.status != 'Rentado') {

                    document.getElementById('nogames').style.display = 'none';

                    gamesbody.innerHTML += `
            <div class="col-md-2 col-lg-2 col-xl-2 pb-3">
                  <img
                    src="${game.image}"
                    class="img-fluid rounded-3" alt="Cotton T-shirt">
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2 fw-bold fs-2">${game.game_title}</p>
                  <p><span class="text-muted">Plataforma: </span>${game.platform}</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  
                  
                    
                  
                </div>
                <div class="col-md-2 col-lg-1 col-xl-2 offset-lg-1">
                  <p class="mb-0 fs-2">$${game.price}</p>
                </div>
               
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 text-end">
                  <button href="" onclick="deleteitem('${game.unique_id}')" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></a>
                </div>
            `;

                    document.getElementById('divbtn').style.display = '';

                    document.getElementById('total').innerHTML = `
            $${total += parseInt(game.price)}
            `;


                }

            });


        })


}

const deleteitem = (uniqueid) => {

    fetch('http://localhost:4000/api/orders/detailitem/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            unique_id: uniqueid
        })
    })
        .then(response => response.json())
        .then(data => {
            location.reload();
        })

}


var stock = null;
buy.addEventListener('click', () => {
    fetch('http://localhost:4000/api/orders/user/' + user.id)
        .then(response => response.json())
        .then(data => {
            fetch(`http://localhost:4000/api/orders/user/${user.id}/game/${data.game_id}`)
                .then(response => response.json())
                .then(data2 => {
                    //data length
                    console.log(data2.length);
                    console.log(data[0].stock);

                    if (data2.length < data[0].stock || data[0].stock === data2.length) {

                        data.forEach(async game => {
                            if (game.status != 'Rentado') {
                                await fetch('http://localhost:4000/api/games/' + game.game_id)
                                    .then(response => response.json())
                                    .then(data => {
                                        // console.log(data);

                                        stock = data[0].stock;

                                        console.log('stock: ' + stock)
                                    })

                                if (stock > 0) {
                                    fetch(`http://localhost:4000/api/games/reduceStock/${game.game_id}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            stock: 1
                                        })
                                    })
                                        .then(res => res.json)
                                        .then(data => {

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
                                                .then(data => {
                                                    rentado = true;
                                                    localStorage.setItem('rentado', rentado);
                                                    location.reload();
                                                })

                                        })

                                   

                                }


                                console.log(data.indexOf(game) + 1);




                            }
                        })
                    }

                    if (data2.length === data[0].stock) {
                        const toastLiveExample = document.getElementById('liveToast')
                        const toast = new bootstrap.Toast(toastLiveExample)
                        toast.show()
                    }



                })
        })
}
)

if(localStorage.getItem('rentado') === true){
    const toastLiveExample = document.getElementById('successbuy')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

