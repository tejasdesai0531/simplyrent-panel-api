const knex = require('../../config/knex')
const { validationResult } = require("express-validator");


async function getBannerList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array() });
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const offset =(page - 1) * limit

    //  Get the list of banners from the database with pagination 

    const banners = await knex('banner')
    .orderBy('id', 'asc')
    .limit(limit)
    .offset(offset)

    //  Get the total number of banners in the database

    const totalBanners = await knex('banner').count('id as count').first()

    // Calculate the total number of pages

    const totalPages = Math.ceil(totalBanners.count / limit)

    return res.status(200).json({banners, page, limit, totalPages, totalBanners: totalBanners.count })
}


async function getBannerDetails(req, res) {
   
    let id = req.params.id
    let result = await knex('banner').where("id", id).first()

    res.send(result)
}


async function addBanner(req, res) {
    // console.log(req.body)
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    // verify if banner is uploaded or not

    if(!req.file) {
        return res.status(400).json({error: 'Banner not uploaded'})
    }

    const { image_url, redirect_url, status} = req.body
    // const image_url = req.file.location;

    // Check if the banner image or redirect_url already exists in the database

    const banner = await knex('banner').where({image_url}).orWhere({redirect_url}).first()

    if(banner) {
        return res.status(400).json({error: 'banner already exists'})
    }

    // Insert the banner into the database

    await knex('banner').insert({image_url, redirect_url, status})

    return res.status(201).json({message: 'Banner added successfully'})
    
}

async function editBanner(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { image_url, redirect_url, status} = req.body;
  const id = req.params.id;
  let bannerDetails = {
    image_url,
    redirect_url,
    status
  }
  if(req.file) {
    bannerDetails.image_url = req.file.location
  }
  
  // Check if the banner exists in the database

  const banner = await knex('banner').where({ id }).first();
  if (!banner) {
    return res.status(404).json({ error: 'Banner not found' });
  }

  // Check if the Banner image_url or redirect_url is already exists in the database

  const existingBanner = await knex('banner').whereNot('id', id).andWhere(function() {
    this.where('image_url', image_url).orWhere('redirect_url', redirect_url)
  }).first()

  if (existingBanner) {
    return res.status(400).json({ error: 'Banner already exists' })
  }

  // Update the banner in the database

  await knex('banner').where({ id }).update({ image_url, redirect_url, status })

  return res.status(200).json({ message: 'Banner updated successfully' })

}





module.exports = {
    getBannerList,
    getBannerDetails,
    addBanner,
    editBanner

}