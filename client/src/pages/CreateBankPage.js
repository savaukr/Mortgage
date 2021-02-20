import React, {useState, useEffect, useContext, useCallback } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'

import './createBankPage.css'

export const CreateBankPage = ({isCreate}) => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const bankId = useParams().id 
	const {loading, error, request, clearError} = useHttp()
	const message = useMessage()
	//const userId = JSON.parse(localStorage.getItem('userData')).userId
	const initialState = {
		name:'', interest:'',
		maxLoan: '', minPayment:'', loanTerm:''
	}
	const [form, setForm] = useState(initialState)
	const [bank, setBank] = useState(null)

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

	const getBank = useCallback( async () => {
			try {
				const fetched =  await request(`/api/bank/banks/${bankId}`, 'GET', null, {
					Authorization: `Bearer ${auth.token}`
				})
				setBank(fetched)
				if (!isCreate) {
					setForm({
						...form,
						name: fetched[0].name,
						interest: fetched[0].interest,
						maxLoan: fetched[0].maxloan,
						minPayment: fetched[0].minpayment,
						loanTerm: fetched[0].loanterm
					})
				}
			} catch(e) {}

	}, [auth.token, bankId, request])

	

	useEffect( async () => {	
		getBank()
	}, [getBank])
		

	const updateHandler = async () => {
			try {
			const data = await request(`/api/bank/banks/${bankId}`, 'PUT', {...form}, {
				Authorization:`Bearer ${auth.token}`
			})
			message(data.message)
			history.push(`/calculator/${data[0].id}`)
		} catch (e) {message('Не вийшло зберегти зміни!')}
	}

	return ( 
		<div className="row padd">
			<div className="col s6 offset-s3 ">
				<h3 className="padd">{isCreate ? 'Створіть новий банк': 'Змініть умови банку'}</h3>

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
			        placeholder="Введіть річну процентну ставку"
			        id="interest"
			        type="text"
			        name="interest"
			        value={form.interest}
			        onChange={changeHandler}
			      />
			      <label htmlFor="interest">річна процентна ставка:</label>
			    </div>

			   <div className="input-field">
			      <input 
			        placeholder="Введіть максимальну суму позики"
			        id="maxLoan"
			        type="text"
			        name="maxLoan"
			        value={form.maxLoan}
			        onChange={changeHandler}
			      />
			      <label htmlFor="maxLoan">максимальна сума позики:</label>
			    </div>

			     <div className="input-field">
			      <input 
			        placeholder="Введіть мінімальний перший платіж"
			        id="minPayment"
			        type="text"
			        name="minPayment"
			        value={form.minPayment}
			        onChange={changeHandler}
			      />
			      <label htmlFor="minPayment">мінімальний перший платіж:</label>
			    </div>

			     <div className="input-field">
			      <input 
			        placeholder="Введіть максимальний термін позики"
			        id="loanTerm"
			        type="text"
			        name="loanTerm"
			        value={form.loanTerm}
			        onChange={changeHandler}
			      />
			      <label htmlFor="loanTerm">максимальний термін позики:</label>
			    </div>
				<button 
					className="btn waves-effect waves-light"
					type="submit"
					name="create"
					disabled={loading}
					onClick={isCreate ? createHandler : updateHandler}
				> {!!isCreate ?  'Створити' : 'Зберегти'}
				 </button>	
			</div>
			
		</div>
	)
}