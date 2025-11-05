import React, { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

import "./App.css"; // Make sure this line is present!




function App() {
  const tabs = [
    { name: "Weather", component: <WeatherModule /> },
    { name: "Currency", component: <CurrencyConverter /> },
    { name: "Quote", component: <QuoteGenerator /> }
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div className="app-card">
      <h1 style={{ textAlign: "center", color: "#3b5998" }}>InfoHub</h1>
      <div className="tabs">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            onClick={() => setSelected(idx)}
            className={idx === selected ? 'active' : ''}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {tabs[selected].component}
      <div style={{
  textAlign: "center",
  marginTop: 24,
  paddingTop: 12,
  fontSize: "0.99em",
  color: "#888"
}}>
  Made with ❤️ using React & Express | InfoHub Challenge
</div>

      
    </div>
    
  );
}

export default App;
