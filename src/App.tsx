import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [quote, setQuote] = useState("");
  const fetchQuote = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setQuote(res.data.slip.advice);
        readText(res.data.slip.advice);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const readText = (advice: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = advice;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser doesn't support speech synthesis.");
    }
  };

  useEffect(() => {
    fetchQuote();
    
  }, []);
  return (
    <div className="app">
      <div className="master">
        <div className="container">
          <div id="title">{quote}</div>
          <div id="bottom">
            <button onClick={fetchQuote}>Give me advice!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
