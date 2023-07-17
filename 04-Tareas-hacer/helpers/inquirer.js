import inquirer from 'inquirer';
import colors from 'colors';

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${"1.".green}Crear tareas`
            },
            {
                value: '2',
                name: `${"2.".green}Listar tareas`
            },
            {
                value: '3',
                name: `${"3.".green}Listar tareas completadas`
            },
            {
                value: '4',
                name: `${"4.".green}Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${"5.".green}Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${"6.".green}Borrar tarea(s)`
            },
            {
                value: '0',
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


export {inquirerMenu,pausa,leerInput}