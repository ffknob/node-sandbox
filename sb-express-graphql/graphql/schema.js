const { buildSchema } = require("graphql");

const Types = require("./types");
const Query = require("./queries");
const Mutation = require("./mutations");
const Resolvers = require("./resolvers");
const Schema = `
	${Types}

	${Query}

	${Mutation}

    type Schema {
        query: Query
        mutation: Mutation
	}
`;

const builtSchema = buildSchema(Schema);

module.exports = {
  schema: builtSchema,
  resolvers: Resolvers
};
