const config = require('./config')
const mysql = require('knex') ({
    client: 'mysql',
    connection: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        dababase: config.DB_NAME,
        timezone: "IST",
    },
    userNullAsDefault: true,
    acquireConnectionTImeout: 300000,
});

mysql.raw("SELECT 1").then(() => {
    console.log('MySQL connected');
})
.catch((e) => {
    console.log("MySQL not connected");
    console.log(e);
});

module.exports = mysql;