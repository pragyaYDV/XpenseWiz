
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json()); //parser req body and saves in req.body
//use is used to insert middleware, static() is used to specify the directory path for static content.

let db;

MongoClient.connect("mongodb://localhost:27017/expensewiz").then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log("app started at port 3000");
  });
}).catch(error => {
  console.log('error connecting to Mongo: ', error);
});

app.post('/api/expenses',(req,res)=>{
  const expense = req.body;
  db.collection('expenses').findAndModify(
    {empID:101},
    [['_id','asc']],
    {$push: {expenses: expense}},
    { new: true}
  ).then(result=>{
    console.log("0000000 SAVED 00000000");
    res.json(result);
  }).catch(err=>{
    console.log("ERROR: ",err);
    res.status(500).json({message: `Internal server error: ${err}`});
  });
});


app.get('*',(req,res)=>{
  console.log("~~~~~~~~~0000000~~~~~~~");
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
