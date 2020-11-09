const express = require('express');
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
	req.yang="楊"
	next();
  }
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(loggingMiddleware);

app.use(
	'/graphql',
	graphqlHTTP({
		schema: executableSchema,
		graphiql: true
	})
);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}/graphql`);
});
