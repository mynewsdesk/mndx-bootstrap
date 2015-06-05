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
"use strict";

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

_Object$defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactWidgets = require("react-widgets");

var DatePicker = (function (_React$Component) {
  function DatePicker() {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), "constructor", this).call(this);
    this.state = { isOpen: false };
  }

  _inherits(DatePicker, _React$Component);

  _createClass(DatePicker, [{
    key: "showCalendar",
    value: function showCalendar() {
      this.setState({ isOpen: true });
    }
  }, {
    key: "hideCalendar",
    value: function hideCalendar() {
      // if (this.removeClickOutside)
      //   this.removeClickOutside()
      this.setState({ isOpen: false });
    }
  }, {
    key: "validate",
    value: function validate(date) {
      var d = (0, _moment2["default"])(date);
      var isValid = d.isValid();
      if (this.props.min) isValid = isValid && d.isAfter((0, _moment2["default"])(this.props.min), "day");
      if (this.props.max) isValid = isValid && d.isBefore((0, _moment2["default"])(this.props.max), "day");
      return isValid;
    }
  }, {
    key: "setDate",
    value: function setDate(date) {
      this.hideCalendar();
      if (this.props.onChange) this.props.onChange(date);
    }
  }, {
    key: "onDateChange",
    value: function onDateChange(e) {
      e.preventDefault();
      var input = e.target.dateInput;
      var date = new Date(Date.parse(input.value));
      if (!this.validate(date)) return;
      this.setDate(date);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.keyCode === 27) this.hideCalendar();
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      if (!this.props.label) return;

      return _react2["default"].createElement(
        "label",
        { className: "date-picker-label" },
        this.props.label
      );
    }
  }, {
    key: "renderForm",
    value: function renderForm() {
      var date = (0, _moment2["default"])(this.props.value).format("YYYY-MM-DD");
      var inputProps = {
        className: "date-picker-field-input",
        defaultValue: date,
        onKeyDown: this.handleKeyDown.bind(this),
        onFocus: this.showCalendar.bind(this),
        type: "text",
        name: "dateInput"
      };

      if (this.props.disabled) inputProps.disabled = true;

      var formProps = {
        onSubmit: this.onDateChange.bind(this),
        "aria-role": "group",
        "aria-label": "date-picker-field"
      };

      return _react2["default"].createElement(
        "form",
        formProps,
        _react2["default"].createElement("input", inputProps)
      );
    }
  }, {
    key: "renderCalendar",
    value: function renderCalendar() {
      if (!this.state.isOpen) return;

      var wrapperCN = (0, _classnames2["default"])("date-picker-calendar", { "hidden": !this.state.isOpen });
      var calendarProps = {
        onChange: this.setDate.bind(this),
        value: this.props.value,
        min: this.props.min,
        max: this.props.max
      };

      return _react2["default"].createElement(
        "div",
        { className: wrapperCN },
        _react2["default"].createElement(
          "div",
          { className: "popover bottom fade in" },
          _react2["default"].createElement("div", { className: "arrow" }),
          _react2["default"].createElement(
            "div",
            { className: "popover-content" },
            _react2["default"].createElement(_reactWidgets.Calendar, calendarProps)
          )
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var label = null;
      if (this.props.label) label = this.renderLabel();

      var form = this.renderForm();
      var calendar = this.renderCalendar();

      return _react2["default"].createElement(
        "div",
        { className: "date-picker", "aria-role": "group", "aria-label": "datepicker" },
        label,
        form,
        calendar,
        _react2["default"].createElement("i", { className: "fa fa-calendar" })
      );
    }
  }]);

  return DatePicker;
})(_react2["default"].Component);

DatePicker.propTypes = {
  value: _react2["default"].PropTypes.instanceOf(Date),
  label: _react2["default"].PropTypes.string,
  onChange: _react2["default"].PropTypes.func,
  disabled: _react2["default"].PropTypes.bool,
  min: _react2["default"].PropTypes.instanceOf(Date),
  max: _react2["default"].PropTypes.instanceOf(Date)
};

DatePicker.getDefaultProps = {
  value: new Date()
};

exports["default"] = DatePicker;
module.exports = exports["default"];