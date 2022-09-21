import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currenciesList, setCurrenciesList] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(0);
  const [formData, setFormData] = useState({ input: "", currency: "USD" });

  useEffect(() => {
    async function getCurrenciesList() {
      const currenciesList = await fetch(
        "https://open.er-api.com/v6/latest/USD"
      );
      const response = await currenciesList.json();
      setCurrenciesList(response.rates);
      setCurrencies(Object.keys(response.rates));
    }
    getCurrenciesList();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(formData.input * currenciesList[formData.currency]);
  };

  return (
    <div className="App">
      <h1>Currency Convertor</h1>
      <label htmlFor="amount">How much?</label>
      <input
        type="text"
        name="input"
        value={formData.input}
        onChange={handleChange}
      />{" "}
      <span>USD</span>
      <br />
      <label htmlFor="currencies">Choose currency:</label>
      <select name="currency" value={formData.currency} onChange={handleChange}>
        {currencies.map((currency) => (
          <option key={Math.random()}>{currency}</option>
        ))}
      </select>
      <br />
      <button onClick={handleSubmit}>Convert</button>
      <h2>
        <span>
          {formData.input} USD = &nbsp;
          {result
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {formData.currency}
        </span>
      </h2>
    </div>
  );
}

export default App;
