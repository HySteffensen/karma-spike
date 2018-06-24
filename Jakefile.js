/*global desc, task, jake, fail, complete, directory*/

(function() {

    "use strict";
    
    var jshint = require('simplebuild-jshint');
    var mocha = require('./mocha_runner');
    
    desc("Default Task");
    task("default", [ "lint", "test" ], function() {
        console.log("BUILD OK\n\n");
    });

    desc("Lint Everything");
    task("lint", function() {
        process.stdout.write("Linting JavaScript: ");
        jshint.checkFiles({
            files: [ "*.js", "src/**/*.js", "build/**/*.js" ],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, { async: true });

    desc("Test Everything");
    task("test", function() {
        process.stdout.write("Running Tests: . \n");
        mocha.start();
    });

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