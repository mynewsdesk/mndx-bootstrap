mnd-bootstrap
=============

MND theme for Bootstrap.

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

Then you use grunt to compile the sass when you change the files:
```
grunt watch
```


We have a stylguide using the mnd-bootstrap project (fork from the bootstrap stylguide).
To set it up for development, you have to clone it :

```
cd <path/to/mnd-bootstrap>/..
git clone git@github.com:mynewsdesk/boostrap.git
```

If you want to install it somewhere else, update the ```mndBootstrapPath``` variable in the Gruntfile.js file of the bootstrap project.
Now you can run the stylguide, go to the bootstrap directory and run :

```
# Create the styleguide and run a webserver
jekyll serve
# Watch mnd-bootstrap modification and copy the sass file when modified
grunt watch
```

Release new version
-----------

To release a new version you have to upgrade the version in bower.json and package.json. After that you need to create a new release at github and tag it with the same version as in the bower.json and package.json settings.

If you using this bower component with rails-assets you can force refresh the version on https://rails-assets.org/components/new with just adding "mnd-bootstrap" and click "Convert".
