var mysql= require("mysql")
var pool=mysql.createPool(
    {
        host:'sql5.freesqldatabase.com',
        port:3306,
        user:'sql5694840',
        password:'rhZZiVGXzq',
        database:'sql5694840',
        multipleStatements:true,
        connectionLimit:100
    })
    module.exports=pool