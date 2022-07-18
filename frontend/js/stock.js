const games = document.getElementById('games');

fetch('http://localhost:4000/api/games')
    .then(response => response.json())
    .then(data => {
        data.forEach(game => {
            
            games.innerHTML += `
            <tr>
                    <th scope="row">${data.indexOf(game) + 1}</th>
                    <td>${game.title}</td>
                    <td><img src="" alt=""><img src="${game.image}" width="100px"></td>
                    <td>${game.id}</td>
                    <td>${game.stock}</td>
                    <td>
                        <input type="number" value="${game.stock}" class="form-control-sm w-25 d-flex">
                    </td>
                </tr>
            `
        });
    });

//if stock row is modified, update the stock in the database
