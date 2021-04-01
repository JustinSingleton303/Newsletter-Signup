const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.listen(port, ()=>{
  console.log("Running on port 3000");
});
