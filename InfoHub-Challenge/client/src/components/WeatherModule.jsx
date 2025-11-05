import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/weather`)

      .then(res => {
        setData(res.data);
        setIsLoading(false);
        setError("");
      })
      .catch(() => {
        setError("Failed to load weather.");
        setIsLoading(false);
        setData(null);
      });
  }, []);

  if (isLoading) return <div>Loading weather...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

return (
  <div className="module-card">
    <h2 style={{ color: "#007bff" }}>Weather</h2>
    {isLoading && <div>Loading weather...</div>}
    {error && <div style={{ color: "red" }}>{error}</div>}
    {data ? (
      <>
        <div>Temperature: <b>{data.temperature}°C</b></div>
        <div>Condition: <b>{data.condition}</b></div>
      </>
    ) : (!isLoading && !error ? <div>No weather data yet.</div> : null)}
  </div>
);


}
