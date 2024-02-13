// App.js
import React, { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import CanvasContainer from "./components/CanvasContainer";
import OpenAI from "openai";
import html2canvas from 'html2canvas';

function App() {
  const printRef = React.useRef<HTMLDivElement>(null);
  const [response, setResponse] = useState<string | null>("");
  const [apiKey, setApiKey] = useState("");

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const fetchCompletion = async () => {
    if (!apiKey.trim()) {
      alert("Please enter your own OpenAI API Key.");
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

  const handleDownloadImage = async () => {
    const element = printRef.current;

    if (!element) {
      return; // Return or handle the case when the element is undefined
    }

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'coolImage.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
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
    <button type="button" onClick={handleDownloadImage}>
        Download as Image
      </button>


      <div ref={printRef}>
        <CanvasContainer />
      </div>
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