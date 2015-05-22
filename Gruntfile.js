var babel = require('babel-core');
var coffee = require('coffee-script');
var path = require('path');
var changeCase = require('change-case');

module.exports = function(grunt) {

  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    SRC: 'src',
    PUBLIC: '.public',
    DIST: 'dist',
    sass: {
      dist: {
        options: {
          style: 'expanded',
          update: true,
          trace: true,
          loadPath: ['bower_components']
        },
        files: {
          '<%= PUBLIC %>/mnd-bootstrap-dev.css': '<%= SRC %>/mnd-bootstrap-dev.scss',
          '<%= PUBLIC %>/styleguide.css': 'hologram/doc_assets/styleguide.scss'
        }
      }
    },
    copy: {
      jquery: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'hologram/doc_assets/'
      },
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap-sass-twbs/assets/javascripts/',
        src: 'bootstrap.js',
        dest: 'hologram/doc_assets/'
      }
    },
    webpack: {
      dist: {
        entry: './hologram/mnd.js',
        output: {
          path: '<%= PUBLIC %>',
          filename: 'mnd.js'
        },
        module: {
          loaders: [
            {
              test: /\.coffee$/,
              exclude: /node_modules/,
              loaders: ['jsx-loader', 'coffee-loader']
            },
            {
              test: /\.js$/,
              exclude: /node_modules|hologram/,
              loader: 'babel-loader'
            }
          ]
        },
        resolve: {
          extensions: ['', '.js', '.coffee'],
          alias: {
            components: __dirname + '/<%= SRC %>/react-components',
            utils: '/src/js/utils'
          }
        },
      }
    },
    hologram: {
      dist: {
        options: {
          config: 'hologram/hologram_config.yml'
        }
      }
    },
    watch: {
      js: {
        files: [
          '<%= SRC %>/**/*.js',
          '<%= SRC %>/**/*.coffee',
          'hologram/mnd.js'
        ],
        tasks: ['webpack', 'hologram']
      },
      scss: {
        files: ['<%= SRC %>/**/*.scss', 'hologram/doc_assets/**/*.scss'],
        tasks: ['sass', 'hologram']
      },
      styleguide: {
        files: '<%= PUBLIC %>/**/*',
        options: {
          livereload: 35729
        },
        tasks: ['notify:hologram']
      },
      config: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      }
    },
    connect: {
      options: {
        base: '<%= PUBLIC %>'
      },
      dist: {}
    },
    notify: {
      hologram: {
        options: {
          message: 'Hologram build completed'
        }
      }
    },
    release: {
      options: {
        additionalFiles: ['bower.json'],
        npm: false,
        beforeRelease: ['build', 'pack'],
        afterRelease: ['gh-pages']
      }
    },
    'gh-pages': {
      options: {
        base: '<%= PUBLIC %>'
      },
      dist: {
        src: ['**']
      }
    },
    pack: {
      npm: {
        src: '<%= SRC %>/react-components/**/*.{js,coffee}',
        dest: '<%= DIST %>/lib/',
        manifest: '<%= pkg.main %>'
      }
    }
  });

  grunt.registerTask('build', ['copy', 'sass', 'webpack', 'hologram']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);

  grunt.registerMultiTask('pack', 'package file for npm', function() {
    var filename = extension = componentName = null;
    var components = [];
    var files = grunt.file.expand(this.data.src);
    files.forEach(function(file) {
      extension = path.extname(file);
      filename = path.basename(file, extension);
      componentName = changeCase.pascalCase(filename);
      components.push({
        name: componentName,
        fileName: './lib/' + filename
      });
      dest = path.join(this.data.dest, filename + '.js');
      var code = null
      if (extension === '.js') {
        code = babel.transformFileSync(file, {optional: ['runtime']}).code;
      } else if (extension === '.coffee') {
        var coffeeCode = grunt.file.read(file);
        code = coffee.compile(coffeeCode);
      }
      grunt.file.write(dest, code);
      grunt.log.writeln('Compile ' + file + ' to ' + dest);
    }, this);

    var entryPoint = 'module.exports = {\n';
    entryPoint += components.map( function(component) {
      return '  "' + component.name + '": require("' + component.fileName + '")';
    }).join(',\n');
    entryPoint += '\n};';
    grunt.file.write(this.data.manifest, entryPoint);
  });
};
