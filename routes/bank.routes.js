const {Router} = require('express')
const Bank = require('../models/Bank.js')
const auth = require('../middleware/auth.middleware.js')
const appConfig = require('../config/appConfig.js')

const router = Router()

router.post('/create', auth, async (req, res) => {
	try {

		const  { name, interest, maxLoan, 
		 	    minPayment, loanTerm} = req.body
		const  userId = req.user.userId	
		const bank = new Bank({name, interest, maxLoan, minPayment, loanTerm, userId})
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
	
router.get('/banks', auth, async (req, res) => {
	try {
		//const banks = await Bank.getAll()
		const banks = await Bank.getAllByUserId({userId: req.user.userId}) // may be without owner????
		res.status(201).json(banks)
	} catch (e) {
			res.status(500).json({message:'Не вийшло зчитати список банків, спробуйте ще!'})
	}
})

router.put('/banks/:id', auth, async (req, res) => {
	try {
		const id = req.params.id
		const updatedBank = await Bank.update({...req.body, id:id})
		res.status(201).json({...updatedBank, message: 'Умови банку змінено'})	
	} catch (e) {
			res.status(500).json({message:'Не вийшло змінити умови банку, спробуйте ще!'})
	}
})

router.delete('/banks/:id', async (req, res) => {
	try {
		const id = req.params.id
		const bank = await Bank.delete({id})
		res.status(201).json(bank)
	} catch (e) {
			res.status(500).json({message:'Не вийшло видалити банк, спробуйте ще!'})
	}
})


module.exports = router