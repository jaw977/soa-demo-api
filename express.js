const Service = require('soa-demo-service');
const service = new Service('api');
service.clients();

var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', function (req, res) {
	service.seneca.act(req.body, function (err, result) {
		res.send(JSON.stringify(result))
	});
})

app.listen(process.env.PORT);
