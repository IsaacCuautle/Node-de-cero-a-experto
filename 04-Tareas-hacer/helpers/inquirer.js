import inquirer from 'inquirer';
import colors from 'colors';

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: ['opcion1','opcion2','opcion3']
    }
]

const inquirerMenu = async() => {
    // console.clear();

    console.log("============================".green);
    console.log("   Seleccione una opcion".green);
    console.log("============================\n".green);

    const opt = await inquirer.prompt(menuOptions);

    return opt;
}

export {
    inquirerMenu
}