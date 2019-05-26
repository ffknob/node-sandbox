const graphqlHttp = require('express-graphql');

const { schema, resolvers } = require('../graphql/schema.js');

const graphql = graphqlHttp({
    graphiql: true,
    schema: schema,
    rootValue: resolvers
});

module.exports = graphql;