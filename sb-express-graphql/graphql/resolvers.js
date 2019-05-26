const { merge } = require("lodash");

const { resolvers: userResolvers } = require("./resolvers/user");
const { resolvers: todoResolvers } = require("./resolvers/todo");

const Resolvers = merge(userResolvers, todoResolvers);

module.exports = Resolvers;
