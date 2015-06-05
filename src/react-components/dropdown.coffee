###
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
###
#*/

React = require "react"

class Dropdown extends React.Component
  @propTypes =
    label: React.PropTypes.string.isRequired

  constructor: (props) ->
    super props
    @state = open: false

  toggleDropdown: ->
    @setState open: !@state.open

  renderDropdown: ->
    `<div className="dropdown-content">
      {this.props.children}
    </div>`

  render: ->
    dropdown = @renderDropdown() if @state.open

    `<div className="dropdown">
      <button className="btn btn-default" onClick={this.toggleDropdown.bind(this)}>{this.props.label}</button>
      {dropdown}
    </div>`

module.exports = Dropdown
