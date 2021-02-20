import React from 'react'
import {BankCardData} from './BankCardData.js'

export const BankCard = ({bank}) => {
	const data = bank[0]
	return (
		<>
			<h1>
				Розрахунок іпотеки   
				<strong> {data.name}</strong>
			</h1>
			<table className="striped">
		        <thead>
		          <tr> 
		              <th>Відсоток</th>
		              <th>Макс. сума</th>
		              <th>Мін. венесок</th>
		              <th>Макс. термін</th>
		          </tr>
		        </thead>
		        <tbody>
	        		<tr> 
			            <td>{data.interest}</td>
			            <td>{data.maxloan}</td>
			            <td>{data.minpayment}</td>
			            <td>{data.loanterm}</td>            
	          		</tr>
		        </tbody>
		    </table>
		    <BankCardData  bank={bank}/>
		</>
	)
}