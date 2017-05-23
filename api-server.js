const Service = require('soa-demo-service');
const service = new Service('api');
service.clients();

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
	service.seneca.act(req.body, (err, result) => {
		res.send(JSON.stringify(result))
	});
});

app.listen(process.env.PORT);
