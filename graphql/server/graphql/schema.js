const graphql = require('graphql');

const Dish = require('./mongo-models/dish');
const Chef = require('./mongo-models/chef');

const path = require('path');
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
					return 'Root resolver!';
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
		message: (parent, args , context) => {
			return `express mongoose provide services, context.ip=${context.ip}, context.yang=${context.yang}`
		},
		dishes: (parent, args, context) => {
			return Dish.find();
		},
		chefs: () => {
			return Chef.find();
		},
		chef: (parent, args) => {
			return Chef.findById(args.id);
		},
		dish: (parent, args) => {
			return Dish.findById(args.id);
		},
		getDishes: async (parent, args) => {
			return await Dish.find({ chefid: args.chefid });
		}
	},
	Chef: {
		dishes: async (parent, args) => {
			return await Dish.find({ chefid: parent.id });
		}
	},
	Dish: {
		chef: async (parent, args) => {
			return await Chef.findById(parent.chefid);
		}
	},
	Mutation: {
		addDish: (root, args, context, info) => {
			let newDish = new Dish({
				name: args.input.name,
				country: args.input.country,
				tasty: args.input.tasty,
				chefid: args.input.chefid
			});
			return newDish.save();
		},
		updateDish: async (root, args, context, info) => {
			return await Dish.findByIdAndUpdate(args.id, args.input, { useFindAndModify: false, new: true });
		},
		deleteDish: async (parent, args, context) => {
			return await (await Dish.findById(args.id)).remove();
		},
		addChef: async (root, args, context, info) => {
			let newChef = new Chef(args.input);
			return await newChef.save();
		},
		updateChef: async (root, args, context, info) => {
			return await Chef.findByIdAndUpdate(args.id, args.input, { useFindAndModify: false, new: true });
		},
		deleteChef: async (parent, args, context) => {
			return await (await Chef.findById(args.id)).remove();
		}
	}
};

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { executableSchema };
