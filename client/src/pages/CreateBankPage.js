import React, {useState, useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'

import './createBankPage.css'

export const CreateBankPage = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const {loading, error, request, clearError} = useHttp()
	const message = useMessage()
	const userId = JSON.parse(localStorage.getItem('userData')).userId
	const initialState = {
		name:'', interest:'', rate:'',
		maxLoan: '', minPayment:'', loanTerm:'', userId: userId
	}
	const [form, setForm] = useState(initialState)
	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	
	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const createHandler = async () => {
		try {
			const data = await request('/api/bank/create', 'POST', {...form}, {
				Authorization:`Bearer ${auth.token}`
			})
			message(data.message)
			history.push(`/calculator/${data[0].id}`)
		} catch (e) {}
	}

	return ( 
		<div className="row padd">

			<div className="col s6 offset-s3 ">
				<h3 className="padd" onClick={createHandler}>Створіть новий банк:</h3>

				<div className="input-field">
			      <input 
			        placeholder="Введіть назву банку"
			        id="name"
			        type="text"
			        name="name"
			        value={form.name}
			        onChange={changeHandler}
			      />
			      <label htmlFor="name">Назва банку *:</label>
			    </div>

			    <div className="input-field">
			      <input 
			        placeholder="Введіть процентну ставку банку"
			        id="interest"
			        type="text"
			        name="interest"
			        value={form.interest}
			        onChange={changeHandler}
			      />
			      <label htmlFor="interest">процентна ставка банку:</label>
			    </div>

			    <div className="input-field">
			      <input 
			        placeholder="Введіть rate банку"
			        id="rate"
			        type="text"
			        name="rate"
			        value={form.rate}
			        onChange={changeHandler}
			      />
			      <label htmlFor="rate">rate  банку:</label>
			    </div>

			   <div className="input-field">
			      <input 
			        placeholder="Введіть maxLoan банку"
			        id="maxLoan"
			        type="text"
			        name="maxLoan"
			        value={form.maxLoan}
			        onChange={changeHandler}
			      />
			      <label htmlFor="maxLoan">maxLoan банку:</label>
			    </div>

			     <div className="input-field">
			      <input 
			        placeholder="Введіть minPayment банку"
			        id="minPayment"
			        type="text"
			        name="minPayment"
			        value={form.minPayment}
			        onChange={changeHandler}
			      />
			      <label htmlFor="minPayment">minPayment банку:</label>
			    </div>

			     <div className="input-field">
			      <input 
			        placeholder="Введіть loanTerm банку"
			        id="loanTerm"
			        type="text"
			        name="loanTerm"
			        value={form.loanTerm}
			        onChange={changeHandler}
			      />
			      <label htmlFor="loanTerm">loanTerm банку:</label>
			    </div>
				<button 
					className="btn waves-effect waves-light"
					type="submit"
					name="create"
					disabled={loading}
					onClick={createHandler}
				>
				    Створити
				 </button>	
			</div>
			
		</div>
	)
}