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
		              <th>Назва</th>
		              <th>Відсоток</th>
		              <th>Макс. сума</th>
		              <th>Мін. венесок</th>
		              <th>Макс. термін</th>
		              <th>Розрахувати</th>
		              <th>Змінити</th>
		              <th>Видалити</th>
		          </tr>
		        </thead>
		        <tbody>
		        {banks.map(bank => {
		        	return (
		        		<tr key={bank.id}>
				            <td>{bank.name}</td>
				            <td>{bank.interest}</td>
				            <td>{bank.maxloan}</td>
				            <td>{bank.minpayment}</td>
				            <td>{bank.loanterm}</td>
				            <td><Link to={`/calculator/${bank.id}`}>Розрахувати</Link></td>
				            <td><Link to={`/update/${bank.id}`}>Змінити</Link></td>
				            <td><Link to={`/delete/${bank.id}`}>Видалити</Link></td>
				            
		          		</tr>
		        	)
		        })}
		        
		        </tbody>
		     </table>
		</>
	)
}