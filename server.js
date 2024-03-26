const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');



const StepCounterApp = require('./app');
app.use('/', StepCounterApp);

app.listen(process.env.PORT || 2000);