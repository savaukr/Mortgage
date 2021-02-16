import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import './navbar.css'

export const Navbar = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)

	const logoutHandler = (event) => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}
	
	return (
		<nav>
		    <div className="nav-wrapper blue-grey darken-1 nav-customer-style">
		      <a href="/" className="brand-logo">Калькулятор іпотеки</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li>
		        	<NavLink to="/banks">Список банків</NavLink>
		        </li>
		        <li>
		        	<NavLink to="/create">Створити банк</NavLink>
		        </li>
		        <li><a href="/" onClick={logoutHandler} >Вийти</a></li>
		      </ul>
		    </div>
		</nav>
	)
}