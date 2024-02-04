import './App.css';
import { useState, useEffect } from "react";


function App() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState(null)

  const ENDPOINT = process.env.REACT_APP_SCRIPT_ENDPOINT;

  useEffect(() => {
    fetch(`${ENDPOINT}`)
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
  }, []);

  const getRunningBalance = () => {
    let balance = transactions[transactions.length - 1]["Running Balance"].toFixed(2);
    return toNumberWithCommas(balance);
  }

  const toNumberWithCommas = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <p>Running Balance: ${getRunningBalance()} </p>}
    </div>
  );
}

export default App;
