const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



const StepCounterApp = require('./app');
app.use('/', StepCounterApp);

app.listen(process.env.PORT || 2000);