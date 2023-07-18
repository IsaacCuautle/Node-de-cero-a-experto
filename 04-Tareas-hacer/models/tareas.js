import { Tarea } from "./tarea.js";

class Tareas {
    _listado = {};

    get listadoArray(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasArray( tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tareas;
        })
        
    }

    crearTarea( descripcion = '') {

        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }
}

export {Tareas}