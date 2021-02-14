import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {BanksManagePage}  from './pages/BanksManagePage.js'
import {CreateBankPage} from './pages/CreateBankPage.js'
import {CalculatorBankPage} from './pages/CalculatorBankPage.js'
import {AuthPage} from './pages/AuthPage.js'

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/banks" exact>
					<BanksManagePage />
				</Route>
				<Route path="/create" exact>
					<CreateBankPage />
				</Route>
				<Route path="/calculator/:id" >
					<CalculatorBankPage />
				</Route>
				<Redirect to="/banks" />
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}