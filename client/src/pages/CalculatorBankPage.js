import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook.js'
import {AuthContext} from '../context/AuthContext.js'
import {Loader} from '../components/Loader.js'
import {BankCard} from '../components/BankCard.js'

export const CalculatorBankPage = () => {
	const {token} = useContext(AuthContext)
	const [bank, setBank] = useState(null)
	const bankId = useParams().id
	const {request, loading} = useHttp()

	const getBank = useCallback(async () => {
		try {
			const fetched = await request(`/api/bank/banks/${bankId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setBank(fetched)
		} catch(e) {

		}
	}, [token, bankId, request])

	useEffect(() => {
		getBank()
	}, [getBank])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{!loading && bank && <BankCard bank={bank}/>}
		</>
	)
}