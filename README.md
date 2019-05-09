# ecb-euro-fx

The ecb publishes a daily feed with the latest euro foreign exchange rates (in XML format). This module parses this feed and convert it into a handy javascript object that can be used in any related FX calculations involving the Euro and other currencies.

## Install

You can install with [npm]:

```sh
$ npm install --save ecb-euro-fx
```
## Usage

The module doesn't require any parameters, but it returns a promise that needs to be handled to use the resulting object:

```js

const ecbFx = require('ecb-euro-fx')
ecbFx().then(ratesObj => { console.log(ratesObj) })

// It will show in the console, an object like:
// { subject: 'Reference rates',
//   sender: 'European Central Bank',
//   time: '2019-05-08',
//   rates:
//    [ { currency: 'USD', rate: '1.1202' },
//      { currency: 'JPY', rate: '123.31' },
//      { currency: 'BGN', rate: '1.9558' },
//      { currency: 'CZK', rate: '25.727' },
//   ...
//  ratesBySymbol:
//   { USD: 1.1202,
//     JPY: 123.31,
//     BGN: 1.9558,
//     CZK: 25.727,
```

Note that the module returns an array of objects with the rates (as in the ECB feed), but it also provides an object with the `ratesBySymbol`. You can use this object to right away calculate the FX for a particular rate.

Let's say you want to calculate how many dollars are 50 euro today?

```js

const ecbFx = require('ecb-euro-fx')
ecbFx().then(ratesObj => {
  const dollars = parseInt(50 * ratesObj.ratesBySymbol.USD)
  console.log(`50 Euro are ${dollars} Dollars`)
})

// It will show in the console the dollars with the current FX

```

Both the request to the ECB servers and the object conversion are cached, so any subsequent call to the module should be really fast.

### Running tests

You can run the tests with JEST and check the functionality of this module using:

```sh
$ npm install && npm test
```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).
