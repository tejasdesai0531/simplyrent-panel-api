const knex = require("../../config/knex");
const { validationResult } = require("express-validator");


async function getCityList(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
  
    // Get the list of cities from the database with pagination
    const cities = await knex('city')
      .orderBy('id', 'desc')
      .limit(limit)
      .offset(offset);
  
    // Get the total number of cities in the database
    const totalCities = await knex('city').count('id as count').first();
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCities.count / limit);
  
    return res.status(200).json({ cities, page, limit, totalPages, totalCities: totalCities.count });
  
}

async function getCityDetails(req, res) {
  let id = req.params.id;
  let result = await knex("city").where("id", id).first();

  // console.log((knex('simplyrent_dev.city').where("id", id).first()).toString())
  res.send(result);
}

async function addCity(req, res) {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

  const { name, code, status} = req.body;
  const image_url = req.file.location;
  // Check if the city code or name already exists in the database
  const city = await knex("city").where({name}).orWhere({code}).first();
  if (city) {
    return res.status(400).json({ error: "City already exists" });
  }

  // Insert the city into the database
  await knex("city").insert({ name, code, status, image_url });

  return res.status(201).json({ message: "City added successfully" });
}

async function editCity(req, res) {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { name, code, status, image_url } = req.body;
  const id = req.params.id;
  
  // Check if the city exists in the database
  const city = await knex('city').where({ id }).first();
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }

  // Check if the city code or name already exists in the database
  const existingCity = await knex('city').whereNot('id', id).andWhere(function() {
    this.where('name', name).orWhere('code', code);
  }).first();
  if (existingCity) {
    return res.status(400).json({ error: 'City already exists' });
  }

  // Update the city in the database
  await knex('city').where({ id }).update({ name, code, status, image_url });

  return res.status(200).json({ message: 'City updated successfully' });

}

module.exports = {
  getCityDetails,
  getCityList,
  addCity,
  editCity
};
