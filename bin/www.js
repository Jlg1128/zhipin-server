const express = require('express')
var router = express.Router()
const bodyParser = require('body-parser');
const app = new express()
const port = 4000
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(4000,()=>{
    console.log('4000 port open');
});
app.get('/',(req,res)=>{
    res.send('xixi')
})

module.exports=app