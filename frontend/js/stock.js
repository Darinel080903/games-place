const games = document.getElementById('games');
const update = document.getElementById('update');
const errors = document.getElementById('errors');
var updated = false;

fetch('http://localhost:4000/api/games')
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {

            games.innerHTML += `
            <tr class="fs-5">
                    <th scope="row" >${data.indexOf(game) + 1}</th>
                    <td>${game.title}</td>
                    <td class="text-center"><img src="${game.image}" class="img-fluid" width="100px"></td>
                    <td id="game_id">${game.id}</td>
                    <td>${game.platform}</td>
                    <td id="stock">${game.stock}</td>
                    <td>
                        <input type="number" id="modifiedStock" value="${game.stock}" class="form-control d-flex">
                    </td>
                    <td><a href="registro_juego.html?id=${game.id}&edit=true" class="btn btn-primary w-100 btn-sm" id="edit">Editar</a></td> 
                </tr>
            `
        });

        update.addEventListener('click', () => {
            //get all values of id "game_id" and its modified stock value and put it in an array
            const gameIds = document.querySelectorAll('#game_id');
            const modifiedStocks = document.querySelectorAll('#modifiedStock');
            const stock = document.querySelectorAll('#stock');
            const gameIdArray = Array.from(gameIds);
            const modifiedStockArray = Array.from(modifiedStocks);
            const stockArray = Array.from(stock);
            const gameIdAndModifiedStockArray = [];
            for (let i = 0; i < gameIdArray.length; i++) {
                gameIdAndModifiedStockArray.push({
                    gameId: gameIdArray[i].innerHTML,
                    modifiedStock: modifiedStockArray[i].value,
                    stock: stockArray[i].innerHTML
                });
            }
            console.log(gameIdAndModifiedStockArray);
            
            gameIdAndModifiedStockArray.forEach(game => {

                if (game.modifiedStock != game.stock) {
                    fetch(`http://localhost:4000/api/games/stock/${game.gameId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            stock: game.modifiedStock
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        }).catch(err => {
                            console.log(err);
                        }
                        )
                } else {
                    console.log('no change');
                }

            })

            //save variable in local storage
            localStorage.setItem('updated', updated=true);
            //reload page
            window.location.reload();

        })

        if(localStorage.getItem('updated') == 'true'){
            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            localStorage.removeItem('updated');
        }else if(localStorage.getItem('deleted') == 'true'){

            const toastText = document.getElementById('toastText')

            toastText.innerHTML = 'Juego eliminado con exito'

            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample)
            toast.show()
            localStorage.removeItem('deleted');
        }

    });

