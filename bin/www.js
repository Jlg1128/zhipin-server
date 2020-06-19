const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = new express()
const port = 4000

//socket 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,username");
    if(req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 为socket创建服务器，监听端口3000，不能和4000重复
var server = require('http').createServer(app);
server.listen(3000)

require('../socketio/socketIO')(server) 

app.use(cookieParser()) //直接接收cookie
app.use(bodyParser.urlencoded({ extended: false })); 

app.listen(port,()=>{
    console.log(`${port} port open `);
});


module.exports=app