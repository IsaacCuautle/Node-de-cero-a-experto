import { inquirerMenu, pausa } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async() => {

    let opt = '';
    
    do {
        opt = await inquirerMenu(); 
        console.log({opt});
        await pausa();  

    } while (opt !== '0');

}

main();