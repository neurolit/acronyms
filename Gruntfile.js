/*jslint node:true*/

module.exports = function (grunt) {

    'use strict';

    grunt.loadNpmTasks('grunt-jslint'); // load the task

    grunt.initConfig({

        jslint: {
            all: {
                src: [
                    'acronyms/list.json',
                    'Gruntfile.js',
                    'js/{app,controllers}.js'
                ],
                options: {
                    failOnError: true
                }
            }
        }

    });

    // default task.
    grunt.registerTask('default', ['jslint']);

    // Travis CI task.
    grunt.registerTask('test', 'jslint');

};
