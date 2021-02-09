const express=require('express');
var bodyParser = require("body-parser")
const passport=require("passport");
const routes = require('./config/routes');
//const routes1=require('./controllers/routes1');
var mongoose = require("mongoose")
const path = require('path');
require("./config/passport")(passport);
const foreach=require('foreach');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
//app.use(express.static('../root'));
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.static('public/html'))
//app.use(express.static('public/images'))
//app.use(express.static('public/css'))
app.use('/css', express.static(path.resolve(__dirname, "public/assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "public/assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "public/assets/js")))
app.get('/',(req,res) =>{
  console.log('request: ', req);
  res.sendFile(path.join(__dirname,'index.html'))
})
app.get('/vendor', routes);
app.post('/vendor', routes);
app.get('/employee', routes);
app.post('/register/employee', routes);
app.get('/benchsales',routes);
app.post('/benchsales', routes);
app.get('/jsreg',routes);
app.post('/jobseekerreg', routes);
app.get('/trainingreg',routes);
app.post('/training', routes);
app.get('/contactus',routes);
app.post('/contactus', routes);
app.get('/suc',(req,res) =>{
  res.render('suc');
});
app.post('/suc',routes);
app.get('/login', routes);
app.post('/login', routes);
app.get('/success', routes);
app.get('/employeeaccount', routes);
app.get('/vendoraccount', routes);
app.get('/benchsalesaccount', routes);
app.get('/jobseekeraccount', routes);
app.get('/trainingaccount', routes);
app.get('/logout', routes);
app.get('/workreport1', routes);
app.get('/workreport',(req,res) => {
  res.render('workreport');
});
app.get('/candidateinfo',(req,res) => {
  res.render('candidateinfo',{user:'hi'});
});
app.get('/benchsalesinfo',(req,res) => {
  res.render('benchsalesinfo');
});
app.get('/recruiters',(req,res) => {
  res.render('recruiters');
});
app.get('/classtab',(req,res) => {
  res.render('classtab');
});
app.get('/recordings',(req,res) => {
  res.render('recordings');
});
app.get('/assignments',(req,res) => {
  res.render('assignments');
});
//app.get('/login', routes1);
//app.post('/login', routes1);
//app.get('/success', routes1);
//app.get('/logout', routes1);
app.listen(5000,function(){
  console.log("__dirname: ");
  console.log(path.join(__dirname, 'views'));
  console.log("listing at 5000");
})






//app.get('/', routes);
//app.post('/register', routes);
