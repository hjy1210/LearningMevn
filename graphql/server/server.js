require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const {graphqlHTTP} = require('express-graphql');

const mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongo.connection.once('open', () => {
    console.log('connected to database');
})
const modelschema = require('./graphql/modelschema')

const {executableSchema} = require('./graphql/schema');
const loggingMiddleware = (req, res, next) => {
	req.yang="楊"+((req.cookies && req.cookies.jwt)?req.cookies.jwt:"")
	next();
  }
const cors = require('cors');

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: process.env.ACCESS_TOKEN_SECRET || "swsh23hjddnns",
    algorithms: ['HS256'],
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.cookies && req.cookies.jwt){
            return req.cookies.jwt
        }
        else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
});
const {login, refresh} = require('./authentication')

const app = express();


app.use(cors({
  origin: 'http://192.168.0.6:3002',   ///// http://localhost:3002 並不相同 CORS 問題
  credentials: true,
  exposedHeaders: ["Set-Cookie"]
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(loggingMiddleware);


app.post('/login', login)
app.post('/refresh', refresh)

app.use(
	'/graphql',
	jwtMW,     ///// DONT know to to send cookie in apollo object of client
	graphqlHTTP({
		schema: executableSchema,
		graphiql: true
	})
);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}/graphql`);
});
