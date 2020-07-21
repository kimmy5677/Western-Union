/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "../../assets/css/admin.css";
import Alert from "react-bootstrap/Alert";

// eslint-disable-next-line no-unused-vars
const EditForm = ({ update, action, code, rate }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(rate);
  }, [rate]);

  const editRate = () => {
    setEditing(true);
    if (editing) {
      update(code, value);
      setEditing(false);
    }
  };
  const handleCancel = () => {
    setEditing(false);
  };

  const style = !editing ? { display: "none" } : {};
  return (
    <div className="input-group">
      <input
        onChange={e => setValue(e.target.value)}
        value={value}
        type="number"
        disabled={!editing ? "disable" : ""}
        className="form-control"
        placeholder="Rate"
      />
      <div className="input-group-append" id="button-addon4">
        <button
          onClick={() => editRate()}
          className={
            editing ? "btn btn-outline-success" : "btn btn-outline-primary"
          }
          type="button"
        >
          {editing ? "Save" : "Edit"}
        </button>
        <button
          style={style}
          onClick={() => handleCancel()}
          className="btn btn-outline-secondary"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const ChequeTable = props => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const update = async (code, value) => {
    if (props.action === "buy") {
      const result = await axios.put(
        `https://fx-currency-converter.firebaseapp.com/api/v1/cheque/currencies/${code}`,
        {
          cheque: {
            buy: value
          }
        }
      );
      setShow(true);
      setMessage(result.data.success_message);
    } else {
      const result = await axios.put(
        `https://fx-currency-converter.firebaseapp.com/api/v1/cheque/currencies/${code}`,
        {
          cheque: {
            sell: value
          }
        }
      );
      setShow(true);
      setMessage(result.data.success_message);
    }
  };

  return (
    <div>
      <br />
      {show ? (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <p>{message}</p>
        </Alert>
      ) : (
        ""
      )}

      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">Code</th>
            <th scope="col">Last Updated</th>
            <th scope="col">
              {props.action === "buy" ? "Buy Rate" : "Sell Rate"}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.currencies && props.currencies.length > 0 ? (
            props.currencies.map(currency => (
              <tr key={currency.id}>
                <td>
                  <span role="img">{currency.data.flag}</span>
                  {currency.data.name}
                </td>
                <td>{currency.data.base}</td>
                <td>
                  {moment(Date(currency.data.date._seconds)).format(
                    "MMM Do YY"
                  )}
                </td>
                <td>
                  {props.action === "buy" ? (
                    <EditForm
                      update={update}
                      action={props.action}
                      code={currency.id}
                      rate={currency.data.cheque.buy}
                    />
                  ) : (
                    <EditForm
                      update={update}
                      action={props.action}
                      code={currency.id}
                      rate={currency.data.cheque.sell}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No currencies</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ChequeTable;
