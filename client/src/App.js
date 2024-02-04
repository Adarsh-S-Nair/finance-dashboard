import Dashboard from './components/Dashboard';
import './styles/global.scss';
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

  return (
    <main>
      <header className="card">Dashboard</header>
      { loading ? <p>Loading...</p> :
        <Dashboard transactions={transactions} />}
    </main>
  );
}

export default App;
