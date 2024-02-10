import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import InfoCard from "./InfoCard";

const Dashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    let transactions = props.transactions;

    const getRunningBalance = () => {
        let balance = transactions[transactions.length - 1]["Running Balance"].toFixed(2);
        return `$${toNumberWithCommas(balance)}`;
      }
    
      const toNumberWithCommas = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    return (
        <Box m="20px">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                <InfoCard width={3} title={getRunningBalance()} subtitle={"Current Balance"}/>
            </Box>
        </Box>
    )
}

export default Dashboard;