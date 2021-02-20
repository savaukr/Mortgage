const Pool =  require('pg').Pool
const config = require('../config/dbConfig.js')

const pool = new Pool({...config, 
	connectionString: process.env.DATABASE_URL,
	ssl: {
	    rejectUnauthorized: false
	}
})
module.exports = pool