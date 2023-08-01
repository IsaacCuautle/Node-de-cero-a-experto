import inquirer from 'inquirer';
import v from 'colors'


const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${"1.".green}Buscar Ciudad`
            },
            {
                value: 2,
                name: `${"2.".green}Historial`
            },
            {
                value: 0,
                name: `${"0.".green}Salir`
            },
        ]
    }
]


// Imprime el menu de opciones en consola
const inquirerMenu = async() => {
    console.clear();

    console.log("============================".green);
    console.log("   Seleccione una opcion".white);
    console.log("============================\n".green);

    const {opcion} = await inquirer.prompt(menuOptions);
    console.log();
    return opcion 
}

const pausa = async() => {

    const PrompPausa = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`,
        }
    ]
    console.log('\n');
    await inquirer.prompt(PrompPausa);
}

const leerInput = async(message) => {
    const pregunta = [
        {
            type: 'intput',
            name: 'descripcion',
            message,
            validate (value) {
                if(value.lenght === 0) {
                    return 'Por favor ingresa un valor';
                }

                return true;
            }
        }

    ];

    const {descripcion} = await inquirer.prompt(pregunta);
    return descripcion;
}

const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar,i) => {
        const index = `${(i+1)+"."}`.green
        return {
            value: lugar.id,
            name: `${index} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0. '.red +'Cacelar'.red
    })
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar:',
            choices: choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok
}

const listadoTareasCompletar = async(tareas = []) => {

    const choices = tareas.map((tarea,i) => {
        const index = `${(i+1)+"."}`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`,
            checked: (tarea.fechaCompletado) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}


export {inquirerMenu,pausa, leerInput, listarLugares, confirmar, listadoTareasCompletar}