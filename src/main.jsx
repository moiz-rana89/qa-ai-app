import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import configureStore from "./reduxStore/store/configureStore";
import { ConfigProvider } from "antd";
import { AntDNotificationProvider } from "./components/AntDNotification";

import antdTheme from "./theme/antdTheme";

const store = configureStore({});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ConfigProvider theme={antdTheme}>
      <AntDNotificationProvider>
        <App />
      </AntDNotificationProvider>
    </ConfigProvider>
  </Provider>
  // </StrictMode>
);
