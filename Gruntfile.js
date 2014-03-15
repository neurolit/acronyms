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

    grunt.registerTask('dictd_to_json', function () {
        var acronyms = [],
            data = grunt.file.read('data/acroinria.src').split("\n"),
            current_acronym = {},
            in_header = true;
        data.forEach(
            function (line) {
                if (line === "") {
                    grunt.log.writeln("Empty line");
                    current_acronym.value += "\n";
                } else if (line.substring(0, 1) === "\t") {
                    grunt.log.writeln("Tab");
                    current_acronym.value += line.substring(1, line.length) + "\n";
                } else if (line.substring(0, 1) === " " || line.substring(0, 1) === "-") {
                    if (in_header) {
                        grunt.log.writeln("Header " + line);
                    } else {
                        grunt.log.writeln("Spaces " + line);
                        line.replace(/^\s+/, "");
                        current_acronym.value += line + "\n";
                    }
                } else {
                    grunt.log.writeln("Acronym");
                    // Nouvel acronym
                    if (in_header) {
                        in_header = false;
                    } else {
                        acronyms.push(current_acronym);
                    }
                    current_acronym = {};
                    current_acronym.id = line;
                    current_acronym.value = "";
                }
            }
        );
        acronyms.push(current_acronym);
        grunt.file.write("data/list.json", JSON.stringify(acronyms, null, 4));
    });


    // default task.
    grunt.registerTask('default', ['jslint']);

    // Travis CI task.
    grunt.registerTask('test', 'jslint');

};
