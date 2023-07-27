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


            const respuesta = await instance.get();
            console.log(respuesta.data);

            // retorna las ubicaciones que coincidan con la busqueda
            return [];
        } catch (error) {
            return [];
        }

    }

}

export {Busquedas}