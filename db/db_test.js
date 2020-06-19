const mongoose = require("mongoose")
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://127.0.0.1:27017/zhipin_test',{ useUnifiedTopology: true })

const conncet = mongoose.connection

conncet.on('connected',()=>{console.log('数据库连接成功')})

const userSchema = mongoose.Schema({    //指定文档的结构
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
    header:{type:String}
})


const UserModel = mongoose.model('user',userSchema)   //集合的名称为users
// 添加
function testSave(){
    //save()添加数据
    const userModal = new UserModel({username:'Jlg',password:md5('234'),type:'dashen'})
    userModal.save((err,User)=>{
          console.log('save()',err,User)
    })
}
// testSave()

// 查找
function testFind(){
    UserModel.find((err,users)=>{
           console.log(users)
    })
    UserModel.findOne({username:'Jlg'},(err,user)=>{
        console.log(user)
    })
}
// testFind()

// 更新
function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'5ee5a604c218613d3cab31c2'},{username:'jack'},(err,user)=>{
        console.log(user)
    })
}
// testUpdate()

// 删除
function testDelete(){
    UserModel.remove({_id:'5ee5a604c218613d3cab31c2'},(err,user)=>{
        console.log(user)
    })
}
testDelete()