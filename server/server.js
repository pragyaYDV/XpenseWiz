
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/../dist'));
//app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json()); //parser req body and saves in req.body
//use is used to insert middleware, static() is used to specify the directory path for static content.

let db;
app.listen(3000, () => {
  console.log("app started at port 3000");
});

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
