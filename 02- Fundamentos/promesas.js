const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Luis'
    },
    {
        id: 3,
        nombre: 'Karen'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1500
    },
    {
        id: 2,
        salario: 2500
    }
];


const getEmpleado = (id) => {
    return new Promise( (resolve,reject) => {
        const empleado = empleados.find( e => e.id === id)?.nombre

        empleado ? resolve(empleado) : reject(`No existe el empledo con id ${id}`)
    });
}

const getSalario = (id) => {
    return new Promise((resolve,reject) => {
        const salario = salarios.find( e => e.id === id)?.salario

        salario ? resolve(salario) : reject(`No existe un salario para el id ${id}`)
    });
}

const id = 3;
// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch( err => console.log(err));

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch( err => console.log(err));

// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => {
//                 console.log(`${empleado} tiene un salario de: ${salario}`);
//             })
//             .catch( err => console.log(err));
//     })
//     .catch( err => console.log(err));

let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id)
    })
    .then(salario => console.log(`${nombre} tiene un salario ${salario}`))
    .catch(err => console.log(err))