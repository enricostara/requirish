//     requirish
//     Copyright 2014 Enrico Stara 'enrico.stara@gmail.com'
//     Released under the MIT License
//     https://github.com/enricostara/require-mainify

// Import dependencies
var path = require('path');
var through = require('through2');
var resolve = require('resolve');

// The require('...') regular expression
var requireRegExp = /require\s*\(\s*(["'])(.*?)\1\s*\)\s*/g;

// The transform function
module.exports = function (file) {
    var fileFolder = path.dirname(file);
    var relativeToRoot = path.relative(fileFolder, '.');

    return through(function (buf, enc, next) {
        this.push(buf.toString('utf8').replace(requireRegExp, replacer));
        next();
    });

    function replacer(match, quote, require) {
        var replacement = 'require(\'';
        try {
            resolve.sync(require);
        } catch (exc) {
            try {
                // Try to resolve the require statement starting from the root folder
                resolve.sync(require, {paths: ['.']});
                replacement += relativeToRoot + path.sep;
            } catch (exc2) {
            }
        }
        replacement += require + '\')';
        return replacement;
    }
};

function _(module) {
    console.log(module.filename);
    (module.paths && module.paths.push('.'));
}
module.exports._ = _;