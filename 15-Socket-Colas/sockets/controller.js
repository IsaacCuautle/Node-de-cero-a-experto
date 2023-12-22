import { TicketControl } from "../models/ticket-control.js";

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.emit('ultimo-ticket',ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        // TODO: Notificar Un nuevo ticket pendiente por asignar


    })
}


export {
    socketController
}

