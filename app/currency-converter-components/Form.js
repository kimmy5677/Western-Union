/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import Select from "./Select";
import "../../assets/css/Form.css";
import { connect } from "react-redux";

const Form = props => {
  const handleInput = e => {
    props.saveLastCalculatedEntry(e);
    props.setAmount(e.target.value);
    // props.calculate();
  };
  const selectItem = (item, id, setShowItems) => {
    if (!props.toggle) {
      if (id === "from") {
        props.setBase(item);
        props.setSelectedItem(item);
      } else if (id === "to") {
        props.setConvertTo(item);
      }
    } else {
      if (id === "to") {
        props.setBase(item);
      } else if (id === "from") {
        props.setConvertTo(item);
        props.setSelectedItem(item);
      }
    }
    props.setShowResults(false);
    setShowItems(false);
  };

  return (
    <form className="mt-2">
      <div className="form-row align-items-center justify-content-around">
        <div className="col-md-4">
          <div className="form-group">
            <label>AMOUNT</label>
            <input
              type="number"
              onChange={handleInput}
              min="0"
              max="1000"
              placeholder="Please enter a value"
              defaultValue={props.amount}
              className="form-control form-control-lg amount-input"
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>FROM</label>
            <Select
              id={props.toggle ? "to" : "from"}
              selectItem={selectItem}
              selectedItem={props.base}
              items={props.currencies}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>TO</label>
            <Select
              id={props.toggle ? "from" : "to"}
              selectedItem={props.convertTo}
              selectItem={selectItem}
              items={props.currencies}
            />
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              props.calculate();
            }}
            className="btn btn-block btn-lg convert-btn"
          >
            Convert
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    test: state.main,
    lastInput: state.main.lastInput,
    toggle: state.main.toggle,
    currencies: state.main.currencies,
    amount: state.main.amount,
    base: state.main.base,
    selectedItem: state.main.selectedItem,
    convertTo: state.main.convertTo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveLastCalculatedEntry: e => {
      dispatch({ type: "SAVE_LAST_CALCULATED", value: e });
    },
    setResultsInRedux: payload => {
      dispatch({ type: "SET_RESULTS", payload: payload });
    },
    setShowResults: status => {
      dispatch({ type: "SET_SHOW_RESULTS", status: status });
    },
    setAmount: amount => {
      dispatch({ type: "SET_AMOUNT", amount: amount });
    },
    setSelectedItem: payload => {
      dispatch({ type: "SET_SELECTED_ITEM", selectedItem: payload });
    },
    calculate: () => {
      dispatch({ type: "CALCULATE" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
