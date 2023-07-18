import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    // Cargar tareas
    if(tareasDB) {
        tareas.cargarTareasArray(tareasDB)
    }

    
    
    do {
        opt = await inquirerMenu(); 

        switch(opt) {
            case '1':
                // Crear opcion
                const descripcion = await leerInput('Descripcion: ');
                console.log(descripcion);
                tareas.crearTarea(descripcion);
            break;

            case '2':
                console.log(tareas.listadoArray);
            break;
        }

        // guardarDB(tareas.listadoArray);
        await pausa();  
        

    } while (opt !== '0');

}



main();