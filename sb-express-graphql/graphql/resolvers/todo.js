const todosData = require("../../data/todos.json");

const resolvers = {
  todos: () => {
    return todosData;
  },

  createTodo: args => {
    console.log(args);
  }
};

module.exports = { resolvers };
