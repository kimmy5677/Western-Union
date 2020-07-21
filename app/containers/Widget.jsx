import React, { Component } from "react";
import PropTypes from "prop-types";

//TODO: Show currency converter component here
export default class Widget extends Component {
  render() {
    return (
      <div>
        <h1>WP Currency Converter Widget</h1>
        <p>Title: {this.props.wpObject.title}</p>
      </div>
    );
  }
}

Widget.propTypes = {
  wpObject: PropTypes.object
};
