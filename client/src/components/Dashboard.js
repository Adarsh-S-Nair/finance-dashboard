import '../styles/dashboard.scss';

const Dashboard = (props) => {
    let transactions = props.transactions;

    const getRunningBalance = () => {
        let balance = transactions[transactions.length - 1]["Running Balance"].toFixed(2);
        return `$${toNumberWithCommas(balance)}`;
      }
    
      const toNumberWithCommas = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    return (
        <div className="dashboard">
            <div className="top-charts">
                <div className="left-charts">
                    <div className="timeframe card"></div>
                    <div className="balance card">
                        <div className="info">
                            <h5>Current Balance</h5>
                            <h2>{getRunningBalance()}</h2>
                        </div>
                    </div>
                    <div className="earned-spent card"></div>
                </div>
                <div className="middle-chart card"></div>
                <div className="right-chart card"></div>
            </div>
            <div className="bottom-chart card"></div>
        </div>
    )
}

export default Dashboard;