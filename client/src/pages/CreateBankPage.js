import React from 'react'
import {useHttp} from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'

export const CreateBankPage = () => {

	const {loading, error, request, clearError} = useHttp()
	const message = useMessage()

	/////test
	const form = {name:"Jym6", interest:10, rate:15, maxLoan: 10, minPayment:1, loanTerm:50}
	/////////
	
	const createHandler = async () => {
		try {
			const data = await request('/api/bank/create', 'POST', {...form})
			message(data.message)
		} catch (e) {}
	}

	return ( 
		<div className="row">
			<div className="col s6 offset-s3">
				<div className="input-field">
			      <input 
			        placeholder="Введіть назву банку"
			        id="name"
			        type="text"
			        name="name"
			        onChange={(event)=>{event.target.value = form.name}}
			      />
			      <label htmlFor="password">Назва банку:</label>
			    </div>
				<h1 onClick={createHandler}>Create bank Page</h1>
			</div>
		</div>
	)
}