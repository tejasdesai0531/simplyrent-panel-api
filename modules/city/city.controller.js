const knex = require('../../config/knex')


async function getCityList(req, res) {


    let  query =  knex('simplyrent_dev.city')
    console.log(query.toString())
   
    let result = await query
    res.send(result)
    
}

async function getCityDetails(req, res) {

    let id = req.params.id 
    let result = await knex('simplyrent_dev.city').where("id", id).first()

    console.log((knex('simplyrent_dev.city').where("id", id).first()).toString())
    res.send(result)

}

async function addCity(req, res) {
    console.log(req.body)

    //step1: extract data from body
    let name = req.body.name
    let code = req.body.code
    let status = req.body.status
    let image_url = req.body.image_url
    
    //step2: create object to insert into database
    let city = {
        name: name,
        code: code,
        status: status,
        image_url: image_url
    }
    //step3: insert into table
    let result = await knex('simplyrent_dev.city').insert(city)
    console.log((knex('simplyrent_dev.city').insert(city)).toString())
    res.send(result)
}

module.exports = {
    getCityDetails,
    getCityList,
    addCity
}