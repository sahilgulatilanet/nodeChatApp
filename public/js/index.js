var socket=io();
socket.on('connect',function(){
    console.log('connected to server');
    /*socket.emit('createEmail',{
        to:'sahilgulati@gmail.com',
        text:'creadted email'
    });*/
    socket.emit('createmsg',{
        from:'sahil',
        text:'hello'
    },function (data) {
        console.log('recived by server',data);
    });
});
socket.on('disconnect',function(){
    console.log('disconnected from server');
});
/*socket.on('newEmail',function(email){
    console.log('New Email',email);
});*/
socket.on('newMsg',function (mmsg) {
    console.log('sent msg',mmsg);
});
jQuery('#messageapp').on('submit',function () {
    e.preventDefault();
    socket.emit('createmsg',{
        from:'user',
        text:jQuery
    })
});