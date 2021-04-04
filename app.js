const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailChimp = require("@mailchimp/mailchimp_marketing");
const listID = '4f2529b3c7';
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mailChimp.setConfig({
  apiKey: '13b4944c4bbc8078cd2f743eb9',
  server: 'us1'
});

app.post('/', (req, res)=>{
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const eMail = req.body.email;
  const subscribingUser = {
        firstName: fName,
        lastName: lName,
        email: eMail

  };

  async function run(){
    const response = await mailchimp.lists.addListMember(listID,
    {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields:{
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
  }
  console.log('member add successful?');
  /*const jsonData = JSON.stringify(data);
  const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists/4f2529b3c7";
  https.request(url, options, (request)=>{

  });*/run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.listen(port, ()=>{
  console.log("Running on port 3000");
});



//api key 13b4944c4bbc8078cd2f743eb9
//list id 4f2529b3c7
