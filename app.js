require('dotenv').config();
const request = require('request');
const fs = require('fs');
const base64 = require('node-base64-image');
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI('MLHPrimeMeme', process.env.RAPID_KEY);

const url = 'https://scontent-lax3-1.xx.fbcdn.net/t31.0-8/p720x720/15039727_1279372765446732_6130016329458279983_o.jpg';
const options = {string: true};

// test: http://requestb.in/12veuwg1
// real: https://api.projectoxford.ai/emotion/v1.0/recognize

base64.encode(url, options, (err, data) => {

  if (err) {
    console.log(err);
    return;
  }

  var buf = new Buffer(data, 'base64');

  request({
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    method: 'POST',
    json: false,
    body: buf,
    headers: {
      "Content-Type" : 'application/octet-stream',
      "Ocp-Apim-Subscription-Key" : process.env.MICROSOFT_EMOTION_KEY
    }

  }, (error, response, body) => {
    console.log(JSON.stringify(JSON.parse(response.body), null, 2));
  });

  // fs.writeFile('arghhhh.jpg', new Buffer(data, "base64"), (err) => {

  //   const image = fs.createReadStream('./arghhhh.jpg');

  //   rapid.call('MicrosoftEmotionAPI', 'getEmotionRecognition', { 
  //     'subscriptionKey': process.env.MICROSOFT_EMOTION_KEY,
  //     'image': image

  //   }).on('success', (payload) =>{
  //     // console.log(payload);
  //   }).on('error', (payload) =>{
  //     console.log(payload);
  //   });

    // request({
    //   url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    //   method: 'POST',
    //   json: false,
    //   body: image,
    //   headers: {
    //     "Content-Type" : 'application/octet-stream',
    //     "Ocp-Apim-Subscription-Key" : process.env.MICROSOFT_EMOTION_KEY
    //   }

    // }, (error, response, body) => {

    //   console.log(response.body);

    // });
  // });
});

