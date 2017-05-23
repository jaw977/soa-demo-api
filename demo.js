const Promise = require('bluebird');
const Service = require('soa-demo-service');
const service = new Service('api');
service.clients();

const act = Promise.promisify(service.seneca.act, {context:service.seneca});

var requests = [
	{role:"user", cmd:"add", username:"buyer1",password:"b1pass"},
	{role:"user", cmd:"add", username:"buyer1",password:"b1pass"},
	{role:"user", cmd:"add", username:"buyer2",password:"b2pass"},
	{role:"user", cmd:"add", username:"seller1",password:"s1pass"},
	{role:"user", cmd:"authn", username:"buyer1",password:"wrong"},
	{role:"user", cmd:"authn", username:"buyer1",password:"b1pass"},
	{role:"user", cmd:"authn", username:"buyer2",password:"b2pass"},
	{role:"user", cmd:"authn", username:"seller1",password:"s1pass"},
	{role:"listing", cmd:"add", token:"seller1", category:"Toys", title:"PS4 Consoles", amount:100},
	{role:"listing", cmd:"add", token:"seller1", category:"Toys", title:"XBox1 Consoles", amount:100},
	{role:"listing", cmd:"add", token:"seller1", category:"Laptops", title:"MacBooks", amount:100},
	{role:"listing", cmd:"search", category:"Toys"},
	{role:"listing", cmd:"search", category:"Laptops", page:1},
	{role:"listing", cmd:"search", sellerUsername:"seller1"},
	{role:"bid", cmd:"add", token:"buyer1", listingId:1, amount:50},
	{role:"bid", cmd:"add", token:"buyer1", listingId:1, amount:100},
	{role:"bid", cmd:"add", token:"buyer2", listingId:1, amount:200},
	{role:"bid", cmd:"add", token:"buyer1", listingId:1, amount:150},
	{role:"bid", cmd:"add", token:"buyer1", listingId:1, amount:300},
	{role:"bid", cmd:"list", listingId:1},
];

var tokenFor = {};
	
async function demo () {
	for (let request of requests) {
		console.log(" REQUEST: " + JSON.stringify(request));
		let tokenUser = request.token;
		if (tokenUser) request.token = tokenFor[tokenUser];
		let response = await act(request);
		if (response.token) tokenFor[request.username] = response.token;
		console.log("RESPONSE: " + JSON.stringify(response));
		console.log("");
		await Promise.delay(100);
	}
}

demo();
