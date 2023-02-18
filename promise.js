const mysql = "My database"
const port = 3000

function mySqlConnection(database) {
    return new Promise((resolve, reject) => {
        if(database === mysql) {
        resolve ('MySql Connected')
    } else {
        reject ('MySql Not Connected')
    }  
})    
}

// async function isDatabaseWorking() {
//     try {
//         let result = await mySqlConnection('My database')
//         console.log()
//     }
    
// }
// console.log(mySqlConnection(d))
// let result = mySqlConnection("My database")
// console.log(result)

// mySqlConnection(mysql)
// .then(() => {
//     console.log('MySql Connected')
//     console.log(`app listening on ${port}`)
// })
// .catch(() => {
//     console.log('error')
// })