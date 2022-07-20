const register = document.getElementById('register');

register.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const game_type = document.getElementById('game_type').options[document.getElementById('game_type').selectedIndex].value;
    const price = document.getElementById('price').value;
    const clasification = document.getElementById('clasification').options[document.getElementById('clasification').selectedIndex].value;
    const stock = document.getElementById('stock').value;
    const image = document.getElementById('image').files[0];
    const platform = document.getElementById('platform').options[document.getElementById('platform').selectedIndex].value;
    // const password = document.getElementById('password').value;
    
    console.log(platform)
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('game_type', game_type);
    formData.append('price', price);
    formData.append('clasification', clasification);
    formData.append('stock', stock);
    formData.append('image', image);
    formData.append('platform', platform);

    fetch('http://localhost:4000/api/games', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //prevent reloading the page
        alert('Game added succesfully')
        // window.location.href = 'index.html';
    })
    .catch(err => console.log(err))
});


