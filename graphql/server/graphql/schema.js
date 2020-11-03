const graphql = require('graphql');

const Dish = require('./mongo-models/dish');
const Chef = require('./mongo-models/chef');


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
		message: () => {
			return 'Yang say Hello world!';
        },
        dishes: ()=>{
           return  Dish.find()
        },
        chefs: ()=>{
            return Chef.find()
        },
        chef:(parent,args)=>{
            return Chef.findById(args.id)
        },
        dish:(parent,args)=>{
            return Dish.findById(args.id)
        },
        getDishes:async (parent, args)=>{
            return await Dish.find({chefid:args.chefid})
        }
    },
    Chef:{
        dishes:async(parent,args)=>{
            return await Dish.find({chefid:parent.id})
        }
    },
    Dish:{
        chef:async(parent,args)=>{
            return await Chef.findById(parent.chefid)
        }
    },
    Mutation : {
        addChef:(root,args,context,info) => {
            let newChef = new Chef({name:args.input.name, rating:args.input.rating});
            return newChef.save()
        },
        addDish:(root,args,context,info) => {
            let newDish = new Dish({name:args.input.name, country:args.input.country, 
                tasty:args.input.tasty, chefid:args.input.chefid});
            return newDish.save()
        }

    }
    
};

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

module.exports = { executableSchema };