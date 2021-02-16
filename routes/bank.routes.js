const {Router} = require('express')
const Bank = require('../models/Bank.js')

const router = Router()

router.post('/create', async (req, res) => {
	try {
			// const errors = validationResult(req)
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		errors: errors.array(),
			// 		message: 'Невірні дані для регістрації!'
			// 	})
			// }
			// const { email, password } = req.body
			// const candidate = await User.findOne({email: email})
			// if (candidate) {
			// 	return res.status(400).json({message: 'Такий банк вже існує!'})
			// }
			// const hachedPassword = await bcrypt.hash(password, 12)
			// const user = new User({ email, hachedPassword })
			// await user.save()
			// res.status(201).json({message: 'Банк створений'})

		} catch (e) {
			res.status(500).json({message:'Не вийшло створити банк, спробуйте ще!'})
		}
})

router.get('/', async (req, res) => {
	try {
		const banks = await Bank.getAll({owner:null}) // owner: ??????????
		res.json(banks)
	} catch (e) {
			res.status(500).json({message:'Не вийшло зчитати список банків, спробуйте ще!'})
	}
})

router.get('/:id', async (req, res) => {
	try {
		const banks = await Bank.findById(req.params.id)
		res.json(banks)

	} catch (e) {
			res.status(500).json({message:'Не вийшло знайти банк, спробуйте ще!'})
	}
})

module.exports = router