const Oracle = require('./oracle');

const oracle = new Oracle()
const QUERY = 'select * from usuario';
const MAX_ROWS = 5;

async function connect() {
    try {
        return await oracle.connect();
    } catch(e) {
       throw e;
    }
}

async function disconnect(connection) {
    try {
        return await oracle.disconnect(connection);
    } catch(e) {
       throw e;
    }
}

async function execQuery(connection, query, maxRows) {
    try {
        return await oracle.query(connection, query, maxRows);
    } catch(e) {
       throw e;
    }
}

async function main(query, maxRows) {
    try {
        let connection = await connect();
        console.log('Connected');

        let result = await execQuery(connection, query, maxRows);

        console.log(result);

        await disconnect(connection);

        console.log('Disconnected');
    } catch(e) {
        throw e;
    }
}

main(QUERY, MAX_ROWS);
