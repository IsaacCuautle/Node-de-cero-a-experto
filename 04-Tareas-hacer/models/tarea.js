import {v4 as uuidv4} from 'uuid';

class Tarea {
    id = ''
    descripcion = ''
    fechaCompletado = null;
    
    constructor(descripcion) {
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.fechaCompletado = null
    }
}

export {Tarea}