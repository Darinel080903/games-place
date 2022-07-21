const urlParams = new URLSearchParams(window.location.search);
const edit = urlParams.get('edit');
var deleted = false;
var updated = false;
const buttons = document.getElementById('buttons');

if (edit) {
    const gameId = urlParams.get('id');
    const registerbtn = document.getElementById('registerbtn');
    const cancelbtn = document.getElementById('cancelbtn');

    //hide register button
    registerbtn.style.display = 'none';
    cancelbtn.style.display = 'none';
    buttons.innerHTML += `<button  class="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Eliminar</button>`;
    buttons.innerHTML += `<button  id="updatebtn" class="btn btn-success">Guardar cambios</button>`;
    buttons.innerHTML += `<a type="button" class="btn btn-danger" href="stock.html">Cancelar</a>`;

    fetch(`http://localhost:4000/api/games/${gameId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('title').value = data[0].title;
            document.getElementById('game_type').value = data[0].game_type;
            document.getElementById('price').value = data[0].price;
            document.getElementById('clasification').value = data[0].clasification;
            document.getElementById('stock').value = data[0].stock;
            document.getElementById('platform').value = data[0].platform;
            document.getElementById('image').src = data[0].image;

            document.getElementById('imgdiv').classList.add('img-thumbnail');
            imgdiv.src = data[0].image;


        })
        .catch(err => console.log(err))

    //delete game
    const deletebton = document.getElementById('deletebtn');

    deletebton.addEventListener('click', () => {
        fetch(`http://localhost:4000/api/games/${gameId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('deleted', deleted=true);
                window.location.href = 'stock.html';
            })
            .catch(err => console.log(err))
    })

    const updatebtn = document.getElementById('updatebtn');
    updatebtn.addEventListener('click', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const game_type = document.getElementById('game_type').options[document.getElementById('game_type').selectedIndex].value;
        const price = document.getElementById('price').value;
        const clasification = document.getElementById('clasification').options[document.getElementById('clasification').selectedIndex].value;
        const stock = document.getElementById('stock').value;
        const image = document.getElementById('image').files[0];
        const platform = document.getElementById('platform').options[document.getElementById('platform').selectedIndex].value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('game_type', game_type);
        formData.append('price', price);
        formData.append('clasification', clasification);
        formData.append('stock', stock);
        
        //verify if there is an image selected
        if (image) {
            formData.append('image', image);
        }

        formData.append('platform', platform);

        fetch(`http://localhost:4000/api/games/${gameId}`, {
            method: 'PUT',
            body: formData
        })

        //put returns 500 error, what can i do?
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('updated', updated=true);
            window.location.href = 'stock.html';
        }
        )
        .catch(err => console.log(err))
        
        




        
    })
}


