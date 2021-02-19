const {Router} = require('express')
const Bank = require('../models/Bank.js')
const auth = require('../middleware/auth.middleware.js')
const appConfig = require('../config/appConfig.js')

const router = Router()

router.post('/create', async (req, res) => {
	try {

		const  { name, interest, rate, maxLoan, 
		 	    minPayment, loanTerm, userId } = req.body
		//const  userId = req.user.userId	
		const bank = new Bank({name, interest, rate, maxLoan, minPayment, loanTerm, userId})

		const createdBank = await bank.save()
		res.status(201).json({...createdBank, message: 'Банк створений'})
		
	} catch (e) {
			res.status(500).json({message:'Не вийшло створити банк, спробуйте ще!'})
	}
})

router.get('/banks/:id', async (req, res) => {
	try {
		const id = req.params.id
		const bank = await Bank.findById({id})
		res.status(201).json(bank)

	} catch (e) {
			res.status(500).json({message:'Не вийшло знайти банк, спробуйте ще!'})
	}
})

	// router.get('/banks/:name', async (req, res) => {
	// 	try {
	// 		const banks = await Bank.findByName(req.params.name)
	// 		res.json(banks)

	// 	} catch (e) {
	// 			res.status(500).json({message:'Не вийшло знайти банк, спробуйте ще!'})
	// 	}
	// })

router.get('/banks', async (req, res) => {
	try {
		const banks = await Bank.getAll()
		//const banks = await Bank.findByUserId({owner:req.user.userId}) // may be without owner????
		res.status(201).json(banks)
		//res.status(201).json(JSON.stringify(banks))
	} catch (e) {
			res.status(500).json({message:'Не вийшло зчитати список банків, спробуйте ще!'})
	}
})



module.exports = router