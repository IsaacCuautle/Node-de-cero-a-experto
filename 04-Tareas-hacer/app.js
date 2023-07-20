import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasCompletar } from './helpers/inquirer.js';
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
                tareas.crearTarea(descripcion);
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletasas(true);
            break;
            case '4':
                tareas.listarPendientesCompletasas(false);
            break;
            case '5':
                const ids = await listadoTareasCompletar(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if(id !== '0'){
                    const confirmarBorrar = await confirmar('Esta seguro?'.yellow) 
                    if(confirmarBorrar){
                        tareas.borrarTarea(id);
                        console.log('TAREA BORRADA CORRECTAMENTE'.bgRed);
                    }
                }

            break;
        }

        guardarDB(tareas.listadoArray);
        await pausa();  
        

    } while (opt !== '0');

}



main();