const express = require("express")
const bodyParser=require("body-parser")
const { where } = require("sequelize")
const app=express()
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
app.use(bodyParser.json())
app.use(express.json())
const port=3050
app.listen(port,()=>{
    console.log(`Dinlenilen Port ${port}`)
})
const User = require ('./models').tododb
app.use(express.static("C:/Users/user/Desktop/todoSQLZ"))
//Sayfaları Çağırma
app.get("/login",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/login.html")
})
app.get("/register",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/register.html")
})
app.get("/todo",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/todo.html")
})

//Register
app.post("/register",urlencodedParser,(req,res)=>{
       // let kAdi= req.body.firstName
    // console.log(kAdi)
    // res.send(req.body)
    // let deneme={first_name:req.body.first_name,last_name:req.body.last_name,password:req.body.password,email:req.body.email}
    // res.send(deneme)
    User.create({name:req.body.name,password:req.body.password})
    .then(user=>{
        res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/login.html")
    }).catch(e=>console.log(e))
})

//Login 
var session
app.post("/login",urlencodedParser,(req,res)=>{
    let name = req.body.name
    let password =req.body.password
    //  console.log(`Girilen Mail = ${name}\nGirilen Password ${password}`)
  User.findAll().then(users=>{
    for(let i=0;i<users.length;i++){
    //    console.log(users[i].dataValues)     
       if(name== users[i].name && password== users[i].password){
        // window.location.href="http://localhost:3000/anasayfa"
        res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/todo.html")
        // console.log("Doğrulandı")
         session = users[i].id
        // console.log(session)
        break;
       }else{
        console.log("Hatalı")
       }
    }
  })
  .catch(e=>console.log(e))

})
//Kullanıcının Giriş Kısmı
app.get("/GanK",(req,res)=>{
    console.log(`Girilen Kullanıcının İd'si => ${session}`)
    User.findAll()
    .then(user=>{
        for(let i=0;i<user.length;i++){
            // console.log(user[i].dataValues.id)
            if(session==user[i].dataValues.id){
                res.send(user[i].dataValues)
            }     
         }
    })
    .catch(e=>console.log(e))
})

//Data Base Kontrol
app.get("/data",urlencodedParser,(req,res)=>{
    // User.findAll().then(users=>console.log(users.dataValues))

    User.findAll().then(users=>{
        for(let i=0;i<users.length;i++){
           console.log(users[i].dataValues)     
        }
      })
      .catch(e=>console.log(e))
})
//-Todo Çalışma Kısmı
app.post("/todo",urlencodedParser,(req,res)=>{ 
    let todolr= req.body.todo
    let stTodo=JSON.stringify(todolr)
            User.update({todo:stTodo},{where: {id:session}}).catch(e=>console.log(e))
      .catch(e=>console.log(e))
})

app.post("/cikis",(req,res)=>{
    session=0
    res.sendFile("C:/Users/user/Desktop/todoSQLZ/html/login.html")


})













































// ! /$$      /$$ /$$$$$$$         /$$$$$$                      /$$   /$$      
//  | $$$    /$$$| $$__  $$       /$$__  $$                    | $$  /$$/      
//  | $$$$  /$$$$| $$  \ $$      | $$  \__/  /$$$$$$  /$$$$$$$ | $$ /$$/       
// ! | $$ $$/$$ $$| $$$$$$$/      | $$ /$$$$ |____  $$| $$__  $$| $$$$$/        
// ! | $$  $$$| $$| $$__  $$      | $$|_  $$  /$$$$$$$| $$  \ $$| $$  $$        
//  | $$\  $ | $$| $$  \ $$      | $$  \ $$ /$$__  $$| $$  | $$| $$\  $$       
//  | $$ \/  | $$| $$  | $$      |  $$$$$$/|  $$$$$$$| $$  | $$| $$ \  $$      
// !|__/     |__/|__/  |__/       \______/  \_______/|__/  |__/|__/  \__/

