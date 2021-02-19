import React from 'react'
import {Link} from 'react-router-dom'

export const BanksList = ({banks}) => {
	
	if (!banks.length) {
		return <p className="center">Жодного банку поки немає</p>
	}
	return (
		<>
			<table className="striped">
		        <thead>
		          <tr>
		              <th>Name</th>
		              <th>Interest Name</th>
		              <th>Rate</th>
		              <th>Loan Term</th>
		              <th>Max Loan</th>
		              <th>Min Payment</th>
		              <th>Розрахувати</th>
		              <th>Змінити</th>
		          </tr>
		        </thead>
		        <tbody>
		        {banks.map(bank => {
		        	return (
		        		<tr key={bank.id}>
				            <td>Alvin</td>
				            <td>Eclair</td>
				            <td>$0.87</td>
				            <td>$0.87</td>
				            <td>$0.87</td>
				            <td>$0.87</td>
				            <td><Link to={`/calculator/${bank.id}`}>Розрахувати</Link></td>
				            <td><Link to={`/create/${bank.id}`}>Змінити</Link></td>
				            
		          		</tr>
		        	)
		        })}
		        
		        </tbody>
		     </table>
		</>
	)
}