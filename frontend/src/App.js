import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", { text });
      setResult(response.data);
    } catch (error) {
      console.error("Error calling FastAPI:", error);
      setResult({ error: "Failed to get response from backend" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sentiment Analysis</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      />
      <br />
      <button onClick={analyzeSentiment}>Analyze</button>
      {result && (
        <div>
          <h2>Result:</h2>
          <p><strong>Label:</strong> {result.label}</p>
          <p><strong>Score:</strong> {result.score}</p>
        </div>
      )}
    </div>
  );
}

export default App;
