var mysql = require('mysql');

function createDBConnection(){
    
    var db = '';

    if(!process.env.NODE_ENV) {
        db = 'casadocodigo_nodejs';
    }
    
    if(process.env.NODE_ENV == 'test') {
        db = 'casadocodigo_nodejs_test';
    }

    return mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'root',
        database : db
    });

}

module.exports = function (){
    return createDBConnection();
}