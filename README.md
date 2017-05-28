## SOA Demo:  Web API

Listens on a port for HTTP requests, which are expected to be JSON messages.  Routes the message to the appropriate service using https://github.com/jaw977/soa-demo-service-amqp and responds with JSON.

```
$ curl -H "Content-Type: application/json" -d '{"role":"user","cmd":"authn","username":"wrong","password":"wrong"}' http://localhost:8080               
{"error":"Invalid Username or Password."}
```

### Configuration

All configuration happens in environment variables.

* `PORT`: Port number to listen for HTTP requests.
* `RABBITMQ_URL`: URL for RabbitMQ messaging server.
