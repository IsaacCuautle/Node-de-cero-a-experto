import axios from 'axios';
class Busquedas {
    historial = ['Cdmx','Madrid','Bogota']

    constructor() {
        // TODO: leer DB si existe

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

}

export {Busquedas}