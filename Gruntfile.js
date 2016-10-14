/*
 This is our Grunt Wrapper, this tells node we are using grunt!
 */
module.exports = function (grunt) {
    //  Load our Grunt Tasks
    // loadNpmTasks removed and installed load tasks plugin
    require('load-grunt-tasks')(grunt);

    // Configure our tasks

    grunt.initConfig({
        concat:{
            dist: {
                src: ['src/js-src/*js', '!src/js-src/bootstrap.min.js'],
                dest: 'js/deploy-script.js'
            }
        },
        validation: { // Grunt w3c validation plugin
            options: {
                reset: grunt.option('reset') || false,
                stoponerror:false,
                generateCheckstyleReport: 'w3cErrors/validation.xml',
                path: 'w3cErrors/validation-status.json',
                reportpath: false,
                // remotePath: "http://decodize.com/",
                // remoteFiles: ["html/slidemote-universal-remote-control-for-html5-presentations",
                //               "GAE/linktomob-share-your-links-quickly-and-easily-on-mobile-devices/",
                //               "html/getting-started-with-yeoman-1-dot-0-beta-on-windows/",
                //               "html/moving-from-wordpress-to-octopress/",
                //               "css/site-preloading-methods/",
                //               "html/sublime-text-2-bidirectional-language-support-plugin/"]
                // remoteFiles: "validation-files.json",
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element title must not be empty.']
            },
            files: {
                src: 'index.html'
            }
        }

    });

     // Register our tasks

    grunt.registerTask('default', [
         'validation', 'concat'
    ]);
};