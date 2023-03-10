const knex = require('../../config/knex')
const { validationResult } = require('express-validator')


async function getProductIntervalList(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const offset = (page - 1) * limit

    //  Get the list of product interval from the database with pagination 

    const categories = await knex('product_interval')
      .select(
       'product_interval.id',
       'product_interval.duration'
      )
      .orderBy('id', 'asc')
      .limit(limit)
      .offset(offset)

    //  Get the total number of interval  in the database

    const totalCategories = await knex('product_interval').count('id as count').first()

    // Calculate the total number of pages

    const totalPages = Math.ceil(totalCategories.count / limit)

    return res.status(200).json({categories, page, limit, totalPages, totalCategories: totalCategories.count })
    
}

async function getProductIntervalDetails(req, res) {
   
    let id = req.params.id
    let result = await knex('product_interval').where("id", id).first()

    res.send(result)
}

 

async function addProductInterval(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const {duration} = req.body

    // check if duration is exists in a database    
    const durationExist = await knex('product_interval').where('duration', duration).first()
   
    if(durationExist) {
        return res.status(400).json({error: 'duration already exists'})
    }

    // Insert the duration into the database
    await knex('product_interval').insert({duration})

    return res.status(201).json({message: 'duration added successfully'})
    
}

async function editProductInterval(req, res) {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const {duration} = req.body;
  const id = req.params.id;
  
   // Check if the duration exists in the database

  const productDuration = await knex('product_interval').where({ id }).first();
  if (!productDuration) {
    return res.status(404).json({ error: 'duration not found' });
  }

  // check if duration is exists in a database 

  const durationExists = await knex('product_interval').where('duration', duration).first()
 
  if(durationExists) {
      return res.status(400).json({error: 'duration already exists'})
  } 



  await knex('product_interval').where({ id }).update({duration})

  return res.status(200).json({ message: 'duration updated successfully' })

}





module.exports = {
    getProductIntervalList,
    getProductIntervalDetails,
    addProductInterval,
    editProductInterval

}
