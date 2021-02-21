const express = require('express')
const path = require('path')
//const config = require('config')
//const PORT = config.get('port') || 5000
//const appConfig = require('./config/appConfig.js')
//const PORT = appConfig.port || 5000

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/bank', require('./routes/bank.routes.js'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

async function start() {
	try {
		//app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}...`))	
		app.listen(PORT, err => {
    		if(err) throw err;
			    console.log("%c Server running on port:", PORT);
		});
	} catch (e) {
		console.log("Server Error ", e.message )
	}
}

start()

