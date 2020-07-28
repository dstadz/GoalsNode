// require('dotenv').config();
// const knex = require('knex');


// const environment = process.env.DB_CONNECT || "development";

// // module.exports = knex(config[environment]);

// const config = {
//   client: 'sqlite3',
//   connection: { filename: './data/users.db3', },
//   useNullAsDefault: true,
// };

// module.exports = knex(config.development);


require('dotenv').config();

const knex = require("knex");
const config = require("../knexfile.js");
const environment = process.env.DB_CONNECT || "development";

module.exports = knex(config[environment]);