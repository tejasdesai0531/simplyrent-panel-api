const knex = require('../../config/knex')


 async function getBanner(req, res) {

    let id = req.params.id
    let result = await knex('banner').where("id", id).first()


    res.send(result)
}

async function getBannerList(req, res) {

    let result = await knex('banner')

    res.send(result)
}


async function addBanner(req, res) {
    console.log(req.body)


    let image_url = req.body. image_url
    let redirect_url = req.body.redirect_url
    let status = req.body.status
    
    
   
    let banner = {
        image_url: image_url,
        redirect_url: redirect_url,
        status: status
       
    }
   
    let result = await knex('banner').insert(banner)
    res.send(result)
}




module.exports = {
    getBanner,
    getBannerList,
    addBanner

}