
const express=require("express");
//import express from 'express';
const app=express();
var path =require("path");

var mongoose=require("mongoose"); // DB
var bodyParser = require("body-parser"); //npm install body-parser --save
var cookieParser = require("cookie-parser");
var passport =require("passport"); // authentification
var session =require("express-session");
var flash =require("connect-flash");//allows the developers to send a message whenever a user is redirecting to a specified web-page.
var params =require("./params/params");
// npm istall mongoose cookie-parser passport express-session connect-flash --save
//var routes=require("./routes");

//app.listen(3000,()=> console.log("all done !!"));

var setUpPassport = require("./setuppassport");


mongoose.connect(params.DATABASECONNECTION,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true}) // to skip duplication warning (access to db)
setUpPassport();
//var editor = require("./editor.js");
//editor();

app.set("port",process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"));    
//views, le répertoire dans lequel se trouvent les fichiers modèles
app.set("view engine","ejs");  
//tell express which view engine we gonna use
//app.

app.use("/uploads", express.static(path.resolve(__dirname,'uploads')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({                  //fetch data(routes)(passport)
    secret:"fkljjk156lmdf",
    resave:false,
    saveUninitialized:false
}));

//passport is module that we gonna use to authentificate
//passportjs.org

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/",require("./routes/web"));
app.use("/api",require("./routes/api"));


app.listen(app.get("port"),function(){
    console.log("server started on port " +app.get("port"));
});