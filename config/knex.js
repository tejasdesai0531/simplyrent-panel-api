const mysql = require('knex') ({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dababase: process.env.DB_NAME,
        timezone: "IST",
    },
    userNullAsDefault: true,
    acquireConnectionTImeout: 300000,
});

mysql.raw("use " + process.env.DB_NAME).then(() => {
    console.log('MySQL connected');
})
.catch((e) => {
    console.log("MySQL not connected");
    console.log(e);
});

module.exports = mysql;