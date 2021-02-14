import React, {useState, useEffect} from 'react'
import './authPage.css'
import {useHttp} from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'

export const AuthPage =() => {
	const message = useMessage()
	const {loading, error, request, clearError} = useHttp()
	const [form, setForm]=useState({
		email:'', password:''
	})

	useEffect(() => {
		//message(error)
		clearError()
	}, [error, message, clearError])

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const registerHandler =  async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			//message(data.message)
			console.log('data:', data)
		} catch (e) {}
	}
	return (
		<div className="row">
			<div className="col s6 offset-s3">
			  <h3 className="center-align">Війдіть або зареєструйтесь</h3>
		      <div className="card blue-grey darken-1">
		        <div className="card-content white-text">
		          <span className="card-title">Введіть email та пароль:</span>
		          <div>
		          	<div className="input-field">
				      <input 
				        placeholder="Введіть email"
				        id="email"
				        type="text"
				        name="email"
				        onChange={changeHandler}
				      />
				      <label htmlFor="email">Email:</label>
				    </div>
				    <div className="input-field">
				      <input 
				        placeholder="Введіть пароль"
				        id="password"
				        type="password"
				        name="password"
				        onChange={changeHandler}
				      />
				      <label htmlFor="password">Пароль:</label>
				    </div>
		          </div>
		        </div>
		        <div className="card-action">
		          <button 
		          	className="btn-mrg btn waves-effect waves-light"
		          	name="sigin"
		          	disabled = {loading}
		          >
		          	Ввійти
				  </button>
				  <button 
				  	className="btn-mrg btn waves-effect waves-light"
				  	name="auther"
				  	onClick = {registerHandler}
				  	disabled = {loading}
				  >
		          	Зареєструватись
				  </button>
		        </div>
		      </div>
		    </div>
		</div>
	)
}