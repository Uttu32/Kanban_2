import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing/Routing";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RecoilRoot>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </RecoilRoot>
  </>
);
