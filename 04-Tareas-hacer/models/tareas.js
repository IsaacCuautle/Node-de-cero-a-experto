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

    borrarTarea(id='') {
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasArray( tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
        
    }

    crearTarea( descripcion = '') {

        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArray.forEach( (tarea,i) => {
            const index = `${i+1}.`.green;
            const {descripcion,fechaCompletado} = tarea;
            const estado = (fechaCompletado) ? 'Completado'.green : 'Pendiente'.red
            
            console.log(`${index} ${descripcion} :: ${estado}`)
        })
    }

    // Filtra las tareas dependiendo si estan completadas o no
    listarPendientesCompletasas(completadas = true) {
        this.listadoArray.forEach( (tarea) => {
            let contador = 0;
            const {descripcion,fechaCompletado} = tarea;
            const estado = (fechaCompletado) ? 'Completado'.green : 'Pendiente'.red

            if (!completadas ) {
                if(!fechaCompletado){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${descripcion} :: ${estado}`)
                }
            }else{
                if(fechaCompletado){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${descripcion} :: ${(fechaCompletado).green}`)
                }
            }  
        })
    }

    toggleCompletadas(ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.fechaCompletado){
                tarea.fechaCompletado = new Date().toISOString()
            }
        })

        this.listadoArray.forEach( tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].fechaCompletado = null
            }
        })
    }

}

export {Tareas}