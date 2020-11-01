const { GraphQLSchema, GraphQLObjectType, GraphQLString, buildSchema } = require('graphql');

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
var schema = buildSchema(`
  type Query {
    message: String
  }
`);
// The root provides a resolver function for each API endpoint
var resolver = {
	message: () => {
		return 'Hello world!';
	}
};

module.exports = { schema, resolver };
