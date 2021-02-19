import React from 'react'
import {useHttp} from '../hooks/http.hook.js'

export const BanksManagePage = () => {

	const {request} = useHttp()

	const createList = async () => {
		try {
			const data = await request('/api/bank/banks', 'GET')
		} catch (e) {}
	}

	const findBank = async () => {
		try {
			const data = await request(`/api/bank/banks/${15}`, 'GET')
		} catch (e) {}
	}
	

	return (
		<div>
			<h1 onClick={createList}>Banks Manage Page</h1>
			<h2 onClick={findBank}>find 14 bank</h2>
		</div>
	)
}