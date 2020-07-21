/* eslint-disable react/prop-types */
import React from "react";
import "../../assets/css/App.css";
import { connect } from "react-redux";

const Results = props => {
  // eslint-disable-next-line no-unused-vars
  const cancel = e => {
    props.setShowResults(false);
  };
  return (
    <div className="converter-results">
      <div className="row align-items-center justify-content-center mt-3">
        <h4 className="text-center text-white font-weight-bold">
          {props.results.amount} {props.results.base} ={" "}
        </h4>
      </div>
      <div className="row align-items-center justify-content-center mt-3">
        <h1 className="results text-white  text-center display-4">
          {props.results.calculated}&nbsp;{props.results.convertTo}
        </h1>
      </div>
      <div className="row align-items-center justify-content-center mt-3">
        <div className="btn-group btn-group-lg" role="group">
          {/* <button type="button" className="btn px-5 py-2 reserve-btn">
            Reserve
          </button> */}
          <button
            onClick={e => cancel(e)}
            type="button"
            className="btn bg-transparent text-white cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="row align-items-center justify-content-center mt-5">
        {!props.toggle ? (
          <h5 className="text-center text-white exchange-rate">
            <strong>Our Buying Rate: </strong> 1 {props.results.base} ={" "}
            {props.results.buy} {props.results.convertTo}
          </h5>
        ) : (
          <h5 className="text-center text-white exchange-rate">
            <strong>Our Selling Rate: </strong> 1 {props.results.convertTo} ={" "}
            {props.results.sell} {props.results.base}
          </h5>
        )}
      </div>
      <div className="row align-items-center justify-content-center mt-4">
        <h5 className="text-uppercase text-center text-white   font-weight-bold ">
          Effective Date: {props.results.date}
        </h5>
      </div>
      <div className="row  align-items-center justify-content-center mt-4">
        <small className="text-white  text-center">
          *Rates are subject to change without notice.
        </small>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    results: state.main.results,
    toggle: state.main.toggle
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setShowResults: status => {
      dispatch({ type: "SET_SHOW_RESULTS", payload: status });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
