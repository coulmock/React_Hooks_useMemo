import React, { useState, useMemo, useEffect } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  /* Use useMemo when you need perfomance benefice, no need to use it frequently
  Case of wrapping a slow function so it does not re-render 
  everytime */
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  /* second case of useMemo is reference equality, 
  make sure the reference of an object or an array is excatly the same as it was the 
  last time you render  */
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("Theme changed");
  }, [themeStyles]);

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );

  function slowFunction(num) {
    console.log("calling slow function");
    for (let i = 1; i < 1000000; i++) {}
    return num * 2;
  }
}

export default App;
