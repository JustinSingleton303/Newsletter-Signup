const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');



app.listen(port, ()=>{
  console.log("Running on port 3000");
});
