/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import axios from "axios";
import IPPSwitch from "./Switch";
import Form from "./Form";
import Results from "./Results";
import "../../assets/css/App.css";
import { connect } from "react-redux";

const App = props => {
  useEffect(() => {
    let result;
    const fetchData = async () => {
      result = await axios(
        "https://fx-currency-converter.firebaseapp.com/api/v1/currencies/"
      );

      props.setCurrencies(result.data);

      props.setBase(result.data && result.data[4]);
      props.setConvertTo({
        data: {
          base: "JMD",
          image:
            "https://firebasestorage.googleapis.com/v0/b/fx-currency-converter.appspot.com/o/JMD.png?alt=media&token=b94977bf-77e7-480c-9dd9-1878608249a1",
          name: "Jamaican Dollar",
          id: "JMD"
        }
      });
    };
    fetchData().then(() => {
      !props.toggle
        ? props.setSelectedItem(result.data && result.data[4])
        : props.setSelectedItem(props.convertTo);
    });
  }, []);

  const swap = () => {
    props.setBase(props.convertTo);
    props.setConvertTo(props.base);
    setTimeout(() => {
      props.calculate();
    }, 100);
  };

  return (
    <div className="container mt-5">
      <div className="card py-4 px-4">
        <div className="card-body">
          <div className="row align-items-top justify-content-between">
            <div className="col-md-8">
              <h4 className="card-title">FX CURRENCY CONVERTER</h4>
            </div>
            <div className="col-md-3">
              <IPPSwitch swap={swap} />
            </div>
          </div>
          <hr />
          <Form
            setBase={props.setBase}
            base={props.base}
            convertTo={props.convertTo}
            setConvertTo={props.setConvertTo}
            currencies={props.currencies}
          />
          {props.showResults ? (
            <Results />
          ) : (
            <div className="row align-items-center justify-content-center mt-4">
              <small>*Rates are subject to change without notice.</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showResults: state.main.showResults,
    currencies: state.main.currencies,
    convertTo: state.main.convertTo,
    toggle: state.main.toggle,
    base: state.main.base
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setCurrencies: currencies => {
      dispatch({ type: "SET_CURRENCIES", currencies: currencies });
    },
    setBase: base => {
      dispatch({ type: "SET_BASE", base: base });
    },
    setConvertTo: payload => {
      dispatch({ type: "SET_CONVERT_TO", payload: payload });
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
)(App);
