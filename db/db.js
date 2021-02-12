const Pool =  require('pg').Pool
const config = require('../config/dbConfig.js')
// const pool = new Pool({
// 	user : 
// 	password:
// 	host: 
// 	port:
// 	database: 
// })
const pool = new Pool(config)
module.exports = pool