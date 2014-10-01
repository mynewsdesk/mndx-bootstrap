module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'dist/mnd-bootstrap-dev.css': 'src/mnd-bootstrap-dev.scss'
        },
        options: {
          loadPath: './bower_components'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'hologram']
      }
    },
    hologram: {
      build: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.registerTask('default', ['sass', 'hologram', 'watch']);
};
