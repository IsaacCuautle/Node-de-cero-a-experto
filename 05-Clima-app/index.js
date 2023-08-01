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
                if(idSeleccionado === 0) continue;
                const lugarSeleccionado = lugares.find(lugar => lugar.id === idSeleccionado );

                // Guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                // Clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.latitud,lugarSeleccionado.longitud);

                // Mostrar Resultados
                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log('Ciudad:', lugarSeleccionado.nombre.green);
                    console.log('Latitud:', lugarSeleccionado.latitud);
                    console.log('Longitud:', lugarSeleccionado.longitud);
                    console.log('\nInformacion del clima\n'.green);
                    console.log('Clima: ',clima.desc.green);
                    console.log('Temperatura Actual:',clima.temp);
                    console.log('Temperatura Max:',clima.max);
                    console.log('Temperatura Min:',clima.min);
                    
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx =`${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })


            break;
        
            default:
            break;
        }
        
        if (opcion !== 0) await pausa();
    } while (opcion !== 0);


}

main();