const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');

const properties = require('./config/properties');
const db = require('./config/database');

// * routes
const userRoutes = require('./api/user/user.routes');
const app = express();

// * configure bodyparser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

// * initialise express router
const router = express.Router();

// * call routing
userRoutes(router);

// * call the database connectivity function
db();

// * configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// * error handling
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization'
  );

  next();
});

// * use express router
app.use('/api', router);
app.use('/api/images', express.static('./images'));

// * return index.html
const cb_ok = (_, res) => res.status(200).sendFile(__dirname + '/public/index.html');
app.use(express.static(__dirname + '/public/'));
app.get('/', cb_ok);
app.get(/.*/, (_, res) => res.status(404).sendFile(__dirname + '/public/index.html'));

// * intialise server
app.listen(properties.PORT, () => {
  console.log(`Server is running on ${properties.PORT} port.`);
});
