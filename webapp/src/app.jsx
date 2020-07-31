import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import reducer from "../src/shopping-cart/reducer.js";
import { Provider } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppComponent from "../src/shopping-cart/app-component.jsx";

const rootReducer = combineReducers({
  app: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="main-container">
          <CssBaseline />
          <AppComponent />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
