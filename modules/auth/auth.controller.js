const bcrypt = require('bcrypt')
const knex = require('../../config/knex')
const jwt = require('jsonwebtoken')


async function login(req, res) {

    const email = req.body.email
    const password = req.body.password

    let user = await knex('User').select("*").where("email", email).first()

    if(!user) {
        res.send({
            error: true,
            message: "Invalid email or password"
        })
        return
    }

    let matched = await bcrypt.compare(password, user.password);

    if(!matched) {
        res.send({
            error: true,
            message: "Invalid email or password"
        })
        return
    }

    // Generate JWT
    const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET
    );


    res.send({
        error: false,
        token: userJwt,
        message: "Login successfull"
    })

}

async function signup(req, res) {

    const name = req.body.name
    const contact = req.body.contact
    const email = req.body.email
    const password = req.body.password

    let user = await knex('User').select("*").where("email", email).first()

    if(user) {
        res.send({
            error: true,
            message: "Email already exists"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = {
        name,
        contact,
        email,
        password: hashedPassword
    }

    await knex('User').insert(newUser)

    res.send({
        error: false,
        message: "Account created successfully"
    })
}

module.exports = {
    login,
    signup
}