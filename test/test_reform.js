var assert = require('assert');
var Reform = require('../lib/reform');

describe('Reform', function(){
  describe('Constructor', function(){
    it('Should allow for creation without anything', function(done){
      new Reform();
      done();
    });
    it('Should allow for creation without options', function(done){
      new Reform({a: '$.b'});
      done();
    });
    it('Should allow for creation with options', function(done){
      new Reform({a: 'self.b'}, {selfSymbol: 'self'});
      done();
    });
  });
  describe('Usage', function(){
    it('Should be able to reform basic objects', function(done){
      var input = {
        firstName: 'Test',
        lastName: 'Account',
        balance: 10000
      };

      var reformation = {
        firstName: '$.firstName',
        lastName: '$.lastName',
        fullName: '$.lastName+", "+$.firstName',
        balance: '"$"+parseFloat($.balance).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")'
      };

      var r = new Reform(reformation);
      var output = r.reform(input);
      assert(output.balance === '$10,000.00');
      assert(output.firstName === input.firstName);
      assert(output.lastName === input.lastName);
      assert(output.fullName === input.lastName+', '+input.firstName);

      done();
    });
    it('Should be able to reform from sub objects', function(done){
      var input = {
        name: {
          first: 'Test',
          last: 'Account'
        },
        balance: 10000
      };

      var reformation = {
        firstName: '$.name.first',
        lastName: '$.name.last',
        fullName: '$.name.last+", "+$.name.first',
        balance: '"$"+$.balance.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")'
      };

      var r = new Reform(reformation);
      var output = r.reform(input);
      assert(output.balance === '$10,000.00');
      assert(output.firstName === input.name.first);
      assert(output.lastName === input.name.last);
      assert(output.fullName === input.name.last+', '+input.name.first);

      done();
    });
    it('Should be able to reform to sub objects', function(done){
      var input = {
        firstName: 'Test',
        lastName: 'Account',
        balance: 10000
      };

      var reformation = {
        name: {
          first: '$.firstName',
          last: '$.lastName',
          full: '$.lastName+", "+$.firstName'
        },
        balance: '"$"+$.balance.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")'
      };

      var r = new Reform(reformation);
      var output = r.reform(input);

      assert(output.balance === '$10,000.00');
      assert(output.name.first === input.firstName);
      assert(output.name.last === input.lastName);
      assert(output.name.full === input.lastName+', '+input.firstName);

      done();
    });
    it('Should be able to pass values through', function(done){
      var input = {
        firstName: 'Test',
        lastName: 'Account'
      };
      var reformation = {
        firstName: '$.firstName',
        lastName: '$.lastName',
        fullName: '$.lastName+", "+$.firstName',
        balance: 0
      };

      var r = new Reform(reformation);
      var output = r.reform(input);

      assert(output.balance === 0);
      assert(output.firstName === input.firstName);
      assert(output.lastName === input.lastName);
      assert(output.fullName === input.lastName+', '+input.firstName);

      done();
    });
    it('Should be able to keep sub objects', function(done){
      var input = {
        name: {
          first: 'Test',
          last: 'Account'
        },
        balance: 10000
      };

      var reformation = {
        name: '$.name',
        firstName: '$.name.first',
        lastName: '$.name.last',
        fullName: '$.name.last+", "+$.name.first',
        balance: '"$"+$.balance.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")'
      };

      var r = new Reform(reformation);
      var output = r.reform(input);
      assert(output.balance === '$10,000.00');
      assert(output.name.first === input.name.first);
      assert(output.name.last === input.name.last);
      assert(output.firstName === input.name.first);
      assert(output.lastName === input.name.last);
      assert(output.fullName === input.name.last+', '+input.name.first);

      done();
    });
  });
});
