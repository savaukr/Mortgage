const express = require('express')
//const config = require('config')
//const PORT = config.get('port') || 5000
const appConfig = require('./config/appConfig.js')
const PORT = appConfig.port || 3000

const app = express()

app.use('api/auth', require('./routes/auth.routes.js'))
async function start() {
	try {
		app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}...`))	
	} catch (e) {
		console.log("Server Error ", e.message )
	}
}

start()
