
/*
/*doc
---
title: Dropdown
name: dropdown
category: React Components
---

<div id="datepicker-example"></div>
```react_example
var props = {
  label: "magic dropdown"
}
---
<Dropdown {...props}>
  <a>Hello</a>
</Dropdown>
```
 */

(function() {
  var Dropdown, React,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require("react");

  Dropdown = (function(superClass) {
    extend(Dropdown, superClass);

    Dropdown.propTypes = {
      label: React.PropTypes.string.isRequired
    };

    function Dropdown(props) {
      Dropdown.__super__.constructor.call(this, props);
      this.state = {
        open: false
      };
    }

    Dropdown.prototype.toggleDropdown = function() {
      return this.setState({
        open: !this.state.open
      });
    };

    Dropdown.prototype.renderDropdown = function() {
      return <div className="dropdown-content">
      {this.props.children}
    </div>;
    };

    Dropdown.prototype.render = function() {
      var dropdown;
      if (this.state.open) {
        dropdown = this.renderDropdown();
      }
      return <div className="dropdown">
      <button className="btn btn-default" onClick={this.toggleDropdown.bind(this)}>{this.props.label}</button>
      {dropdown}
    </div>;
    };

    return Dropdown;

  })(React.Component);

  module.exports = Dropdown;

}).call(this);
