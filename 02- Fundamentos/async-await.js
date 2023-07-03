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

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id)
        const salario = await getSalario(id)
        return `El salario de ${empleado} es de ${salario}`
    } catch (error) {
        throw error
    }
}


const id = 5;

getInfoUsuario(id)
    .then( msg => console.log(msg))
    .catch( err => console.log(err))