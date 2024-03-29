# mnd-bootstrap

MND theme for Bootstrap.

[![dependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap)
[![devDependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap/dev-status.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap#info=devDependencies)

## Browse the styleguide
http://mynewsdesk.github.io/mnd-bootstrap/

## Installation

Installation is done with npm.
```
npm install --save mndx-bootstrap
```

## Usage

```
@import "mnd-bootstrap/src/bootstrap";

// Load sass variables via the variables file
@import "mnd-bootstrap/src/mnd-bootstrap/variables";

// Or if you're building with webpack
@import "mnd-bootstrap/src/mnd-bootstrap/variables.webpack";
```

## Development setup

To setup the development environment you need to install all the dependencies.

Run `bin/setup`.

Then you use gulp to compile the sass when you change the files:
```
gulp
```

Leave gulp running, it starts a webserver and it will generate the styleguide everytime a file changes.

To check the styleguide, go to [http://localhost:8000](http://localhost:8000)

## Keeping dependencies up to date

These are the dependency trees that need to be kept up to date:

* `bundle install` - gem dependencies specified in Gemfile.lock
* `npm update` - npm dependencies specified in package.json
* `bower update` - bower dependencies specified in bower.json

## Release new version

To create a new version, there are multiple steps:

* First, we want to increase the version number in the `package.json` and `bower.json` files and commit this.
* Then we want to tag the commit, because `bower` use the git tag as version number instead of reading a manifest file.
* To release the new version, we will just push those changes to master
* Publish the version to npm
* And last but not least, now want to update the doc (style-guide) too, use the gulp gh-pages` task for this.

I've created a gulp task for all those steps:

`gulp release [--level patch|minor|major]`

The level change the version increment according to the semver documentation.

```
patch # makes v0.1.0 → v0.1.1
minor # makes v0.1.1 → v0.2.0
major # makes v0.2.1 → v1.0.0
```

## Tips:

When you are working on a project and you need to work on the styleguide and the project at the same time, it's really painful to have to make changes in the NPM component (mndx-bootstrap) and publish it before you can test your changes in your project.

There is a good solution for this, `npm link`.

Just follow those steps:
```
cd project/mnd-bootstrap
npm link
cd project/working-dir
npm link mndx-bootstrap
```
