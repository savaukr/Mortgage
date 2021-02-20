import React, {useCallback, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook.js'
import {Loader} from '../components/Loader.js'
import {useMessage} from '../hooks/message.hook.js'

export const DeleteBankPage = () => {
	const message = useMessage()
	const history = useHistory()
	const bankId = useParams().id
	const {token} = useContext(AuthContext)
	const {request, loading} = useHttp()

	const deleteBank = useCallback(async () => {
		try {
			const fetched = await request(`/api/bank/banks/${bankId}`, 'DELETE', null, {
				Authorization: `Bearer ${token}`
			})
			message(fetched.message)
			history.push('/banks')
		} catch(e) {

		}
	}, [token, bankId, request])

	if (loading) {
		return <Loader />
	}
	return (
		<div className="row padd">
			<div className="col s6 offset-s3 ">
				<h5>Ви впевнені, що хочете видалити банк?</h5>
				<button 
						className="btn waves-effect waves-light"
						type="submit"
						name="create"
						disabled={loading}
						onClick={deleteBank}
				>
					    Видалити
				</button>
				<button 
						className="btn waves-effect waves-light"
						type="submit"
						name="create"
						disabled={loading}
						onClick={()=> {history.push('/banks')}}
				>
					    Відмінити
				</button>
			</div>
		</div>	
	)
}
