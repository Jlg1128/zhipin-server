const routes = require('../bin/www')

routes.post('/register',(req,res)=>{
    const {username,password} = req.body
    if(username==='admin'){
        res.send({code:1,msg:'此用户已存在'})
    }else{
        res.send({code:0,data:{id:'123',username,password}})
    }

})