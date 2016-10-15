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
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element title must not be empty.']
            },
            files: {
                src: 'index.html'
            }
        },
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                        name: 'mob-160',
                        width: 160,
                        height: 40
                    },{
                        name:'mob-320',
                        width: 320,
                        height: 80
                    }, {
                        name: 'med-500',
                        width: 500
                    },{
                        name: 'large-800',
                        width: 800,
                    },{
                        name: 'large-960',
                        width: 960
                    },{
                        name: "large-1600",
                        width: 1600,
                        suffix: "_x2"
                    },{
                        name:"portrait-400",
                        width: 400,
                        height: 600
                    }
                    ]
                },
                files: [{
                    expand: true,
                    // src: ['assets/**.{jpg,gif,png}'],
                    src: 'pexels-photo-code.jpg',
                    cwd: 'src/images-src/',
                    dest: 'images/'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                    // use: [mozjpeg()]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/images-src',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/'                  // Destination path prefix
                }]
            }
        }
    });

     // Register our tasks

    grunt.registerTask('default', [
         'validation', 'concat', 'responsive_images', 'imagemin']);
};