import React, {useState, useEffect} from 'react'

export const BankCardData = (bank) => {
	
	const initialState = { loan:'', firstPayment:'', term: ''}
	const [form, setForm] = useState(initialState)
	const [monthPayment, setMonthPayment] = useState(null)
	const [isCalculate, setIsCalculate] = useState(false)

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}
	const calculateHandler = () => {
		const data = bank.bank[0]
		const isValidate =  (+form.loan <= +data.maxloan) && (+form.firstPayment >= +data.minpayment) && (+form.term <= +data.loanterm) 
		if ( isValidate ) {
			const r = data.interest/100/12
			const payment = (form.loan-form.firstPayment)*(r*Math.pow((1+r),form.term)/((Math.pow((1+ r),form.term)-1)))
			setMonthPayment(payment.toFixed(2))
			setIsCalculate(true)
		} else {
			setMonthPayment('Банк не може надати таку позику, змініть дані!')
			setIsCalculate(true)
		}
		//setForm(initialState)
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3 ">
				<h3>Введіть дані:</h3>

				<div className="input-field">
			      <input 
			        placeholder="Введіть суму позики"
			        id="loan"
			        type="text"
			        name="loan"
			        value={form.loan}
			        onChange={changeHandler}
			      />
			      <label htmlFor="loan">сума позики:</label>
			    </div>

				<div className="input-field">
			      <input 
			        placeholder="Введіть перший платіж"
			        id="firstPayment"
			        type="text"
			        name="firstPayment"
			        value={form.firstPayment}
			        onChange={changeHandler}
			      />
			      <label htmlFor="firstPayment">перший внесок</label>
			    </div>

			    <div className="input-field">
			      <input 
			        placeholder="Введіть термін позики"
			        id="term"
			        type="text"
			        name="term"
			        value={form.term}
			        onChange={changeHandler}
			      />
			      <label htmlFor="term">термін позик (місяців)</label>
			    </div>

				<button 
					className="btn waves-effect waves-light"
					type="submit"
					name="calculate"
					onClick={calculateHandler}
				>
				    Розрахувати
				</button>	
				<h5>{ (isCalculate) ?
				 <div className="card-panel">
				 	Щомісячний платіж:  
				 	<span className="blue-text text-darken-1">
				 	 {' ' + monthPayment}
				 	</span> 
				 </div> : ''}</h5>
			</div>
			
		</div>
	)
}