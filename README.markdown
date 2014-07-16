mnd-bootstrap
=============

MND theme for Bootstrap.

Installation
------------
Add this line you your Gemfile:
```
gem 'rails-assets-mnd-navigation'
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

To view the docs (the styleguide), simply start the jekyll server :
```
jekyll serve
```
