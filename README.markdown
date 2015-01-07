# mnd-bootstrap

MND theme for Bootstrap.

[![dependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap)
[![devDependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap/dev-status.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap#info=devDependencies)

## Installation

Add this line you your Gemfile:
```
gem 'rails-assets-mnd-bootstrap'
```

And then execute:
```
bundle
```

## Usage

```
@import("mnd-bootstrap");
// Optionally import your own bootstrap variables.
@import("bootstrap");
```

## Development

To setup the development environment you need to install the node and bower
components:
```
npm install -g gulp
npm install
bower install
```

Then you use gulp to start compile the sass when you change the files:
```
gulp
```

Let gulp running, it starts a webserver and it will generate the styleguide everytime a file changes.

To check the styleguide, go to [http://localhost:8000](http://localhost:8000)


## Release new version

To create a new version, there are multiple steps:

* First, we want to increase the version number in the `package.json` and `bower.json` files and commit this.
* Then we want to tag the commit, because `bower` use the git tag as version number instead of reading a manifest file.
* To release the new version, we will just push those changes to master
* We then want to make this new version available as a ruby gem, to do this, we will got to [https://rails-assets.org/components/new](rails-assets.org) and update our component.
* And last but not least, now want to update the doc (style-guide) too, use the `gulp gh-pages` task for this.

I've created a gulp task for all those steps:

`gulp release [--level patch|minor|major]`

The level change the version increment according to the semver documentation.

```
patch # makes v0.1.0 → v0.1.1
minor # makes v0.1.1 → v0.2.0
major # makes v0.2.1 → v1.0.0
```
