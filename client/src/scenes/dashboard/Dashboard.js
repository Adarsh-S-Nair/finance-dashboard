import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import InfoCard from "./InfoCard";

const Dashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    let transactions = props.transactions;

    const getRunningBalance = () => {
        let balance = transactions[transactions.length - 1]["Running Balance"];
        return `$${toNumberWithCommas(balance)}`;
    }
    
    const toNumberWithCommas = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getPieData = () => {
        let categories = {}
        let data = []
        transactions.forEach(t => {
            // If this is not a debit, go to the next transaction
            if (t['Debits'] === "") return;

            let category = t["Category"]
            let debit = t['Debits']

            if (category in categories)
                categories[category] += debit
            else
                categories[category] = debit

        })

        // Create the data array
        Object.keys(categories).forEach(c => {
            data.push({ id: c, category: c, spent: categories[c] })
        })

        const compare = (a, b) => { return b.spent - a.spent }
        data.sort(compare)
        return data;
    }

    return (
        <Box m="20px">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                <InfoCard width={3} height={1} title={getRunningBalance()} subtitle={"Current Balance"}/>
                <InfoCard width={3} height={2} isChart={true} data={getPieData()} />
                <InfoCard width={6} height={2} />
                <InfoCard width={3} height={1} />
                <InfoCard width={8} height={2} />
                <InfoCard width={4} height={2} />
            </Box>
        </Box>
    )
}

export default Dashboard;