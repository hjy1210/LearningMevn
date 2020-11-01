const path = require('path')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
// GraphQL schema
const graphqlSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			message: {
				type: GraphQLString,
				resolve() {
					return 'Root resolver';
				}
			}
		}
	})
});
const { importSchema } = require('graphql-import');
// Construct a schema, using GraphQL schema language
let typeDefs = importSchema(path.join(__dirname, './index.graphql'));
// The root provides a resolver function for each API endpoint
var resolvers = {
	Query: {
		message: () => {
			return 'Yang say Hello world!';
		}
	}
};

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { executableSchema };
