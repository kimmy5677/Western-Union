/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../../assets/css/Select.css";

const Select = props => {
  const [items, setItems] = useState({ items: [] });
  const [showItems, setShowItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dropDown = () => {
    setShowItems(prevShowItems => !prevShowItems);
  };

  useEffect(() => {
    setItems(props.items);
    setSelectedItem(props.selectedItem);
  }, [props, selectedItem]);

  return (
    <div>
      <div className="select--container">
        <div className="select--selected-item">
          <div className="row align-items-center justify-content-center">
            <div className="col-3">
              <img src={selectedItem ? selectedItem.data.image : ""} alt="" />
            </div>
            <div className="col-9">
              <div className="currency-block">
                <p className="currency-code">
                  {selectedItem ? selectedItem.data.base : ""}
                </p>
                <p className="currency-name">
                  {selectedItem ? selectedItem.data.name : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="select--arrow" onClick={dropDown}>
          <span
            className={`${
              showItems ? "select--arrow-up" : "select--arrow-down"
            }`}
          />
        </div>
        <div
          style={{ display: showItems ? "block" : "none" }}
          className="select--items"
        >
          {items.length > 0 && props.id === "from" ? (
            items.map(item => (
              <div
                key={item.id}
                onClick={() => props.selectItem(item, props.id, setShowItems)}
                className={
                  selectedItem === item
                    ? "selected row align-items-center justify-content-center"
                    : "row currencies align-items-center justify-content-center"
                }
              >
                <div className="col-3">
                  <img src={item.data.image} alt="" />
                </div>
                <div className="col-9">
                  <div className="currency-block">
                    <p className="currency-code">{item.data.base}</p>
                    <p className="currency-name">{item.data.name}</p>
                  </div>
                </div>
              </div>
            ))
          ) : selectedItem ? (
            <div
              onClick={() =>
                props.selectItem(selectedItem, props.id, setShowItems)
              }
              className="selected row align-items-center justify-content-center"
            >
              <div className="col-3">
                <img src={selectedItem.data.image} alt="" />
              </div>
              <div className="col-9">
                <div className="currency-block">
                  <p className="currency-code">{selectedItem.data.base}</p>
                  <p className="currency-name">{selectedItem.data.name}</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Select;
