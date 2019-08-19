const graphql = require('graphql');
const_ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy datas
var books = [
    {id: 1, name: 'Book 1'},
    {id: 2, name: 'Book 2'},
    {id: 3, name: 'Book 3'},
    {id: 4, name: 'Book 4'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            arg: {id: {type: GraphQLString}},
            resolve(parent, args) {
                args.id
                // get data from db / other source
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.export = new GraphQLSchema({
    query: RootQuery
});