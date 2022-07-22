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
        document.getElementById('platform').innerHTML = `${data[0].platform}`;
    });

const addtocart = document.getElementById('addtocart');
const user = JSON.parse(localStorage.getItem('userlogged'));

console.log(user.id);

addtocart.addEventListener('click', () => {
    if (user.id == null) {
        alert('You must be logged in to add to cart');
    }
    else {
        if (document.getElementById('stock').innerHTML == 0) {
            alert('Out of stock');
        }
        else {

            fetch(`http://localhost:4000/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    game_id: gameId,
                    user_id: user.id,
                    quantity: 1
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert('Juego agregado al carrito');
                })
                .catch(err => console.log(err))
        }
    }
});


