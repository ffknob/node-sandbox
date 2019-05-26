const { mutations: userMutations } = require("./schemas/user");
const { mutations: todoMutations } = require("./schemas/todo");

const Mutation = `
	type Mutation {
        ${userMutations}
        ${todoMutations}
	}
`;

module.exports = Mutation;
