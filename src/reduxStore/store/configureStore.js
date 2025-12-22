import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducer from "../reducer";

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Check if module and module.hot are defined before using them
  if (typeof module !== "undefined" && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducer", () => {
      const nextReducer = require("../reducer").default; // Include .default for ES6 modules
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
