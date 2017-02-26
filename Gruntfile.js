module.exports = function(grunt) {

    //Sanity checks
    if (!process.env.EMSCRIPTEN) {
      console.error("EMSCRIPTEN env. variable is not set");
      console.log("Please set Emscripten environment by launching `emsdk_env` script");
    }

    var emscriptenPath = process.env.EMSCRIPTEN;
    var cmakeToolchainpath = emscriptenPath + "/cmake/Modules/Platform/Emscripten.cmake";
    var buildOutputPath = "../Binaries/Output/libGD.js/Release/";
    var buildPath = "../Binaries/embuild";

    grunt.initConfig({
        mochacli: {
            options: {
                require: ['expect.js'],
                bail: true
            },
            all: ['test/**/*.js']
        },
        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: ['Bindings/prejs.js', buildOutputPath+'libGD.raw.js', 'Bindings/glue.js', 'Bindings/postjs.js'],
            dest: buildOutputPath+'libGD.js',
          },
        },
        mkdir: {
          embuild: {
            options: {
              create: [buildPath]
            }
          },
        },
        shell: {
            //Launch CMake if needed
            cmake: {
                src: [buildPath + "/CMakeCache.txt", "CMakeLists.txt"],
                command: "cmake ../.. -DCMAKE_TOOLCHAIN_FILE=" + cmakeToolchainpath + " -DFULL_VERSION_NUMBER=FALSE",
                options: {
                    execOptions: {
                        cwd: buildPath,
                        env: process.env,
                        maxBuffer: Infinity
                    }
                }
            },
            //Generate glue.cpp and glue.js file using Bindings.idl, and patch them
            updateGDBindings: {
                src: "Bindings/Bindings.idl",
                command: 'node update-bindings.js',
            },
            //Compile GDevelop with emscripten
            make: {
                command: 'make -j 4',
                options: {
                    execOptions: {
                        cwd: buildPath,
                        env: process.env
                    }
                }
            }
        },
        uglify: {
          build: {
            files: [
                {src: [ buildOutputPath+'libGD.js' ], dest:buildOutputPath+'libGD.min.js'}
            ]
          }
        },
        clean: {
          options: { force: true },
          build: {
            src: [ buildOutputPath+'libGD.js', buildOutputPath+'libGD.min.js' ]
          }
        },
        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            files: [
              {expand: true, src: [buildOutputPath+'/libGD.js'], dest: '.', ext: '.js.gz'}
            ]
          }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('build', [
      'clean',
      'mkdir:embuild',
      'newer:shell:cmake',
      'newer:shell:updateGDBindings',
      'shell:make',
      'concat', 'compress'
    ]);
    grunt.registerTask('test', ['mochacli']);
};
