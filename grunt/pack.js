var changeCase = require('change-case');
var path = require('path');
var babel = require('babel-core');
var coffee = require('coffee-script');

module.exports = function() {
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
}
