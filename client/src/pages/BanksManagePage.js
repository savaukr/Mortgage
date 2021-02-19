import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook.js'
import {AuthContext} from '../context/AuthContext.js'
import {Loader} from '../components/Loader.js'
import {BanksList} from '../components/BanksList.js'

export const BanksManagePage = () => {
	const [banks, setBanks] = useState([])
	const {request, loading} = useHttp()
	const {token} = useContext(AuthContext)

	const fetchBanks = useCallback(async () => {
		try {
			const data = await request('/api/bank/banks', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setBanks(data)
		} catch (e) {}
	}, [token. request])

	useEffect(() => {
		fetchBanks()
	}, [fetchBanks])

	// const findBank = async () => {
	// 	try {
	// 		const data = await request(`/api/bank/banks/${15}`, 'GET')
	// 	} catch (e) {}
	// }
	if (loading) {
		return <Loader />
	}

	return (
		<>
			{!loading && <BanksList banks={banks} />}
		</>
	)
}