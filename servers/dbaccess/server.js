var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql/msnodesqlv8');

var app = express();

var corsOptions = {
 origin: '*',
 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var sqlConfigs = {
 "DEV": {
  server: '',
  connectionTimeout: 60000,
  requestTimeout: 60000,
  options: {
   encrypt: false,
   trustedConnection: true
  }
 },
 "UAT": {
  server: '',
  connectionTimeout: 60000,
  requestTimeout: 60000,
  options: {
   encrypt: false,
   trustedConnection: true
  }
 },
 "PROD": {
  server: '',
  connectionTimeout: 60000,
  requestTimeout: 60000,
  options: {
   encrypt: false,
   trustedConnection: true
  }
 }
};

app.get('/databases', function (req, res, next) {
 res.end(JSON.stringify([]));
});

app.get('/environments', function (req, res, next) {
 res.end(JSON.stringify(Object.keys(sqlConfigs)));
});

app.post('/databases/:environment/:database', function (req, res, next) {
 var sqlConfig = sqlConfigs[req.params.environment];
 var database = req.params.database;

 if (!sqlConfig || !database) {
  res.send(400, "Invalid environment or database");
 }
 else {
  sqlConfig.database = database;
  var request = sqlConfig.context.request().query(req.body.paragraph.content, function (err, recordset) {
   if (err) {
    next(err);
   }
   else {
    res.end(JSON.stringify(recordset));
   }
  });
 }
});

var server = app.listen(9082, function () {
 Object.keys(sqlConfigs).forEach(sqlConfigKey => {
  var sqlConfig = sqlConfigs[sqlConfigKey];
  sqlConfig.context = new sql.ConnectionPool(sqlConfig);
  sqlConfig.context.connect();
 });

 console.log("API Server listening at http://%s:%s", server.address().address, server.address().port);
});