const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

//Para comprobar que la configuración del socket está bien en la dirección http://localhost:3000 si ponemos http://localhost:3000/socket.io/socket.io.js y se ve
//el archivo de la librería está bien configurado
io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => { //data es null ahora mismo
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback({
            siguiente,
            resp: 'Siguiente ticket emitido y guardado'
        });
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

        callback(atenderTicket);
    });
});

//Al pulsar el botón como se actualiza el archivo se recarga nodemon, para evitar eso 
//se ejecuta nodemon con el siguiente comando: 
// nodemon server/server -e js,html