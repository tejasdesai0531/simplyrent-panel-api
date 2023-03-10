const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function addProductCityMapping(req, res) {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
  }

  const {city_id, product_id, status} = req.body

  
  // Insert the product into the database
  await knex('product_city_mapping').insert({city_id, product_id, status})

  return res.status(201).json({message: 'product city added successfully'})
  
}


async function getProductCityMappingList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    let cityId = req.query.city_id

    //  Get the list of product city mapping from the database with pagination 

    const productList = await knex('product_city_mapping')
      .join('city', 'city.id', 'product_city_mapping.city_id')
      .join('products', 'products.id', 'product_city_mapping.product_id')
      .select(
       'product_city_mapping.id',
       'product_city_mapping.status',
       'products.name as product_name',
       'city.name as city_name' 
      )
      .where('product_city_mapping.city_id', cityId)
      

    return res.status(200).json({productList})
    
}




async function editProductCityMapping(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { city_id, product_id, status} = req.body;
  const id = req.params.id;
  
  const productCity = await knex('product_city_mapping').where({ id }).first();
  if (!productCity) {
    return res.status(404).json({ error: 'Product city mapping not found' });
  }



  await knex('products').where({ id }).update({city_id, product_id, status})

  return res.status(200).json({ message: 'Product city mapping updated successfully' })

}





module.exports = {
    getProductCityMappingList,
    addProductCityMapping,
    editProductCityMapping    
}
