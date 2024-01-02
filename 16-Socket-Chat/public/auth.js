const url = 'http://localhost:8080/api/auth/'
const formulario = document.querySelector('form');
function handleCredentialResponse(response) {



// Iniciar sesion con google
const body = { id_token: response.credential }
fetch(url+'google', {
        method: 'POST',
        headers: {
            'Content-Type':
                'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({token}) => {
            localStorage.setItem("token",token);
        })
        .catch(console.warn);
}

// Mandar formulario al backend
formulario.addEventListener('submit',ev => {
    ev.preventDefault();

    const formData = {};
    for(let el of formulario.elements)
    {
        if(el.name.length > 0)
        {
            formData[el.name] = el.value
        }
    }

    fetch(url+ 'login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then( resp => resp.json())
    .then( ({msg, token}) => {
        if(msg)
        {
            return console.log(msg);
        }

        localStorage.setItem("token",token);
    })
    .catch( err => {
        console.log(err);
    })
})

// Cerrar sesion
const signoutBtn = document.getElementById('google_signout');
signoutBtn.onclick = () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload()
    })
}