const db = require('../db/db.js')

module.exports= class Bank {
	constructor({name, interest, rate, maxLoan, minPayment, loanTerm, userId}) {
        this.name = name
        this.interest = interest 
        this.rate = rate
        this.maxLoan = maxLoan
        this.minPayment = minPayment
        this.loanTerm = loanTerm
        this.userId = userId

    }
    async save(){
        const newBank = await db.query(
	        'INSERT INTO banks (name, interest, rate, maxloan, 	minpayment, loanterm, userid ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING * ;',
	        [this.name, this.interest, this.rate, this.maxloan,
	         this.minpayment, this.loanterm, this.userid]
	    )
        return await newBank.rows
    }

    static async getAll(){
        const allBanks = await db.query('SELECT * FROM banks;')
        return await allBanks.rows;
    }

    // static async findByUserId({owner}) {
    //     const banks = await db.query('SELECT * FROM banks WHERE userId = $1;', [owner])
    //     return await banks.rows[0]
    // }

    static async findByName({name}) {
        const bank = await db.query('SELECT * FROM banks WHERE name = $1;', [name])
        return await bank.rows[0]
    }

    static async delete(id) {
        const bank = await db.query(`DELETE  FROM banks where id=$1  RETURNING * ;`, [id])
        return await bank.rows
    }
}