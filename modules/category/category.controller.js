const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function getCategoryList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit

    //  Get the list of category from the database with pagination 

    const categories = await knex('categories')
      .select(
       'categories.id',
       'categories.name', 
       'categories.url_code', 
       'categories.image_url'
      )
      .orderBy('id', 'asc')
      .limit(limit)
      .offset(offset)

    //  Get the total number of category  in the database

    const totalCategories = await knex('categories').count('id as count').first()

    // Calculate the total number of pages

    const totalPages = Math.ceil(totalCategories.count / limit)

    return res.status(200).json({categories, page, limit, totalPages, totalCategories: totalCategories.count })
    
}

async function getCategoryDetails(req, res) {
   
    let id = req.params.id
    let result = await knex('categories').where("id", id).first()

    res.send(result)
}

async function uploadCategoryImage(req, res) {
  if(!req.file) {
    return res.status(400).json({ error: 'No image uploaded'})
  }

  res.status(200).send({
    image_url: req.file.location,
    message: 'Image uploaded successfully'
  })
}

async function addCategories(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const {name, url_code, image_url} = req.body

    // check if url_code is exists in a database    
    const urlCodeExixts = await knex('categories').where('url_code', url_code).first()
   
    if(urlCodeExixts) {
        return res.status(400).json({error: 'url_code already exists'})
    }

    // Insert the category into the database
    await knex('categories').insert({name, url_code, image_url})

    return res.status(201).json({message: 'category added successfully'})
    
}

async function editCategory(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { name, url_code, image_url} = req.body;
  const id = req.params.id;
  
   // Check if the category exists in the database

  const category = await knex('categories').where({ id }).first();
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // check if url_code is exists in a database 

  const urlCodeExixts = await knex('categories').where('url_code', url_code).first()
 
  if(urlCodeExixts) {
      return res.status(400).json({error: 'url_code already exists'})
  } 



  await knex('categories').where({ id }).update({ name, url_code, image_url })

  return res.status(200).json({ message: 'Category updated successfully' })

}





module.exports = {
    getCategoryList,
    getCategoryDetails,
    uploadCategoryImage,
    addCategories,
    editCategory

}
