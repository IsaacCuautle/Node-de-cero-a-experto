import 'dotenv/config'
import {inquirerMenu, leerInput, pausa} from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";


const main = async() => {
    let busquedas = new Busquedas
    let opcion;

    do {
        opcion = await inquirerMenu();

        switch (opcion) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);

                // Buscar la ubicacion

                // Seleccionar la ubicacion

                // Clima

                // Mostrar Resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Latitud:',);
                console.log('Longitud:',);
                console.log('Temperatura:',);
                console.log('Temperatura Max:',);
                console.log('Temperatura Min:',);
            break;
        
            default:
            break;
        }
        
        if (opcion !== 0) await pausa();
    } while (opcion !== 0);


}

main();