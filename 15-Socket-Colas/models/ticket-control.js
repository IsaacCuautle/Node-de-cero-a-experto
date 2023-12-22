import * as data from "../db/data.json" assert {type: "json"}
import fs from "fs" 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    // Comprueba si es otro dia o solo se esta reiniciando
    init() {
        const {hoy, tickets, ultimo, ultimos4} = data;
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            this.guardarDB();
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    siguiente() {
        this.ultimo +=1;
        const ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket)

        this.guardarDB();
        return `Tiket: ${ticket.numero}`
    }

    atenderTicket(escritorio){
        // No hay tickets
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1)
        }

        this.guardarDB();

        return ticket;
    }

}

export
{
    TicketControl
}