const db = require('../db/db.js')

module.exports= class Bank {

	constructor({name, interest, maxLoan, minPayment, loanTerm, userId}) {
        this.name = name
        this.interest = interest 
        this.maxLoan = maxLoan
        this.minPayment = minPayment
        this.loanTerm = loanTerm
        this.userId = userId
    }

    async save(){     
        const newBank = await db.query(
	        'INSERT INTO banks (name, interest, maxloan, minpayment, loanterm, userid ) values ($1, $2, $3, $4, $5, $6) RETURNING * ;',
	        [this.name, this.interest, this.maxLoan,
	         this.minPayment, this.loanTerm, this.userId]
	    )      
        return await newBank.rows
    }

    static async getAll(){
        const allBanks = await db.query('SELECT * FROM banks;')
        return await allBanks.rows;
    }
    static async getAllByUserId({userId}){
        const allBanks = await db.query('SELECT * FROM banks where userId= $1;', [userId])
        return await allBanks.rows;
    }

    static async findById({id}) {
        const bank = await db.query('SELECT * FROM banks WHERE id = $1;', [id])
        return await bank.rows
    }

    static async findByName({name}) {
        const bank = await db.query('SELECT * FROM banks WHERE name = $1;', [name])
        return await bank.rows[0]
    }
    static async update (bank) {
        const {name, interest, maxLoan:maxloan, minPayment:minpayment, loanTerm:loanterm, id} = bank
        const updatedBank = await db.query(`UPDATE banks SET name=$1, interest=$2, maxloan=$3, minpayment=$4, loanterm=$5 WHERE id = $6   RETURNING * ;`,
         [name, interest, maxloan, minpayment, loanterm, id])
        return await updatedBank.rows
    }

    static async delete({id}) {
        const bank = await db.query(`DELETE  FROM banks where id=$1  RETURNING * ;`, [id])
        return await bank.rows
    }
}