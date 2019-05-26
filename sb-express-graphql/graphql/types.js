const { types: userTypes } = require("./schemas/user");
const { types: todoTypes } = require("./schemas/todo");

const Types = `
    ${userTypes}
    ${todoTypes}
`;

module.exports = Types;
