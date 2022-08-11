// Websocket socket.io
// proporciona comunicaciones bidireccionales.
// tiene un tiempo de respuesta en tiempo real.
// esa comunicacion directa permite mas seguridad.

// se ejecutan dos bibliotecas, una del lado cliente y otra del servidor (back-front)
// tienen soporte de reconexion automatica
//  c ------http------> s
//  l <---handshacke--- e genera seguridad entre cliente y servidor 
//  i                   r
//  e <---websockets--> v permite ser fullduplex 
//  n <--fullduplex---> e porque no tiene que esperar la respuesta del servidor o cliente
//  t >-----close-----< r

// ejemplos chats, paginas de subastas, videojuegos, gps etc
// utilizan el prefijo WSS en vez de HTTPS aunque no se muestran en el navegador

const express = require ('express');
const {Server} = require ('socket.io'); // con {} para importar solo el modulo server de sockets

const app = express();
const PORT =process.env.PORT||8080;

const server = app.listen(PORT,()=>{
    console.log ('Listening on port: '+PORT)
})

// const io = new Server (server); //se declara un nuevo servidor y se le pasa la variable del servidor que ya esta escuchando
// app.use(express.static('public'));

// // con la libreria io se corrobora que un cliente se conecto al sitio
// io.on('connection', socket=>{ //en servidor sockets, cuando se establece una conexion, con el socket que se conecto realiza la sig funcion
//     console.log('Se conecto un cliente'); // muesta el mensaje cuando se conecta un cliente
//     socket.emit ('Welcome', 'BIENVENIDO A MI SERVIDOR') //metodo para pasar informacion en biseversa

//     socket.on('message', data=>{
//         socket.emit('log',data); 
//     })
// })


// APP
app.use(express.static(__dirname+'/publicbis')) //__dirname ubica la carpeta raiz de donde esta corriendo el proyecto
const io = new Server (server); //se declara un nuevo servidor y se le pasa la variable del servidor que ya esta escuchando
let messages = [];

io.on ('connection', socket=>{
    console.log ('Cliente conectado');
    socket.emit('messagelog',messages); //io es el servidor, por ende la informacion llega a todos los clientes, con socket no!

    socket.emit ('welcome', 'Bienvenido a socket')
    socket.on('message', data=>{
        messages.push( data)
        // console.log(data);
        io.emit('messagelog',messages); //io es el servidor, por ende la informacion llega a todos los clientes, con socket no!
    })
})
