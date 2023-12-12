 const socketController = (socket) => {

    console.log('cliente conectado: ',socket.id);
       
    socket.on('disconnect', ()=>{
        console.log('cliente desconectado: ', socket.id);
    });

    socket.on('enviar-mensaje', (payload,callback)=>{
        const id = 798;
        callback(id);
        socket.broadcast.emit('desde el servidor',payload);
    })

 } 

 export 
 {
    socketController
 }