const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

console.log(gameId);

fetch(`http://localhost:4000/api/games/${gameId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('title').innerHTML = `<b>${data[0].title}</b>`;
        document.getElementById('game_type').innerHTML = data[0].game_type;
        document.getElementById('price').innerHTML = `$${data[0].price}`;
        document.getElementById('clasification').innerHTML = data[0].clasification;
        document.getElementById('image').src = data[0].image;
        document.getElementById('stock').innerHTML = ` ${data[0].stock}`;
    });