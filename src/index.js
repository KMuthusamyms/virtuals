import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Ion } from "cesium";
// import reportWebVitals from "./reportWebVitals";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YThkZWM4Ni1hNDFlLTRlODEtYjI4OS1hOTYzNzYxOTY4MTMiLCJpZCI6MzAwNDAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTMwMTE4NTZ9.inRXr73SAY9FVJG09oFj82GdMLNUemF0v8olRiXJ_fU";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
