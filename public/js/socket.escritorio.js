// comando para establecer la conexion

var socket = io();

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

var searchParams = new URLSearchParams(window.location.search);
console.log('searchParams', searchParams);
if (!searchParams.has('escritorio')) {
    console.log('se ha encontrado escritorio en la url');
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = searchParams.get('escritorio');

var label = $('small');
console.log('EscritorioSeleccionado:', escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (!resp.numero) {
            console.log('Ticket: ', resp);
            label.text(resp);
        } else {
            label.text('Ticket: ' + resp.numero);
            console.log('Ticket:', resp.numero);
        }
    });
});