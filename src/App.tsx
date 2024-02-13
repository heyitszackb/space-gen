// App.js
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CanvasContainer from "./components/CanvasContainer";
import OpenAI from "openai";

function App() {
  const [response, setResponse] = useState<string | null>("");
  const [apiKey, setApiKey] = useState("");

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const fetchCompletion = async () => {
    if (!apiKey.trim()) {
      alert("Please enter your OpenAI API Key.");
      return;
    }
  
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Short response. What is the capital of france?" }],
        model: "gpt-3.5-turbo",
      });
      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching completion:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleButtonClick = () => {
    fetchCompletion();
  };

  const handleApiKeyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setApiKey(event.target.value);
  };

  return (
    <>
      <CanvasContainer />
      <div>{response}</div>
      <input
        type="text"
        placeholder="Enter your OpenAI API Key"
        value={apiKey}
        onChange={handleApiKeyChange}
      />
      <button onClick={handleButtonClick}>Fetch Response</button>
      Hello, world!
    </>
  );
}

export default App;