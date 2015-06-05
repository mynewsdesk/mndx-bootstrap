# mnd-bootstrap

MND theme for Bootstrap.

[![dependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap)
[![devDependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap/dev-status.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap#info=devDependencies)

## Browse the styleguide
http://mynewsdesk.github.io/mnd-bootstrap/

## Installation

Installation is done with bower.
```
bower install --save mnd-bootstrap
```

## Usage

```
@import "mnd-bootstrap/src/mnd-bootstrap";
// Optionally import your own bootstrap variables.
@import "mnd-bootstrap/src/bootstrap";
```

## Development setup

To setup the development environment you need to install all the dependencies.

Run `bin/setup`.

Then you use grunt to compile the sass when you change the files:
```
grunt
```

Leave grunt running, it starts a webserver and it will generate the styleguide everytime a file changes.

To check the styleguide, go to [http://localhost:8000](http://localhost:8000)

## Keeping dependencies up to date

These are the dependency trees that need to be kept up to date:

* `bundle install` - gem dependencies specified in Gemfile.lock
* `npm update` - npm dependencies specified in package.json
* `bower update` - bower dependencies specified in bower.json

## Release new version

A release does the following:

* Increment version number in `package.json` and `bower.json`
* Add a git tag with the new version number
* commit the changes and push it to master
* push the tag
* push the generated styleguide to the gh-pages branch

One simple command to do all this:

`grunt release`

You can control the version increment with an argument:

```
grunt release:patch
grunt release:minor
grunt release:major
```
