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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find( e => e.id === id)?.nombre
    if(empleado) {
        callback(null,empleado)
    } else {
        callback(`El usuario con id ${id} no existe`)
    }
    
}

const getSalario = (id,callback) => {
    const salario = salarios.find( e => e.id === id)?.salario

    if(salario){
        callback(null,salario);
        
    }else {
        callback('!ERROR¡');
    }
    

}

const id = 3;

getEmpleado(id, (err,empleado) => {
    if(err){
        return console.log(err);
    }

    getSalario(id,(err,salario) => {
        if(err){
            return console.log(`${err} no existe un salario para el id ${id}`);
        }
    
        console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
        
    });
});

