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

var amount = null;

addtocart.addEventListener('click', () => {
    if (user.id == null) {
        alert('You must be logged in to add to cart');
    }
    else {
        if (document.getElementById('stock').innerHTML == 0) {
            alert('Out of stock');
        }
        else {
            fetch(`http://localhost:4000/api/orders/user/${user.id}/game/${gameId}`)
                .then(response => response.json())
                .then(data => {
                    //data length
                    console.log(data.length);
                    console.log(document.getElementById('stock').innerHTML);
                   

                    if (data.length < parseInt(document.getElementById('stock').innerHTML)) {
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
                                amount = amount + 1;
                                const toastLiveExample = document.getElementById('added')
                                const toast = new bootstrap.Toast(toastLiveExample)
                                toast.show()
                            })
                            .catch(err => console.log(err))
                    }
                    else {

                        const toastLiveExample = document.getElementById('liveToast')
                        const toast = new bootstrap.Toast(toastLiveExample)
                        toast.show()
                    }
                })


        }
    }
});


