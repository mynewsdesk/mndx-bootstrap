mnd-bootstrap
=============

MND theme for Bootstrap.

[![dependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap)
[![devDependency Status](https://david-dm.org/mynewsdesk/mnd-bootstrap/dev-status.svg)](https://david-dm.org/mynewsdesk/mnd-bootstrap#info=devDependencies)

Installation
------------
Add this line you your Gemfile:
```
gem 'rails-assets-mnd-bootstrap'
```

And then execute:
```
bundle
```

Usage
-----
```
@import("mnd-bootstrap");
// Optionally import your own bootstrap variables.
@import("bootstrap");
```

Development
-----------
To setup the development environment you need to install the node and bower
components:
```
npm install
bower install
```

Then you use grunt to start compile the sass when you change the files:
```
grunt
```

Leave the grunt task running, it starts a webserver and it will generate the styleguide everytime a file changes.

To check the styleguide, go to [http://localhost:3000](http://localhost:3000)


Release new version
-----------

To release a new version you have to upgrade the version in bower.json and package.json. After that you need to create a new release at github and tag it with the same version as in the bower.json and package.json settings.

If you using this bower component with rails-assets you can force refresh the version on https://rails-assets.org/components/new with just adding "mnd-bootstrap" and click "Convert".
