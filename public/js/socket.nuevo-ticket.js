// Comando conexión 
var socket = io(); //pertenece a socket.io/socket.io.js importado en nuevo-ticket.html

var label = $('#lblNuevoTicket'); //buscamos en el html el elemento con ese id

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (data) => {
    label.text(data.actual)
})

// Funcion jquery para disparar esa función al pulsar el botón en la pestaña nuevo-ticket.html
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(respuesta) {
        console.log('Respuesta server: ', respuesta.resp);
        label.text(respuesta.siguiente);
    });
})