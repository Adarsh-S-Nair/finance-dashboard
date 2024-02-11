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

    const monetizeNumber = (n) => {
        return `$${toNumberWithCommas(n.toFixed(2))}`;
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

    const getEarnedData = () => {
        let earned = 0;
        let spent = 0;
        transactions.forEach(t => {
            if (t['Debits'] === "")
                earned += t['Income']
            else
                spent += t['Debits']
        })

        let higher = earned > spent ? earned : spent;
        return [earned, spent, Math.pow(10, Math.ceil(Math.log10(higher)))]
    }
    
    return (
        <Box m="20px" overflow="auto">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" mr="20px">
                <InfoCard width={3} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"}/>
                <InfoCard width={3} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                <InfoCard width={6} height={2} chart="table" data={transactions} monetize={monetizeNumber}/>
                <InfoCard width={3} height={1} chart="earned" data={getEarnedData()} title="Earned vs Spent"/>
                <InfoCard width={8} height={2} />
                <InfoCard width={4} height={2} />
                {/* <InfoCard width={12} height={2} /> */}
            </Box>
        </Box>
    )
}

export default Dashboard;