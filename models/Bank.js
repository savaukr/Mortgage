const db = require('../db/db.js')

module.exports= class Bank {
	constructor({name, interest}) {
        this.name = name
        this.interest = interest 
    }
    async save(){
        const newBank = await db.query('INSERT INTO bankss (name, interest) values ($1, $2) RETURNING *', [this.name, this.interest]);
    }
    static async findByName({name}) {
        const bank = await db.query('SELECT * FROM banks WHERE name = $1;', [name])
        return await bank.rows[0]
    }
    static async findById({id}) {
        const bank = await db.query('SELECT * FROM banks WHERE bank = $1;', [id])
        return await bank.rows[0]
    }
    static async getAll({owner}){
        const allBanks = await db.query('SELECT * FROM banks WHERE userId = $1;', [owner])
        return await allBanks.rows;
    }
    static async delete(id) {
        const bank = await db.query(`DELETE  FROM bankss where id=$1  RETURNING *`, [id])
        return await bank.rows
    }
}