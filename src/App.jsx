import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Welcome from "./Components/Welcome";

function App() {
  return (
    <>
      <Welcome />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
