module.exports = function(){

    return function(connection){
        this.lista = function(callback){
            connection.query('select * from livros', callback);
        }  

        this.salva = function(produto, callback){
            connection.query('insert into livros set ?',produto,callback);
        } 

        return this;
    };
}