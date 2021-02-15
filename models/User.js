const db = require('../db/db.js')

module.exports= class User {
 
    constructor({email, hachedPassword}) {
        this.email = email
        this.password = hachedPassword 
    }
    async save(){
        const newUser = await db.query('INSERT INTO users (email, password) values ($1, $2) RETURNING *', [this.email, this.password]);
    }
    static async findOne({email}) {
        /*user:  {id,email, password}*/
        //return user 
        return null
    }
    static async getAll(){
        const allUsers = await db.query('SELECT * FROM users;')
        return await allUsers.rows;
    }
    static async delete(id) {
        const user = await db.query(`DELETE  FROM users where id=$1  RETURNING *`, [id])
        return await user.rows
    }
}