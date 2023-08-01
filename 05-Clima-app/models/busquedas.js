import fs, { readFileSync } from 'fs';
import axios from 'axios';
class Busquedas {
    historial = [];
    dbPath = './db/database.json'

    constructor() {
        // TODO: leer DB si existe
        this.leerDB();
    }

    get ParamsMapBox(){
        return {
            'access_token': process.env.MAP_BOX_KEY
        }
    }

    get ParamsOpenWeater(){
        return{
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado(){
        // Capitalizar cada palabra
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }

    async ciudad(busqueda = '') {

        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${busqueda}.json`,
                params: this.ParamsMapBox
            })

            // retorna las ubicaciones que coincidan con la busqueda
            const respuesta = await instance.get();
            return respuesta.data.features.map(lugar => ({
               id: lugar.id,
               nombre: lugar.place_name,
               longitud: lugar.center[0],
               latitud: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }

    }

    async climaLugar(lat,lon){
        try {
            // instancia axios.create();
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.ParamsOpenWeater,lat,lon}
            })
            // respuesta.data
            const respuesta = await instance.get();
            const {weather,main} = respuesta.data;
            
            // return respuesta
            return {
                desc: `${weather[0].description}`.toUpperCase(),
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        // Prevenir duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase)){
            return;
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLowerCase());
        
        // Guardar en DB
        this.guardarDB();
    }

    // Guardar el historial en un JSON
    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        // verificar que exista el database.json 
        if(!fs.existsSync(this.dbPath)) return

        // Lee el archivo y lo convierte en un objeto de JS
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info)

        this.historial = data.historial;
    }

}

export {Busquedas}