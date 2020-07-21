/* eslint-disable no-undef */
/* eslint-disable no-console */
import moment from "moment";

const initState = {
  lastInput: null,
  results: {
    date: "",
    amount: 0,
    calculated: 0,
    base: "",
    convertTo: "",
    sell: 0,
    buy: 0
  },
  showResults: false,
  toggle: false,
  currencies: [],
  base: null,
  amount: "",
  selectedItem: null,
  convertTo: null
};

const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-undef
    console.log(e);
  }
};

const MainReducer = (state = initState, action) => {
  if (action.type === "SAVE_LAST_CALCULATED") {
    return {
      ...state,
      lastInput: action.value
    };
  } else if (action.type === "SET_RESULTS") {
    return {
      ...state,
      results: action.payload
    };
  } else if (action.type === "SET_SHOW_RESULTS") {
    return {
      ...state,
      showResults: action.status
    };
  } else if (action.type === "SET_TOGGLE") {
    return {
      ...state,
      toggle: action.toggle
    };
  } else if (action.type === "SET_CURRENCIES") {
    return {
      ...state,
      currencies: action.currencies
    };
  } else if (action.type === "SET_BASE") {
    return {
      ...state,
      base: action.base
    };
  } else if (action.type === "SET_AMOUNT") {
    return {
      ...state,
      amount: action.amount
    };
  } else if (action.type === "SET_SELECTED_ITEM") {
    return {
      ...state,
      selectedItem: action.selectedItem
    };
  } else if (action.type === "SET_CONVERT_TO") {
    return {
      ...state,
      convertTo: action.payload
    };
  } else if (action.type === "CALCULATE") {
    if (!state.lastInput) {
      return state;
    } else {
      if (state.toggle === false) {
        let decimal = state.selectedItem.data.cash.buy * state.amount;
        const payLoad = {
          date: moment
            .unix(state.selectedItem.data.date._seconds)
            .format("MMMM Do YYYY | h:mm:ss a"),

          amount: formatMoney(state.amount, state.amount < 1 ? 4 : 2),
          calculated: formatMoney(
            state.selectedItem.data.cash.buy * state.amount,
            decimal < 1 ? 4 : 2
          ),
          // base: state.selectedItem.data.base,
          base: state.base.data.base,
          // convertTo: "JMD",
          convertTo: state.convertTo.data.base,
          sell: formatMoney(state.selectedItem.data.cash.sell),
          buy: formatMoney(state.selectedItem.data.cash.buy)
        };

        return {
          ...state,
          results: payLoad,
          showResults: true
        };
      } else {
        let decimal = state.amount / state.selectedItem.data.cash.sell;
        const payLoad = {
          date: moment
            .unix(state.selectedItem.data.date._seconds)
            .format("MMMM Do YYYY | h:mm:ss a"),
          amount: formatMoney(state.amount, state.amount < 1 ? 4 : 2),
          // calculated: formatMoney(
          //   state.selectedItem.data.cash.sell * state.amount

          // ),
          calculated: formatMoney(
            state.amount / state.selectedItem.data.cash.sell,
            decimal < 1 ? 4 : 2
          ),
          // base: state.selectedItem.data.base,
          base: state.base.data.base,
          // convertTo: "JMD",
          convertTo: state.convertTo.data.base,
          sell: formatMoney(state.selectedItem.data.cash.sell),
          buy: formatMoney(state.selectedItem.data.cash.buy, 2)
        };

        return {
          ...state,
          results: payLoad,
          showResults: true
        };
      }
    }
  }
  return state;
};

export default MainReducer;
