const routes = require('../bin/www')
const Modals = require('../db/models')
const md5 = require('blueimp-md5')
const filter = {password:0,__v:0}

const UserModal = Modals.UserModal
const ChatModal = Modals.ChatModal
routes.post('/doregister',(req,res)=>{
    const {username,password,type} = req.query
    UserModal.findOne({username},(err,user)=>{
          if(user){
              res.send({code:1,msg:'用户已存在'})
          }else{
              new UserModal({username,password:md5(password),type}).save((err,user)=>{
                  res.cookie('userid',user.id,{maxAge:1000*60*60*24})
         
                  const data = {username,type}
                  res.send({code:0,data}) 
              })
          }
    })
})  

routes.post('/dologin',(req,res)=>{

    const {username,password} = req.query
    UserModal.findOne({username,password:md5(password)},filter,(err,user)=>{
            if(user){
                res.cookie('userid',user.id,{maxAge:1000*60*60*24})
                res.send({code:0,msg:'登录成功',data:user}) 
            }else{
                res.send({code:1,msg:'用户名或密码不正确'})
            }
    })
})

routes.post('/update',(req,res)=>{
    const userid = req.cookies.userid
    if(!userid){
       return  res.send({code:1,msg:'请先登录'})
    }
 
    const  user = req.query
    UserModal.findByIdAndUpdate({_id:userid},user,(err,olduser)=>{
  
            if(!olduser){
                res.clearCookie('userid')
                return  res.send({code:1,msg:'请先登录'})
            }else{
                const {_id,username,type} = olduser
                const data = Object.assign({_id,username,type},user)
                res.send({code:0,data})
            }
    })
})

routes.get('/user',(req,res)=>{
    const userid = req.cookies.userid
    if(!userid){
       return  res.send({code:1,msg:'请先登录'})
    }
    UserModal.findOne({_id:userid},filter,(err,user)=>{
            if(!user){
                res.clearCookie('userid')
                return  res.send({code:1,msg:'请先登录'})
            }else{
                res.send({code:0,data:user})
            }
    })
})


routes.get('/list',(req,res)=>{
    const type  = req.query[0]

    UserModal.find({type:type},filter,(err,users)=>{
                res.send({code:0,data:users})
    })
})


routes.get('/msglist',function(req,res){
    const userid = req.cookies.userid

    UserModal.find(function(err,userDocs){
        const users = {}
        userDocs.forEach(doc=>{
            users[doc._id] = {username:doc.username,header:doc.header}
        })

        ChatModal.find({'$or':[{from:userid},{to:userid}]},filter,function(err,chatMsgs){
            res.send({code:0,data:{users,chatMsgs}})
        })
    })
})  
 
routes.post('/readMsg',function(req,res){
    const from = req.body.from 
    const to = req.cookies.userid
    ChatModal.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
        console.log('/readMsg',doc)
        res.send({code:0,data:doc.nModified})
    })
})