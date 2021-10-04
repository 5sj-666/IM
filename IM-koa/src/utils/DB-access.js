const mysql = require('mysql')
const pool = mysql.createPool({
  // host     :  '127.0.0.1',
  host     :  '110.40.186.240',
  user     :  'root',
  password :  '123456',
  database :  'im'
})

let query = function( sql, values ) {
  console.log("--query sql:　", sql);
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

let execSql = function( sql, values ) {
  console.log("--query sql:　", sql);
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query, execSql }