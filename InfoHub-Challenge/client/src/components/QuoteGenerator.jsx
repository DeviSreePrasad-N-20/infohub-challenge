import React, { useState } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getQuote = () => {
    setIsLoading(true);
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/quote`)

      .then(res => {
        setQuote(res.data.quote);
        setIsLoading(false);
        setError("");
      })
      .catch(() => {
        setError("Failed to fetch quote.");
        setIsLoading(false);
        setQuote("");
      });
  };

 return (
  <div className="module-card">
    <h2 style={{ color: "#ff7e29" }}>Motivational Quote</h2>
    <button
      style={{
        background: "#ff7e29", color: "#fff", borderRadius: "6px",
        border: "none", padding: "7px 17px", fontWeight: "bold"
      }}
      onClick={getQuote}
    >
      Get Quote
    </button>
    {isLoading && <div>Loading...</div>}
    {error && <div style={{ color: "red" }}>{error}</div>}
    {quote && (
      <div style={{
        fontStyle: "italic",
        marginTop: "10px",
        color: "#444",
        fontSize: "1.07em"
      }}>{quote}</div>
    )}
  </div>
);


}
