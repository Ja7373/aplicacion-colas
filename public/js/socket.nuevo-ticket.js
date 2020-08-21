// comando para establecer la conexion

var socket = io();

var label = $('#lblNuevoTicket');

//Conexion
socket.on('connect', function() {
    console.log('Conectado al servidor');
    // socket.emit('estadoActual', null, function(data) {
    //     console.log('estadoActualRecibidoBrowser:', data);
    //     label.text(data);
    // });
});

//Desconexión
socket.on('disconnect', function() {
    console.log('Desconectado del Servidor');
});

// socket.emit('estadoActual', null, function(data) {
//     console.log('estadoActualRecibidoBrowser:', data);
//     label.text(data);
// });

socket.on('estadoActual', function(resp) {
    console.log('www-resp', resp);
    label.text(resp.actual);
});

$('button').on('click', function() {
    console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});