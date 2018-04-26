const path=require('path');
const http=require('http');
const express=require('express');
const socketio=require('socket.io');

var {genrateMessage}=require('./utils/message');

const publicPath=path.join(__dirname,'../public');
var app=express();
// console.log(__dirname+'/../public');
// console.log(publicPath);
var server = http.createServer(app);
var io=socketio(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    /*socket.emit('newEmail',{
        from:"sahil@gmail.com",
        text:"recived",
        createAt:123
    });
    socket.emit('sndmsg',{
        from:'sg',
        text:'call for detail'
    });*/
    /*socket.emit('newMsg',{
        from:'Admin',
        text:'Wlcome to the chat app',
        createdAt:new Date().getTime()
    });*/
    socket.emit('newMsg',genrateMessage('Admin','Welcome to the chat app'));
    /*socket.broadcast.emit('newMsg',{
        from:'Admin',
        text:'New user joined',
        createdAt:new Date().getTime()
    });*/
    socket.broadcast.emit('newMsg',genrateMessage('Admin', 'New user joined'));
    socket.on('createmsg',(msg,callback)=>{
        console.log('msg:',msg);
        io.emit('newMsg',genrateMessage(msg.from,msg.text)/*{
            from:msg.from,
            text:msg.text,
            createdAt:new Date().getTime()
        }*/);
        callback('return from server');
        // socket.broadcast.emit('newMsg',{
        //     from:msg.from,
        //     text:msg.text,
        //     createdAt:new Date().getTime()
        // });
    });
    /*socket.on('createEmail',(newEmail)=>{
        console.log('email Created ',newEmail);
    });*/

    socket.on('disconnect',()=>{
        console.log('user disconnected ');
    });
});

server.listen(3000,()=>{
    console.log('server up on 3000');
});
