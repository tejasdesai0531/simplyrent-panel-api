const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function addCategoryCityMapping(req, res) {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
  }

  const {city_id, category_id, status} = req.body

  
  // Insert the category into the database
  await knex('category_city_mapping').insert({city_id, category_id, status})

  return res.status(201).json({message: 'category city added successfully'})
  
}


async function getCategoryCityMappingList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    let cityId = req.query.city_id

    //  Get the list of category city mapping from the database with pagination 

    const categoryList = await knex('category_city_mapping')
      .join('city', 'city.id', 'category_city_mapping.city_id')
      .join('categories', 'categories.id', 'category_city_mapping.category_id')
      .select(
       'category_city_mapping.id',
       'category_city_mapping.status',
       'categories.name as category_name',
       'city.name as city_name' 
      )
      .where('category_city_mapping.city_id', cityId)
      

    return res.status(200).json({categoryList})
    
}




async function editCategorycityMapping(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { city_id, category_id, status} = req.body;
  const id = req.params.id;
  
  const categoryCity = await knex('category_city_mapping').where({ id }).first();
  if (!categoryCity) {
    return res.status(404).json({ error: 'Category city mapping not found' });
  }



  await knex('categories').where({ id }).update({city_id, category_id, status})

  return res.status(200).json({ message: 'Category city mapping updated successfully' })

}





module.exports = {
    getCategoryCityMappingList,
    addCategoryCityMapping,
    editCategorycityMapping    
}
