import React, { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConversion = () => {
    setIsLoading(true);
    axios.get(`/api/currency?amount=${amount}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
        setError("");
      })
      .catch(() => {
        setError("Failed to load currency.");
        setIsLoading(false);
        setData(null);
      });
  };

 return (
  <div className="module-card">
    <h2 style={{ color: "#19a974" }}>Currency Converter</h2>
    <input
      type="number"
      value={amount}
      onChange={e => setAmount(e.target.value)}
      style={{ marginRight: "8px" }}
    />
    <button
      style={{
        background: "#19a974", color: "#fff", borderRadius: "6px",
        border: "none", padding: "8px 18px", fontWeight: "bold"
      }}
      onClick={fetchConversion}
    >
      Convert
    </button>
    {isLoading && <div>Loading...</div>}
    {error && <div style={{ color: "red" }}>{error}</div>}
    {data && (
      <div style={{ marginTop: "10px" }}>
        <div>{amount} INR = <b>{data.usd} USD</b></div>
        <div>{amount} INR = <b>{data.eur} EUR</b></div>
      </div>
    )}
  </div>
);

}
