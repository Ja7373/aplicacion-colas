const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');




const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log('siguiente ticket:', siguiente);
        callback(siguiente);
    });

    // client.on('estadoActual', (data, callback) => {
    //     let estadoActual = ticketControl.getUltimoTicket();
    //     console.log("EstadoActual:", estadoActual);
    //     callback(estadoActual);
    // });
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4(),
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        //actualizar notificar cambios en los ultimos 4
        client.broadcast.emit('estadoActual', {
            ultimos4: ticketControl.getUltimos4(),
        });

    });

});