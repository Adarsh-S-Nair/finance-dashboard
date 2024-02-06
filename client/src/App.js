import './styles/global.scss';
import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/Dashboard';


function App() {
  const [loading, setLoading] = useState(true);
  const [theme, colorMode] = useMode(); 
  const [transactions, setTransactions] = useState(null);


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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className='content'>
              <Topbar/>
              <Routes>
                <Route path="/" element={ <Dashboard /> }/>
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
