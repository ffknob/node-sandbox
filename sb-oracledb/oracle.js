const oracledb = require('oracledb');
require('dotenv').config();

module.exports = class Oracle {
    constructor() { }

    getUser() {
        return process.env.NODE_ORACLEDB_USER;
    }

    getPassword() {
        return process.env.NODE_ORACLEDB_PASSWORD;
    }

    getConnectionString() {
        return process.env.NODE_ORACLEDB_CONNECTIONSTRING;
    }

    connect() {
        return new Promise((resolve, reject) => {
          oracledb.getConnection(
            {
              user: this.getUser(),
              password: this.getPassword(),
              connectString: this.getConnectionString()
            },
            (err, connection) => {
              if (err) {
                reject(err);
              } 
              
              resolve(connection);
            })
        });
    }

    disconnect(connection) {
      return new Promise((resolve, reject) => {
        connection.close(
          function(err) {
            if (err) {
              reject(err.message);
            }

            resolve();
          });
      });
    }

    query(connection, query, maxRows = 1) {
      return new Promise((resolve, reject) => {
        connection.execute(
          query,
          [],
          { maxRows: maxRows },
          function(err, result) {
            if (err) {
              reject(err);
            }

            resolve(result);
          });
      });
    }
}