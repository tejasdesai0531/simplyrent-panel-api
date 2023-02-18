require('dotenv').config()
const app = require('./app')
// const dbConnection = require('./config/knex')



async function start() {
  // await dbConnection.connect()
  console.log('Mysql connected')

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  

}

start()


