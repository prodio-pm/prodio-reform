[![Build Status](https://travis-ci.org/prodio-pm/prodio-reform.svg)](https://travis-ci.org/prodio-pm/prodio-reform)

Prodio-Reform
=============

Reforms input from one version to another (String, Number, Array, Object).

EG: From the input
```
{
  firstName: 'Test',
  lastName: 'Account',
  balance: '$1.00'
}
```

To:
```
{
  fullName: 'Account, Test',
  balance: 1
}
```

API
===

Reform()
--------

```
var Reform = require('prodio-reform').Reform;
```

Reform(reformation, options)

  * reformation - Object that describes the desired output and how to get there.
  * options - Optional options object that gets passed into Lambda

```
var input = {
  firstName: 'Test',
  lastName: 'Account',
  balance: 10000
};

var reformation = {
  firstName: '$.firstName',
  lastName: '$.lastName',
  fullName: '$.lastName+", "+$.firstName',
  balance: '"$"+$.balance.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")'
};

var r = new Reform(reformation);
var output = r.reform(input);
```

Stacking to sub object:
```
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
```

From sub object to root object:
```
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
```

History
---

  * 0.0.2 - Switch to Lambda-30 for Lambda implementation and interpertation
  * 0.0.1 - Initial release
