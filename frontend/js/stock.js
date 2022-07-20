const games = document.getElementById('games');
const update = document.getElementById('update');
const errors = document.getElementById('errors');
var updated = false;




fetch('http://localhost:4000/api/games')
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {

            games.innerHTML += `
            <tr>
                    <th scope="row">${data.indexOf(game) + 1}</th>
                    <td>${game.title}</td>
                    <td><img src="" alt=""><img src="${game.image}" width="100px"></td>
                    <td id="game_id">${game.id}</td>
                    <td id="stock">${game.stock}</td>
                    <td>
                        <input type="number" id="modifiedStock" value="${game.stock}" class="form-control-sm w-25 d-flex">
                    </td>
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
                    fetch(`http://localhost:4000/api/games/${game.gameId}`, {
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
            //send notification to user 
            localStorage.removeItem('updated');
        }

    });

