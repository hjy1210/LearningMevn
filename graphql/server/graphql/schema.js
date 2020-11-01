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

// Construct a schema, using GraphQL schema language
var typeDefs = `
  type Query {
    message: String
  }
  schema {
    query: Query
  }
`;
// The root provides a resolver function for each API endpoint
var resolvers = {
	Query: {
		message: () => {
			return 'Hello world!';
		}
	}
};

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { executableSchema };
