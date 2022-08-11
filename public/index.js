// Cliente
const socket = io(); // se instancia io
let input = document.getElementById('info')
input.addEventListener ('ketup',(e)=>{
    socket.emit('message', e.target.value)
})
socket.on('Welcome', data=>{
    alert (data); // cada vez que el cliente se conecte al servidor, le dara una bienvenida    
})
socket.on('log', data=>{
    let div = document.getElementById('log');
    if (div.firstChild) div.removeChild(div.firstChild);
    let p = document.createElement('p');
    p.innerHTML = data;
    div.appendChild(p);
})