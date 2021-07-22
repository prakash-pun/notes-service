# notes-service
## note service app with mongoose amqp (Rabbitmq)

## create `.env` in root folder

```
PORT=300
DB_PORT=5432
DB_HOST=localhost
DB_DATABASE=<database_name>
DB_USERNAME=<db_username>
DB_PASSWORD=<password>
JWT_SECRET_KEY=<secret_key>
CLOUDAMQP_URL=<rabbitmq_url>
ORIGIN=<origin>
SERVICES=<services>
```

- create CLOUDAMQP_URL from [cloudamqp](https://www.cloudamqp.com/)

- another repo connected with this application [type-express-app](https://github.com/prakash-pun7/type-express-app.git)
