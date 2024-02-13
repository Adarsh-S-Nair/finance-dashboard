import './styles/global.scss';
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/Dashboard';
import Transactions from './scenes/transactions/Transactions';


function App() {
  const [loading, setLoading] = useState(true);
  const [theme, colorMode] = useMode(); 
  const [transactions, setTransactions] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const location = useLocation();
  const ENDPOINT = process.env.REACT_APP_SCRIPT_ENDPOINT_OLD;

  const getTitle = () => {
    let title = location.pathname.slice(1)
    if (title == "") title = "dashboard"
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  const [selected, setSelected] = useState(getTitle());

  const setActive = (title) => {
    setSelected(title)
    setSidebarExpanded(false)
  }

  useEffect(() => {
    fetch(`${ENDPOINT}`)
      .then(res => res.json())
      .then(data => {
        data = cleanData(JSON.parse(data.data))
        setTransactions(data.slice(1))
        setLoading(false)
      })
  }, []);

  const cleanData = (data) => {
    // Round the running balances to 2
    let cleaned = data.map((t) => {
      let rounded = t["Running Balance"].toFixed(2);
      t["Running Balance"] = rounded;
      return t;
    })
    return cleaned
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar selected={selected} setActive={setActive} expanded={sidebarExpanded} setExpanded={setSidebarExpanded}/>
            <main className='content' style={{height: "100vh", display: "flex", flexDirection:"column", overflow:"hidden"}}>
              <Topbar/>
              {loading ? <h1>Loading...</h1> :
              
              <Routes>
                <Route path="/" element={ <Dashboard setActive={setActive} transactions={transactions}/> }/>
                <Route path="/transactions" element={ <Transactions transactions={transactions}/> }/>
              </Routes>

              }
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
