const {ChatModal} = require('../db/models')

module.exports=function(server){
    const io = require('socket.io')(server)
    io.on('connection',function(socket){
        console.log('有一个服务器连接建立')
        socket.on('sendMsg',function(data){
            console.log('服务器接收到浏览器发送的消息'+data)
            const {from,to,content} = data
    
            const chat_id = [from,to].sort().join('_')
            const create_time = Date.now()
            new ChatModal({from,to,content,chat_id,create_time}).save(function(err,chatMsg){
                 if(err){
                     console.log(err)
                 }else{
                     io.emit('receiveMsg',chatMsg)
                 }
         
            })
        })
    })
}