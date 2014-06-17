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

Finally you setup the docs project to find the mndBootstrapPath variable if
the projects aren't in the same folder. Use jekyll to serve the docs project
and another grunt watch to copy over the compiled sass:
```
jekyll serve
grunt watch
```
