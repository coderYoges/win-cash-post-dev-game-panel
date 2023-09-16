import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import "./styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/global.css";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter forceRefresh={false}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
