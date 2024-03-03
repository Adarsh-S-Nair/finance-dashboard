import './styles/global.scss';
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from './scenes/signin/signin';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/Dashboard';
import Transactions from './scenes/transactions/Transactions';


function App() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [loading, setLoading] = useState(true);
  const [theme, colorMode] = useMode(); 
  const [startingBalance, setStartingBalance] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const location = useLocation();

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
    if (!user) return;
    setLoading(true)

    fetch(`${BASE_URL}/api/user-data`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ getUrl: user["GET URL"] })
    }).then(res => res.json())
      .then(data => {
        data = cleanData(JSON.parse(data.data))
        setStartingBalance(data[0])
        setTransactions(data.slice(1))
        setLoading(false)
      })
  }, [user]);

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
            {!user ? <SignIn setUser={setUser} BASE_URL={BASE_URL}/> :
            <>
              <Sidebar selected={selected} setActive={setActive} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} setUser={setUser} />
              <main className='content' style={{height: "100vh", display: "flex", flexDirection:"column", overflow:"hidden"}}>
                <Topbar/>
                {loading ? <h1>Loading...</h1> :
                
                <Routes>
                  <Route path="/" element={ <Dashboard setActive={setActive} transactions={transactions} startingBalance={startingBalance}/> }/>
                  <Route path="/transactions" element={ <Transactions transactions={transactions}/> }/>
                </Routes>

                }
              </main>
            </>
            }
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
