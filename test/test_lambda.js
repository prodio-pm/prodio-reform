var assert = require('assert');
var Lambda = require('../lib/lambda');

describe('Lambda', function(){
  describe('Constructor', function(){
    it('Should be able to be created', function(done){
      var e = new Lambda();
      done();
    });
    it('Should default the self reference to $', function(done){
      var e = new Lambda();
      assert(Lambda.selfSymbol === '$');
      assert(e.selfSymbol === '$');
      done();
    });
    it('Should be able to set the self reference', function(done){
      var e = new Lambda({selfSymbol: 'self'});
      assert(Lambda.selfSymbol === '$');
      assert(e.selfSymbol === 'self');
      done();
    });
  });
  describe('Interperter', function(){
    it('Should be able to execute a basic expression a+b', function(done){
      var e = Lambda('$.a+$.b');
      var v = e({a: 5, b: 2});
      assert(v===7);
      done();
    });
    it('Should be able to execute a basic expression with custom selfSymbol', function(done){
      var e = Lambda({selfSymbol: 'self', expression: 'self.a+self.b'});
      var v = e({a: 5, b: 2});
      assert(v===7);
      done();
    });
    it('Should be able to alias parameters a, b=>a+b', function(done){
      var e = Lambda('a, b => a + b');
      var v = e(5, 2);
      assert(v===7);
      done();
    });
    it('Should be able to be created and execute a basic expression a+b', function(done){
      var e = new Lambda('$.a+$.b');
      var v = e.execute({a: 5, b: 2});
      assert(v===7);
      done();
    });
    it('Should be able to be created and to alias parameters a, b=>a+b', function(done){
      var e = new Lambda('a, b => a + b');
      var v = e.execute(5, 2);
      assert(v===7);
      done();
    });
    it('Should be able to use a custom self reference', function(done){
      var e = new Lambda({selfSymbol: 'self', expression: 'self.a + self.b'});
      var v = e.execute({a: 5, b: 2});
      assert(v===7);
      done();
    });
    it('Should be able to take the self reference and the expression', function(done){
      var l = new Lambda({selfSymbol: 'self', expression: 'self.a+self.b'});
      var v = l.execute({a: 5, b: 2});
      assert(v===7);
      done();
    });
    it('Should be able to switch the expression using compile', function(done){
      var l = new Lambda({selfSymbol: 'self', expression: 'self.a+self.b'});
      l.compile('self.a-self.b');
      assert(l.execute({a: 5, b: 2})===3);
      done();
    });
  });
});
