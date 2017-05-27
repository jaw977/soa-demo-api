const Service = require('soa-demo-service-amqp');
const service = new Service('api');

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
	service.request(req.body).then( json => { res.send(json); });
});

app.listen(process.env.PORT);
