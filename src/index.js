import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Timesheet from "./Timesheet";
import SignUp from "./SignUp";
import Login from "./Login";
import Export from "./Export"
import Settings from "./Settings"
import TSA_Timesheet from "./TSA_Timesheet";
import TSA_View_Timesheet from "./TSA_View_Timesheet";
import View_backup from "./View_backup";
import Practice from "./practice";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/view_backup" element={<View_backup />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/timesheet" element={<Timesheet />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/export" element={<Export />} />
      <Route path="/tsa_timesheet" element={<TSA_Timesheet />} />
      <Route path="/tsa_view_timesheet" element={<TSA_View_Timesheet />} />
    </Routes>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
