const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function addProductIntervalMapping(req, res) {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
  }

  const {product_id, interval_id, price, status} = req.body

  
  // Insert the product interval  into the database
  await knex('product_interval_mapping').insert({product_id, interval_id, price, status})

  return res.status(201).json({message: 'product interval and price added successfully'})
  
}


async function getProductIntervalMappingList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    let productId = req.query.product_id

    //  Get the list of product interval mapping from the database with pagination 

    const productList = await knex('product_interval_mapping')
      .join('products', 'products.id', 'product_interval_mapping.product_id')
      .join('product_interval', 'product_interval.id', 'product_interval_mapping.interval_id')
      .select(
       'product_interval_mapping.id',
       'product_interval_mapping.price',
       'product_interval_mapping.status',
       'products.name as product_name'
      //  'product_interval.duration as duration' 
      )
      .where('product_interval_mapping.product_id', productId)
      

    return res.status(200).json({productList})
    
}




async function editProductIntervalMapping(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { product_id, interval_id, price, status} = req.body;
  const id = req.params.id;
  
  const productIntervalId = await knex('product_interval_mapping').where({ id }).first();
  if (!productIntervalId) {
    return res.status(404).json({ error: 'product interval mapping not found' });
  }



  await knex('product_interval_mapping').where({ id }).update({product_id, interval_id, price, status})

  return res.status(200).json({ message: 'Product interval mapping updated successfully' })

}





module.exports = {
    getProductIntervalMappingList,
    addProductIntervalMapping,
    editProductIntervalMapping    
}
