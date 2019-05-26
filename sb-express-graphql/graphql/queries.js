const { queries: userQueries } = require("./schemas/user");
const { queries: todoQueries } = require("./schemas/todo");

const Query = `
    type Query {
        ${userQueries}
        ${todoQueries}
    }
`;

module.exports = Query;
