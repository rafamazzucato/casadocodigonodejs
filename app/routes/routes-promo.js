var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app) {
    app.get("/promocoes/form",function(req,res){
        var connection = connectionFactory();
        var produtosBanco = new app.infra.produtosDAO(connection);
        produtosBanco.lista(function(erros,resultados){
            res.render('promocoes/form',{lista:resultados});
        });
        connection.end();
    });

    app.post("/promocoes",function(req,res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao',promocao);
        res.redirect('promocoes/form');
    });
}