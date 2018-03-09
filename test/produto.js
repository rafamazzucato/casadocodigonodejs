var express = require('../config/express')();
var request = require('supertest')(express);
var connectionFactory = require('../app/infra/connectionFactory');

describe('ProdutosController',function(){
    beforeEach(function(done){
        var conn = connectionFactory();
        conn.query("delete from livros", function(ex,result){
            if(ex){
                console.log(ex);
                done();
            }else{
                console.log('Limpesa da base de test efetuada');
                done();
            }
        });
    });

    it('listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });

    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
            .send({titulo: "", descricao: "novo livro"})
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
        .send({titulo:"titulo",descricao:"novo livro",preco:20.50})
        .expect(302,done);
    });
});