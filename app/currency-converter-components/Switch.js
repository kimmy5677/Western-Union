/* eslint-disable react/prop-types */
import React from "react";
import "../../assets/css/Switch.css";
import Switch from "react-switch";
import { connect } from "react-redux";

const IPPSwitch = props => {
  const handleChange = () => {
    props.swap();
    props.handleToggle(props.toggle);
  };
  return (
    <div className="flex-container">
      <label className="flex-item">SELLING</label>
      <div className="flex-item">
        <Switch
          className="switch"
          onColor="#ffffff"
          offColor="#C9C9C9"
          onHandleColor="#92245D"
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={handleChange}
          checked={props.toggle}
        />
      </div>
      <label className="flex-item">BUYING</label>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    toggle: state.main.toggle
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleToggle: toggle => {
      dispatch({ type: "SET_TOGGLE", toggle: !toggle });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IPPSwitch);
