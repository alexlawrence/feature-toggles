module.exports = function(grunt) {

    'use strict';

    var jasmine = require('jasmine-node');

    grunt.registerTask('spec', function() {
        var done = this.async();
        var options = {};
        options.specFolders = ['./'];
        options.isVerbose = true;
        options.showColors = true;
        options.regExpSpec = /.*?\.spec\.js/;
        options.onComplete = function(runner) {
            done(runner.results().failedCount == 0);
        };

        jasmine.executeSpecsInFolder(options);
    });

    grunt.registerTask('default', ['spec']);

};