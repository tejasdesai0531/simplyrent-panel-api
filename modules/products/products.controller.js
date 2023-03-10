const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function getProductList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit

    //  Get the list of product from the database with pagination 

    const products = await knex('products')
      .select(
       'products.id',
       'products.name', 
       'products.url_code',
       'products.image_url',
       'products.deposit'
      )
      .orderBy('id', 'asc')
      .limit(limit)
      .offset(offset)

    //  Get the total number of products  in the database

    const totalProducts = await knex('products').count('id as count').first()

    // Calculate the total number of pages

    const totalPages = Math.ceil(totalProducts.count / limit)

    return res.status(200).json({products, page, limit, totalPages, totalProducts: totalProducts.count })
    
}

async function getProductDetails(req, res) {
   
    let id = req.params.id
    let result = await knex('products').where("id", id).first()

    res.send(result)
}

async function uploadProductImage(req, res) {
  if(!req.file) {
    return res.status(400).json({ error: 'No image uploaded'})
  }

  res.status(200).send({
    image_url: req.file.location,
    message: 'Image uploaded successfully'
  })
}

async function addProducts(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const {name, url_code, image_url, deposit} = req.body

    // check if product url_code is exists in a database    
    const productUrlCodeExits = await knex('products').where('url_code', url_code).first()
   
    if(productUrlCodeExits) {
        return res.status(400).json({error: 'product already exists'})
    }

    // Insert the product into the database
    await knex('products').insert({name, url_code, image_url, deposit})

    return res.status(201).json({message: 'product added successfully'})
    
}

async function editProduct(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { name, details, monthly_rent, deposit, image_url} = req.body;
  const id = req.params.id;
  
   // Check if the product exists in the database

  const category = await knex('products').where({ id }).first();
  if (!category) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // check if product is exists in a database 

  const productExixts = await knex('products').where('name', name).first()
 
  if(productExixts) {
      return res.status(400).json({error: 'product already exists'})
  } 



  await knex('products').where({ id }).update({ name, details, monthly_rent, deposit, image_url })

  return res.status(200).json({ message: 'Product updated successfully' })

}





module.exports = {
    getProductList,
    getProductDetails,
    uploadProductImage,
    addProducts,
    editProduct

}
