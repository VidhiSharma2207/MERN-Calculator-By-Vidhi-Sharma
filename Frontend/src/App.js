import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = async () => {
    try {
      const result = eval(input).toString();
      setInput(result);

      // Save to backend (separate try)
      try {
        await axios.post("http://localhost:5000/save", {
          expression: input,
          result: result,
        });
      } catch (err) {
        console.log("Backend error (ignored):", err);
      }
    } catch {
      setInput("Error");
    }
  };

  const clear = () => setInput("");
  const del = () => setInput(input.slice(0, -1));

  return (
    <div className="container">
      <div className="calculator">
        <h2>Calculator</h2>

        <input type="text" value={input} readOnly className="display" />

        <div className="buttons">
          {["7", "8", "9", "/"].map((item) => (
            <button onClick={() => handleClick(item)}>{item}</button>
          ))}

          {["4", "5", "6", "*"].map((item) => (
            <button onClick={() => handleClick(item)}>{item}</button>
          ))}

          {["1", "2", "3", "-"].map((item) => (
            <button onClick={() => handleClick(item)}>{item}</button>
          ))}

          {["0", ".", "+", "="].map((item) => (
            <button
              className={item === "=" ? "equal" : ""}
              onClick={() => (item === "=" ? calculate() : handleClick(item))}
            >
              {item}
            </button>
          ))}

          <button className="clear" onClick={clear}>
            C
          </button>
          <button className="delete" onClick={del}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
