const deadpool = {
    nombre: 'Wade',
    apellido: 'Willson',
    poder: 'Regeneraion',
    edad: 50,
    getNombre: function () {
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
} 

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

function imprimirHeroe({nombre,apellido,poder,edad = 0}) {
    nombre = 'fernando'
    console.log(nombre, apellido, poder,edad);
}

// imprimirHeroe(deadpool);

const heroes = ['Deadpool','Superman','Batman']

// const h1 = heroes[0]
// const h2 = heroes[1]
// const h3 = heroes[2]

const [ , ,h3] = heroes;

console.log(h3);

