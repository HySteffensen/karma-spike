/*global desc, task, jake, fail, complete, directory*/

(function() {

    "use strict";
    
    var jshint = require('simplebuild-jshint');
    
    desc("Default Task");
    task("default", [ "lint" ], function() {
        console.log("BUILD OK\n\n");
    });

    desc("Lint everything");
    task("lint", function() {
        process.stdout.write("Linting JavaScript: ");
        jshint.checkFiles({
            files: [ "*.js", "src/**/*.js", "build/**/*.js" ],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, { async: true });

    function lintOptions() {
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            undef: true,
            
            node: true,
            browser: true,

            esnext: true
        };
    }

    function lintGlobals() {
        return {
            // Mocha
            describe: false,
            it: false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false
        };
    }

}());