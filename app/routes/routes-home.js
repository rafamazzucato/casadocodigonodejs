var connectionFactory = require('../infra/connectionFactory');

module.exports =  function(app){
    app.get('/',function (req, res, next){
        var connection = connectionFactory();
        var produtosBanco = new app.infra.produtosDAO(connection);
        
        produtosBanco.lista(function(err, results){
                res.render('home/index', {livros : results});
        });
    });
}