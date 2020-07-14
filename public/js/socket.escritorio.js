// Comando conexión 
var socket = io(); //pertenece a socket.io/socket.io.js importado en escritorio.html

var searchParams = new URLSearchParams(window.location.search); //parámetros de la URL, como el número de escritorio

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario como parámetro');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
$('h1').text('Escritorio' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket' + resp.numero);
    });
});