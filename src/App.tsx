import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

/**
 * Entry function from main.tsx which will be the main entry point for the differing Components
 */
const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // this is the invoke function in which is called for Tauri to fetch the 'Hi!'
        const response = await invoke<string>("say_hi");
        console.log("Response:", response);
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
