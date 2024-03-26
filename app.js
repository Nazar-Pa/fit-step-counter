const express = require('express');
const app = express.Router();
const pool = require("./db");
const moment = require('moment');
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(express.json());

app.get('/', (req, res) => {
  res.render('getPage');
});


// create a route

app.post("/routes", async(req, res) => {
  try {
      // const { user_id } = req.query;
      const { u_id, name, phoneNumber, from, to, date, numbOfPass, price, carModel, note } = req.body;
      const newTodo = await pool.query(
          "insert into routes (u_id, from_city, to_city, route_date, numb_of_pass, price, car_model, name, phone_number, note) " + 
          "values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *", 
          [u_id, from, to, date, numbOfPass, price, carModel, name, phoneNumber, note]);
      res.json(newTodo.rows[0]);
  } catch (err) {
      console.log(err.message)
  }
})

// get all routes

app.get("/routes", async(req, res) => {
  try {
      const allRoutes = await pool.query("select * from routes");
      res.json(allRoutes.rows)
  } catch (err) {
      console.log(err.message);
  }
});


// filter routes for certain date, departure and arrival cities
// and number of seats

app.get("/routes/search", async(req, res) => {
  try {
      const { from, to, date, numbOfPass } = req.query;
      const [month, day, year] = date.split('/');
      const date1 = moment(new Date(+year, +month-1, +day, 0, 0, 0)).format('YYYY-MM-DD HH:mm:ss');
      const date2 = moment(new Date(+year, +month-1, +day, 23, 59, 0)).format('YYYY-MM-DD HH:mm:ss');
      const filteredRoutes = await pool.query("select * from routes where route_date between $1 and $2 and " +
      "from_city=$3 and to_city=$4 and numb_of_pass>=$5", [date1, date2, from, to, numbOfPass]);
      res.send(filteredRoutes.rows)
  } catch (err) {
      console.log(err.message);
  }
});


// get all trips of one driver

app.get("/routes/:id", async(req, res) => {
  const { id } = req.params;
  try {
      const allRoutes = await pool.query("SELECT " +
      "distinct to_char(route_date, 'yyyy-mm-dd'), " +
      "jsonb_agg(to_jsonb (t.*) - '{}'::text[]) AS data " +
      "FROM routes t where u_id=$1 GROUP BY 1 ORDER BY 1 desc", [id]);
      const allRoutesCount = await pool.query("select distinct to_char(route_date, 'mon-dd-yy'), * from routes where u_id=$1", [id]);
      res.json(allRoutes.rows)
  } catch (err) {
      console.log(err.message);
  }
});


// get single trip of the driver

app.get("/trips/new-trip", async(req, res) => {
  try {
      const { route_id } = req.query;
      const singleTrip = await pool.query("select * from routes " + 
      "where routes.route_id=$1", [route_id]);
      res.send(singleTrip.rows)
  } catch (err) {
      console.log(err.message);
  }
})


app.delete("/routes/:id", async(req, res) => {
  const { id } = req.params;
  try {
      const allRoutes = await pool.query("delete from routes where route_id=$1 ", [id]);
      res.json(allRoutes.rows)
  } catch (err) {
      console.log(err.message);
  }
});



// ?from=from&to=to&date1=date1&date2=date2&numbOfPass=numbOfPass

// create a new user

app.post("/users/user", async(req, res) => {
  try {
      const { name, email, phone, u_id } = req.body;
      const newUser = await pool.query("insert into users (name, email, phone, u_id) values($1,$2,$3,$4) returning *"
      ,[name, email, phone, u_id]);
      res.json(newUser.rows)
  } catch (err) {
      console.log(err.message);
  }
});

module.exports = app;

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