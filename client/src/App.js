import React from 'react'

import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes.js'
import {useAuth} from './hooks/auth.hook.js'
import {AuthContext} from './context/AuthContext.js'
import {Navbar} from './components/Navbar.js'
import {Loader} from './components/Loader.js'

import 'materialize-css'

function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated =!!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
  	<AuthContext.Provider value={{
  		token, login, logout, userId, isAuthenticated
  	}}>
	    <Router>
        {isAuthenticated && <Navbar />}
	      <div className="container">
	        {routes}
	      </div>
	    </Router>
	</AuthContext.Provider>
  );
}

export default App;
