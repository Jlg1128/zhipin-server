/*
包含n个数据库操作集合数据的modal模块
*/

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/zhipin_test'
mongoose.connect(url)

const conn = mongoose.connection

conn.on("connected",()=>{console.log('数据库连接成功')})

const userSchema = mongoose.Schema({
    username:{type:String,required:true},  //用户名
    password:{type:String,required:true},  //密码
    type:{type:String,required:true}, // 用户类型
    header:{type:String},             //头像
    post:{type:String},         //职位
    info:{type:String},    //个人介绍
    company:{type:String},   //company
    salary:{type:String},    //工资
})

const UserModal = mongoose.model('user',userSchema)

const chatSchema = mongoose.Schema({
    from:{type:String,required:true},  //发送用户的id
    to:{type:String,required:true},  //接收用户的id
    chat_id:{type:String,required:true}, // from 和 to组成的字符串
    content:{type:String,required:true},             //内容
    read:{type:Boolean,default:false},         //标识是否已读
    create_time:{type:Number},    //创建时间
})

const ChatModal = mongoose.model('chat',chatSchema)

exports.UserModal = UserModal
exports.ChatModal = ChatModal
