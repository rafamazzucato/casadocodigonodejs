var connectionFactory = require('../infra/connectionFactory');

module.exports =  function(app){
    app.get('/produtos',function (req, res, next){
        var connection = connectionFactory();
        var produtosBanco = new app.infra.produtosDAO(connection);
        
        produtosBanco.lista(function(err, results){
            if(err){
                return next(res.json(err));
            }
            res.format({
                html: function(){
                    res.render('produtos/lista',{lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
    });

    app.get('/cadastro-produtos',function (req, res){
        res.render('produtos/form', {erros :{}, produto : {}});
    });

    app.post('/produtos',function (req, res){
        
        var connection = connectionFactory();
        var produtosBanco = new app.infra.produtosDAO(connection);

        var produto = req.body;

        var erros;

        var validatorTitulo = req.assert('titulo','Titulo é obrigatório');
        validatorTitulo.notEmpty();
        
        var validatorPreco = req.assert('preco','Preço é obrigatório');
        validatorPreco.notEmpty();
        
        erros = req.validationErrors();


        res.format({
            html: function(){
                if(erros){
                    res.status(400).render('produtos/form', {erros : erros, produto : produto});
                    return;
                }
        
                produtosBanco.salva(produto, function(err, results){
                    res.redirect('/produtos');
                });
            },
            json: function(){
                if(erros){
                    res.status(400).json(erros);
                    return;
                }
        
                res.json(produto);
            }
        });

        

        connection.end();
    });
};
