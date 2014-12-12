#requirish

**_requirish_** is a tool for avoiding the ../../../ relative paths problem and includes a browserify-transform to rewrites require() for browser.

## Installation as dev-dependency

```bash
$ npm install --save requirish
```

## Usage

In the code, before other _require()_ calls:
```js
require('requirish')._(module);
...
```

As a _browserify-transform_:

```bash
$ browserify -t requirish app.js > bundle.js
```

## Example

Developing a not trivial **Node.js** application you will face a lot of annoying **relative paths** in your _require()_ as soon as 
you start creating a module hierarchy under your ./lib source folder. 

In this example your app could have a 'jet.js' module like the following:

```bash
$ /Users/bob/my-app/lib/gui/controller/jet.js
```
and the relative unit-test with the following path:

```bash
$ /Users/bob/my-app/test/gui/controller/jet.test.js
```

Therefore, your 'jet.test.js' tet could start like this:

```js
var jetController = require('../../../lib/gui/controller/jet');
...
```

In this case, **browserify** could resolve this long _require()_ without any problem.

But.. how to avoid using the ../../../ relative path to find the 'jet.js' module? 

Well, you could use the `require('requirish')._(module);` statement before other require(), like the following:
 
```js
require('requirish')._(module);

var jetController = require('lib/gui/controller/jet');
...
```
 
Fine! we will be happy to have now a **path-decoupled require()** but..  
**browserify** will stop to resolve this new short version without an external help!

And here **requirish** comes again to the rescue and **transforms** automagically all the smart requires in the previous
../../../ long version only for the browser! So you could run the following browserify command: 

```bash
$ browserify -t requirish test/gui/controller/jet.test.js > test-bundle.js
```

## License

The project is released under the [Mit License](./LICENSE) 
