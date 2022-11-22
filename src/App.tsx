import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MainPage } from "pages";
import { SnackBarComponent } from "components";

function App() {
  return (
    <div className="h-full relative">
      <SnackBarComponent />
      <MainPage />
    </div>
  );
}

export default App;
