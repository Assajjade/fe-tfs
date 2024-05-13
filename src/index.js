import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import global_en from "./translations/en/blog.json";
import global_id from "./translations/id/blog.json";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    id: {
      global: global_id,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <i18nextProvider i18n={i18next}>
        <App />
      </i18nextProvider>
    </React.StrictMode>
  </Router>
);

reportWebVitals();
