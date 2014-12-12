#requirish

**_requirish_** is a tool for avoiding the ../../../ relative paths problem and includes a
[browserify-transform](https://github.com/substack/browserify-handbook#transforms) to rewrites require() for browser.

## Installation as dependency

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

Therefore, your 'jet.test.js' unit-test could begin like this:

```js
var jetController = require('../../../lib/gui/controller/jet');
...
```

In such a case, browserify could resolve this long _require()_ without any problem..

But, **how to avoid using the ../../../ relative path** to find the 'jet.js' module?

Well, you could write the `require('requirish')._(module);` statement - **only one time for each module 
and before other _require()_** - like the following:
 
```js
require('requirish')._(module);

var jetController = require('lib/gui/controller/jet');
...
```
 
Fine! We will be happy to have now a **path-decoupled require()** but..  
**browserify** will stop to resolve this new smart version!

And here **requirish** comes again to the rescue and **transforms** automagically all the smart _require()_ in the previous
../../../ long version only for the browserify processor! So, you could run the following browserify command adding the transform: 

```bash
$ browserify -t requirish test/gui/controller/jet.test.js > test-bundle.js
```

Now, you will get a bundle that runs on browser without problem! :)


## License

The project is released under the [Mit License](./LICENSE) 
