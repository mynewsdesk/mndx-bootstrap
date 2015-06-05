var changeCase = require('change-case');
var path = require('path');
var babel = require('babel-core');
var coffee = require('coffee-script');

module.exports = function(grunt) {

  return function() {
    var components = [];
    var files = grunt.file.expand(this.data.src);
    files.forEach(function(file) {
      processFile(file, this.data.dest);
      var component = getComponentFromFile(file);
      components.push(component);
    }, this);

    var manifestContent = generateManifest(components);
    grunt.file.write(this.data.manifest, manifestContent);
  }

  function generateManifest(components) {
    var componentTemplate = '  <%= component.name %>: require("<%= component.fileName %>")';
    var componentsList = components.map( function(component) {
      return grunt.template.process(componentTemplate, {data: {component: component}});
    });

    componentsList = componentsList.join(',\n');

    var manifestTemplate = grunt.file.read(__dirname + '/manifest_template.js');
    return grunt.template.process(manifestTemplate, {data: {componentsList: componentsList}});
  }

  function processFile(file, destDir) {
    var ext = path.extname(file);
    var filename = path.basename(file, ext);

    var dest = path.join(destDir, filename + '.js');
    var code = compileFile(file);
    if (code) {
      grunt.file.write(dest, code);
      grunt.log.writeln('Compile ' + file + ' to ' + dest);
    } else {
      grunt.log.error('Error while compiling file: ' + file);
    }
  }

  function getComponentFromFile(file) {
    var ext = path.extname(file);
    var filename = path.basename(file, ext);
    var componentName = changeCase.pascalCase(filename);
    return {
      name: componentName,
      fileName: './lib/' + filename
    }
  }

  function compileFile(file) {
    var ext = path.extname(file);
    switch(ext) {
      case '.js':
        return compileES6(file)
        break;
      case '.coffee':
        return compileCoffeescript(file)
    }
  }

  function compileES6(file) {
    return babel.transformFileSync(file, {optional: ['runtime']}).code;
  }

  function compileCoffeescript(file) {
    var coffeeCode = grunt.file.read(file);
    return coffee.compile(coffeeCode);
  }
};
