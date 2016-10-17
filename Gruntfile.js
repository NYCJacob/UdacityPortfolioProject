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
        
        responsive_images: {
            myTask: {
                options: {
                    aspectRatio: false,
                    sizes: [{
                        name: 'mob-160',
                        width: 160,
                        height: 60
                    },{
                        name:'mob-212',
                        width: 212,
                        height: 80
                    },{
                        name:'mob-248',
                        width: 248,
                        height: 100
                    },{
                        name:'mob-275',
                        width: 275,
                        height: 120
                    },{
                        name:'mob-320',
                        width: 320,
                        height: 120
                    }, {
                        name: 'med-500',
                        width: 500,
                        height: 250
                    },{
                        name:'mob-546',
                        width: 546,
                        height: 300
                    },{
                        name:'mob-658',
                        width: 658,
                        height: 300
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
                    cwd: 'images',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'images/'                  // Destination path prefix
                }]
            }
        },
        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: false,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
                generateReport: true,
                errorHTMLRootDir: 'w3cErrors',
                useTimeStamp: true,
                errorTemplate: 'error_template.html'
            },
            files: {
                src: 'index.html'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: 'styles.css',
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        }

    });

     // Register our tasks

    grunt.registerTask('default', [
         'concat', 'responsive_images', 'imagemin', 'validation', 'cssmin']);
};