/*doc
---
title: Date Picker
name: datepicker
category: React Components
---

<div id="datepicker-example"></div>
```react_example
var props = {
  value: new Date(),
  minDate: new Date(2014, 1, 1),
  maxDate: new Date(2016, 2, 2),
  onChange: function(date) { console.log(date) },
  disabled: false
}
---
<DatePicker {...props} />
```
*/
import React from "react"
import moment from "moment"
import CN from "classnames"
import {Calendar} from "react-widgets"

class DatePicker extends React.Component {
  constructor() {
    super()
    this.state = {isOpen: false}
  }

  showCalendar() {
    this.setState({isOpen: true})
  }

  hideCalendar() {
    // if (this.removeClickOutside)
    //   this.removeClickOutside()
    this.setState({isOpen: false})
  }

  validate(date) {
    let d = moment(date)
    let isValid = d.isValid()
    if (this.props.min)
      isValid = isValid && d.isAfter(moment(this.props.min), "day")
    if (this.props.max)
      isValid = isValid && d.isBefore(moment(this.props.max), "day")
    return isValid
  }

  setDate(date) {
    this.hideCalendar()
    if (this.props.onChange)
      this.props.onChange(date)
  }

  onDateChange(e) {
    e.preventDefault()
    let input = e.target.dateInput
    let date = new Date(Date.parse(input.value))
    if (!this.validate(date))
      return
    this.setDate(date)
  }

  handleKeyDown(e) {
    if (e.keyCode === 27)
      this.hideCalendar()
  }

  renderLabel() {
    if (!this.props.label) return

    return (<label className="date-picker-label">{this.props.label}</label>)
  }

  renderForm() {
    let date = moment(this.props.value).format("YYYY-MM-DD")
    let inputProps = {
      className: "date-picker-field-input",
      defaultValue: date,
      onKeyDown: this.handleKeyDown.bind(this),
      onFocus: this.showCalendar.bind(this),
      type: "text",
      name: "dateInput"
    }

    if (this.props.disabled)
      inputProps.disabled = true

    let formProps = {
      onSubmit: this.onDateChange.bind(this),
      "aria-role": "group",
      "aria-label": "date-picker-field"
    }

    return (
      <form {...formProps}>
        <input {...inputProps}/>
      </form>
    )
  }

  renderCalendar() {
    if (!this.state.isOpen) return

    let wrapperCN = CN("date-picker-calendar", {"hidden": !this.state.isOpen})
    let calendarProps = {
      onChange: this.setDate.bind(this),
      value: this.props.value,
      min: this.props.min,
      max: this.props.max
    }

    return (
      <div className={wrapperCN}>
        <div className="popover bottom fade in">
          <div className="arrow"></div>
          <div className="popover-content">
            <Calendar {...calendarProps} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    let label = null
    if (this.props.label)
      label = this.renderLabel()

    let form = this.renderForm()
    let calendar = this.renderCalendar()

    return (
      <div className="date-picker" aria-role="group" aria-label="datepicker">
        {label}
        {form}
        {calendar}
        <i className="fa fa-calendar"></i>
      </div>
    )
  }
}

DatePicker.propTypes = {
  value: React.PropTypes.instanceOf(Date),
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date)
}

DatePicker.getDefaultProps = {
  value: new Date()
}

export default DatePicker
