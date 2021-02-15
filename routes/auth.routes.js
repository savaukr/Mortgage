const {Router} =require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig.js')

const {check, validationResult} = require('express-validator')
const User = require('../models/User.js')
const router = Router()

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Некоректний email').isEmail(),
		check('password', 'Мінімальна довжина пароля 5 символів')
			.isLength({min: 5})
	],
	async (req,res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Невірні дані для регістрації!'
				})
			}
			const { email, password } = req.body
			const candidate = await User.findOne({email: email})
			if (candidate) {
				return res.status(400).json({message: 'Такий користуач вже існує!'})
			}
			const hachedPassword = await bcrypt.hash(password, 12)
			const user = new User({ email, hachedPassword })
			await user.save()
			res.status(201).json({message: 'Користувач створений'})

		} catch (e) {
			res.status(500).json({message:'Не вийшло зареєструватись, спробуйте ще!'})
		}
})
// /api/auth/login
router.post('/login',
	[
			check('email', 'Введіть коректний email').normalizeEmail().isEmail(),
			check('password', 'Введіть пароль')
				.exists()
	],
	async (req,res) => {
		try {
				const errors = validationResult(req)
				if (!errors.isEmpty()) {
					return res.status(400).json({
						errors: errors.array(),
						message: 'Невірні дані при авторизації!'
					})
				}

				const {email, password} = req.body
				const user = await User.findOne({email})
				if (!user) {
					return res.status(400).json({message: 'Користувач з таким email не знайдено'})
				}
				const isMatch = await bcrypt.compare(password, user.password)
				if (!isMatch) {
					return res.sattus(400).json('Невіриний пароль!')
				}

				const token = jwt.sign(
					{userId: user.id},
					jwtConfig.jwtSecret,
					{expiresIn: '1h'}
				)

				res.json({token, userId: user.id})

			} catch (e) {
				res.status(500).json({message:'Не вийшло увійти в систему, спробуйте ще!'})
			}
})

module.exports = router 