module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'dist/mnd-bootstrap-dev.css': 'src/mnd-bootstrap-dev.scss'
        }
      }
    },

    copy: {
      styleguide: {
        src: 'dist/mnd-boostrap.css',
        dest: 'docs/assets/css'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'copy']
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', ['copy', 'watch']);

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy')
}
