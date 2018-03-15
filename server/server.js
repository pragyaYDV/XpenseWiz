
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());

let db;

MongoClient.connect("mongodb://localhost:27017").then(client => {
  db = client.db('expensewiz');
  app.listen(3000, () => {
    console.log("app started at port 3000");
  });
}).catch(error => {
  console.log('error connecting to Mongo: ', error);
});

app.post('/api/expenses',(req,res)=>{
  console.log("-------- Request Body ----------");
  console.log(req.body);
  const trip = req.body;
  //-------- NOT WORKING :(
  db.collection('expenses').findOne({'empID': 101},function(err,result){
    console.log(err);
    console.log(result);
  });
  //-------- NOT WORKING
  db.collection('expenses').findOneAndUpdate(
    {'empID':101},
    {$push: {'trips': trip}}
  ).then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log("ERROR: ",err);
    res.status(500).json({message: `Internal server error: ${err}`});
  });

});


app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
