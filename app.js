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

// DO NOT COMMIT WITH APIKEY POPULATED
mailChimp.setConfig({
  apiKey: '32f7267062289b51b71dd14b8e5eddc6-us1',
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
    const response = await mailChimp.lists.addListMember(listID,
    {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields:{
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });res.sendFile(__dirname + "/success.html");
    console.log(`Successfully added contact as an audience member. The contact's id is ${
   response.id
   }.`);
  }


  /*const jsonData = JSON.stringify(data);
  const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists/4f2529b3c7";
  https.request(url, options, (request)=>{

  });*/run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.listen( process.env.PORT || port, ()=>{
  console.log("Running on port 3000");
});
