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
               latitud: lugar.center[0],
               longitud: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }

    }

}

export {Busquedas}