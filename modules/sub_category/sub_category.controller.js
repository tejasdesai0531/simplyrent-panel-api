const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function getSubCategoryList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit

    //  Get the list of sub_category from the database with pagination 

    const subCategories = await knex('sub_categories')
      .join('categories', 'categories.id', 'sub_categories.category_id')
      .select(
        'sub_categories.id', 
        'sub_categories.name', 
        'sub_categories.url_code',
        'sub_categories.image_url',
        'sub_categories.category_id'
        )
      .orderBy('id', 'asc')
      .limit(limit)
      .offset(offset)

    //  Get the total number of banners in the database

    const totalSubCategories = await knex('sub_categories').count('id as count').first()

    // Calculate the total number of pages

    const totalPages = Math.ceil(totalSubCategories.count / limit)

    return res.status(200).json({subCategories, page, limit, totalPages, totalSubCategories: totalSubCategories.count })
    
}

async function getSubCategoryDetails(req, res) {
   
    let id = req.params.id
    let result = await knex('sub_categories').where("id", id).first()

    res.send(result)
}

async function uploadSubCategoryImage(req, res) {
  if(!req.file) {
    return res.status(400).json({ error: 'No image uploaded'})
  }

  res.status(200).send({
    image_url: req.file.location,
    message: 'Image uploaded successfully'
  })
}

async function addSubCategories(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const {name, url_code, image_url, category_id} = req.body

    // check if city is exists in a database    
    const isCategoryExists = await knex('categories').where('id', category_id).andWhere('url_code', url_code).first()
   
    if(!isCategoryExists) {
        return res.status(400).json({error: 'category id and category code is invalid'})
    }

    //check if category exists in a database
    // const isUrlCodeExists = await knex('categories').where('url_code', url_code).first()

    // if(!isUrlCodeExists) {
    //   return res.status(400).json({error: 'category code is invalid'})
    // }


    // Insert the category into the database
    await knex('sub_categories').insert({name, url_code, image_url, category_id})

    return res.status(201).json({message: 'sub category added successfully'})
    
}

async function editSubCategory(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { name, url_code, image_url, category_id} = req.body;
  const id = req.params.id;
  


  const subCategory = await knex('sub_categories').where({ id }).first();
  if (!subCategory) {
    return res.status(404).json({ error: 'sub Category not found' });
  }



  await knex('sub_categories').where({ id }).update({ name, url_code, image_url, category_id})

  return res.status(200).json({ message: 'sub Category updated successfully' })

}





module.exports = {
    getSubCategoryList,
    getSubCategoryDetails,
    uploadSubCategoryImage,
    addSubCategories,
    editSubCategory

}
