const express = require('express');
const app = express.Router();
var request = require('request');

app.get('/', (req, res) => {
  res.render('getPage');

});

// var start = new Date();
//   start.setHours(0,0,0,0);
//   start.setDate(start.getDate() - 1);
// console.log(start.getTime());

// var end = new Date();
//   end.setHours(23,59,59,999);
//   end.setDate(end.getDate() - 1);
//   console.log(end.getTime());

// data = {
//     "aggregateBy": [{
//       "dataTypeName": "com.google.step_count.delta",
//       "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
//     }],
//     "bucketByTime": { "durationMillis": 86400000 },
//     "startTimeMillis": 1593640800000,
//     "endTimeMillis": 1593727199999
//   }

// var options = {
//   method: 'POST',
//   body: data,
//   json: true,
//   url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
// //   headers: {
// //     'Authorization':'Bearer ya29.a0AfH6SMDcQHZTznhEYZ9lefgu2Xo4GnvLJiFHQCkBFNZgl9x9RYJpExUyICuKIqrVFguY7BV2MnI-YiqZtJovDyMS57AmBG7T_NfBGxlpprWn9VxxAC0RGMvTt4zkNwYVETZdUkZ9IKbjmEPn2m8KOX_Dp2BEkSshCC4'
// //   },
//   form: {
//     grant_type: 'refresh_token',
//     client_id: '667463592541-13ect68o5qjqkuf35nj900nu9bjppj3c.apps.googleusercontent.com',
//     client_secret: 'bxS0VNRUX5Ons9xIYJev_w4M',
//     refresh_token: '1//04gVQioITzFdQCgYIARAAGAQSNwF-L9IrSzQDjFR7di3YDNiUwJrpDJ4qP3ibYHXoSV3Bhzh4hi7nS-nzRm8WwmJgf7g-Rw1kYXM',
//     //access_type: 'offline',
//     scope: 'https://www.googleapis.com/auth/fitness.activity.read'
//   }

// };

// function callback(error, response, body) {
//     console.log(error)
//     console.log(response)
//   if (!error && response.statusCode == 200) {


//     console.log(body.bucket[0].dataset[0].point[0].value[0].intVal);
//   }
// }

// request(options, callback);








// app.get('/', async (req, res) => {

//     try {
//         await axios.get('https://api.nutritionix.com/v1_1/search/apple?results=0:2&fields=nf_calories&appId=45d558a8&appKey=283a05f63e61bb5c305979fdfca57b28')
//             .then(response => {
//                 const temp = response.data.hits[0];
//                 const string = temp.fields.nf_calories;
//                 console.log(string);
//                 res.send(string.toString());
//             })
//             .catch((err) => console.log(err))
//     }
//     catch {
//         res.send('error');
//     }
// });



// app.post('/', (req, res) => {
//     res.render('getPage');

// });

// app.get('/', (req, res) => {
//     res.sendFile('getPage.html', { root: __dirname });
//     console.log(req.body);
// });





//ishleyen budu
// app.post('/', async (req, res) => {

//     try {
//         const parsedCity = JSON.parse(body);
//         city = req.body.queryResult.parameters['city'];
//         // const cityObject = JSON.stringify(cityOb);

//         // const city = parsedCity.parameter_name;

//         await axios.get('http://api.openweathermap.org/data/2.5/weather?q=berlin&appid=32dca906805ec17b4583f7028c673b88')
//             .then(response => {
//                 const temp = response.data.main.temp;
//                 console.log(temp);
//                 const answer = "";
//                 const responseObj = {
//                     "fulfillmentText": answer
//                     , "fulfillmentMessages": [{ "text": { "text": [city] } }]
//                     , "source": ""
//                 }
//                 return res.json(responseObj);
//                 res.sendStatus(temp);
//             })
//             .catch((err) => console.log(err))
//     }
//     catch {
//         res.send('error');
//     }
// });


// bu da ishdiyir
// app.post('/', (req, res) => {
//     return axios.get('http://api.openweathermap.org/data/2.5/weather?q=london&appid=32dca906805ec17b4583f7028c673b88')
//         .then(response => {
//             const temp = response.data.main.temp;
//             console.log(temp);
//             res.sendStatus(temp);
//         })
//         .catch((err) => console.log(err))


// });

module.exports = app;

//https://api.nutritionix.com/v1_1/search/apple?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=45d558a8&appKey=283a05f63e61bb5c305979fdfca57b28

// const city = agent.parameters.city;
// return axios.get('http://api.openweathermap.org/data/2.5/weather?q=berlin&appid=32dca906805ec17b4583f7028c673b88')
//     .then(response => {
//         const temp = response.data.main.temp;
//         console.log(temp);
//         agent.add(temp);
//     });


// function getWeather(agent) {
//     const city = agent.parameters.city;
//     return axios.get('http://api.openweathermap.org/data/2.5/weather?q=berlin&appid=32dca906805ec17b4583f7028c673b88')
//         .then((response) => {
//             const temp = response.data.main.temp;
//             agent.add(temp);

//         });


//dialogflowdaki kod
// function getWeather(agent) {
//     const city = agent.parameters.city;
//     return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=32dca906805ec17b4583f7028c673b88`)
//         .then((response) => {
//             const temp = response.data.main.temp;
//             const tempString = JSON.stringify(temp);
//             agent.add(tempString);

//         });