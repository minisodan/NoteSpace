import "./App.css";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await invoke<string>("Hi!");
        setMessage(response);
      } catch (error) {
        console.log("Error invoke: ", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Tauri + React</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
};

export default App;
