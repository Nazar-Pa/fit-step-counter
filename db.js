const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "admin",
//     host: "localhost",
//     port: 5432,
//     database: "perntodo"
// });

const pool = new Pool({
    user: "postgres",
    password: "awsThurisaz1#",
    host: "database-1.cigkj6ywrtu8.eu-central-1.rds.amazonaws.com",
    port: 5432,
    database: "demo"
});

module.exports = pool;