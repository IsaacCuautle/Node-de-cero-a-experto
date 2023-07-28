import 'dotenv/config'
import {inquirerMenu, leerInput, listarLugares, pausa} from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";


const main = async() => {
    let busquedas = new Busquedas
    let opcion;

    do {
        opcion = await inquirerMenu();

        switch (opcion) {
            case 1:
                // Mostrar mensaje
                const busqueda = await leerInput('Ciudad: ');
                
                // Buscar la ubicacion
                const lugares = await busquedas.ciudad(busqueda);
                
                // Seleccionar la ubicacion
                
                    const idSeleccionado = await listarLugares(lugares);
                    const lugarSeleccionado = lugares.find(lugar => lugar.id === idSeleccionado );
                

                // Clima

                // Mostrar Resultados
                try {
                    console.log('\ninformacion de la ciudad\n'.green);
                    console.log('Ciudad:', lugarSeleccionado.nombre);
                    console.log('Latitud:', lugarSeleccionado.latitud);
                    console.log('Longitud:', lugarSeleccionado.longitud);
                    console.log('Temperatura:',);
                    console.log('Temperatura Max:',);
                    console.log('Temperatura Min:',);
                } catch (error) {
                    
                }
            break;
        
            default:
            break;
        }
        
        if (opcion !== 0) await pausa();
    } while (opcion !== 0);


}

main();