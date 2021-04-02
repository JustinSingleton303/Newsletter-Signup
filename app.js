const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



app.post('/', (req, res)=>{
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const eMail = req.body.email;
  const data = {
    members:[
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields:{
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.listen(port, ()=>{
  console.log("Running on port 3000");
});

//api key 13b4944c4bbc8078cd2f743eb9
//list id 4f2529b3c7
