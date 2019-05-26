const types = `
    type Todo {
        id: ID!
        userId: ID!
        title: String!
        completed: Boolean!
    }

    input TodoInput {
        userId: ID!
        title: String!
        completed: Boolean!
    }
`;

const queries = `
    todos: [Todo!]!
`;

const mutations = `
    createTodo(todoInput: TodoInput): Todo
`;

module.exports = { types, queries, mutations };
