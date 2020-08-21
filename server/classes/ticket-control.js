const fs = require('fs');
const { timeStamp } = require('console');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        console.log('hoy:', this.hoy);
        let data = require('../data/data.json');
        //let data = { "ultimo": 0, "hoy": 50 };
        console.log('data.hoy', data.hoy);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift(); //eliminamos la primera posición del array

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        console.log('Ultimos4:', this.ultimos4);
        this.ultimos4.unshift(atenderTicket); //añadimos al Inicio del array

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el último
        }
        console.log('Ultimos4:', this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se Ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}



module.exports = {
    TicketControl,
}