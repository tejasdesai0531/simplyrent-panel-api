const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function addSubCategoryCityMapping(req, res) {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
  }

  const {city_id, sub_category_id, status} = req.body

  
  // Insert the sub_category into the database
  await knex('sub_category_city_mapping').insert({city_id, sub_category_id, status})

  return res.status(201).json({message: 'sub_category city added successfully'})
  
}


async function getSubCategoryCityMappingList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    let cityId = req.query.city_id

    //  Get the list of category city mapping from the database with pagination 

    const categoryList = await knex('sub_category_city_mapping')
      .join('city', 'city.id', 'sub_category_city_mapping.city_id')
      .join('sub_categories', 'sub_categories.id', 'sub_category_city_mapping.category_id')
      .select(
       'sub_category_city_mapping.id',
       'sub_category_city_mapping.status',
       'sub_categories.name as sub_category_name',
       'sub_city.name as city_name' 
      )
      .where('sub_category_city_mapping.city_id', cityId)
      

    return res.status(200).json({categoryList})
    
}




async function editSubCategorycityMapping(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { city_id, sub_category_id, status} = req.body;
  const id = req.params.id;
  
  const subCategoryCity = await knex('sub_category_city_mapping').where({ id }).first();
  if (!subCategoryCity) {
    return res.status(404).json({ error: 'sub_Category city mapping not found' });
  }



  await knex('sub_categories').where({ id }).update({city_id, sub_category_id, status})

  return res.status(200).json({ message: 'Category city mapping updated successfully' })

}





module.exports = {
    addSubCategoryCityMapping,
    getSubCategoryCityMappingList,
    editSubCategorycityMapping    
}
