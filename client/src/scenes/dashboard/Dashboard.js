import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";

const Dashboard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const size = props.size;

    let transactions = props.transactions;
    let startingBalance = props.startingBalance;

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

        data.sort(compare)
        return data;
    }

    const compare = (a, b) => { return b.spent - a.spent }

    const getLineData = () => {
        let months = {};
        let data = [];
        transactions.forEach(t => {
            let month = formatDate(t['Date']);

            if (!(month in months))
                months[month] = { earned: 0, spent: 0};

            if (t['Debits'] === "")
                months[month].earned += Number(t['Income'])
            else
                months[month].spent += Number(t['Debits'])
        })

        Object.keys(months).forEach(m => {
            data.push({ month: m, earned: months[m].earned, spent: months[m].spent })
        })
        return data;
    }

    const getTopExpenses = () => {
        let expenses = {}
        let data = []
        transactions.forEach(t => {
            if (t['Debits'] === "") return;

            let expense = t['Description']
            if (!(expense in expenses))
                expenses[expense] = { spent: 0 }

            expenses[expense].spent += Number(t['Debits'])
        })

        Object.keys(expenses).forEach(e => {
            data.push({ expenses: e, spent: expenses[e].spent })
        })
        data.sort(compare)
        return data;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString().slice(2);
        return `${month}/${year}`;
    }

    const getEarnedData = () => {
        let earned = 0;
        let spent = 0;
        transactions.forEach(t => {
            if (t['Debits'] === "")
                earned += Number(t['Income'])
            else
                spent += Number(t['Debits'])
        })

        let higher = earned > spent ? earned : spent;
        return [earned.toFixed(2), spent.toFixed(2), higher * 1.5]
    }

    const getTotalChange = () => {
        let initial = Number(startingBalance['Running Balance'])
        let final = Number(transactions[transactions.length - 1]['Running Balance'])
        
        let change = Number(((final - initial) / initial) * 100).toFixed(2)
        return change;
    }

    const cardSizes = {
        desktop: [[3, 1], [3, 2], [6, 2], [3, 1], [8, 2], [4, 2]],
        tablet: [[6, 1], [6, 2], [12, 2], [6, 1], [12, 2], [6, 2]],
        mobile: [[12, 1], [12, 2], [12, 2], [12, 1], [12, 2], [12, 2]]
    }

    return (
        <Box m="20px">
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" mr="0px">
                { size === "desktop" ? 
                <>
                    <InfoCard width={3} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"} change={getTotalChange()}/>
                    <InfoCard width={3} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                    <InfoCard width={6} height={2} chart="table" data={transactions} title="Recent Transactions" monetize={monetizeNumber} fullView={true} setActive={props.setActive}/>
                    <InfoCard width={3} height={1} chart="earned" data={getEarnedData()} title="Total Earned vs Spent"/>
                    <InfoCard width={8} height={2} chart="line" data={getLineData()} title={"Earned vs Spent Time Series"} dropdown={true}/>
                    <InfoCard width={4} height={2} chart="expenses" data={getTopExpenses()} title={"Top Expenses"} monetize={monetizeNumber}/>
                </> : size === "tablet-1" ?
                <>
                    <InfoCard width={6} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"} change={getTotalChange()}/>
                    <InfoCard width={6} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                    <InfoCard width={6} height={1} chart="earned" data={getEarnedData()} title="Total Earned vs Spent"/>
                    <InfoCard width={8} height={2} chart="table" data={transactions} title="Recent Transactions" monetize={monetizeNumber} fullView={true} setActive={props.setActive}/>
                    <InfoCard width={4} height={2} chart="expenses" data={getTopExpenses()} title={"Top Expenses"} monetize={monetizeNumber}/>
                    <InfoCard width={12} height={2} chart="line" data={getLineData()} title={"Earned vs Spent Time Series"} dropdown={true}/>
                </> : size === "tablet-2" ? 
                <>
                    <InfoCard width={6} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"} change={getTotalChange()}/>
                    <InfoCard width={6} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                    <InfoCard width={6} height={1} chart="earned" data={getEarnedData()} title="Total Earned vs Spent"/>
                    <InfoCard width={7} height={2} chart="table" data={transactions} title="Recent Transactions" monetize={monetizeNumber} fullView={true} setActive={props.setActive}/>
                    <InfoCard width={5} height={2} chart="expenses" data={getTopExpenses()} title={"Top Expenses"} monetize={monetizeNumber}/>
                    <InfoCard width={12} height={2} chart="line" data={getLineData()} title={"Earned vs Spent Time Series"} dropdown={true}/>
                </> : size === "tablet-3" ? 
                <>
                    <InfoCard width={6} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"} change={getTotalChange()}/>
                    <InfoCard width={6} height={2} chart="expenses" data={getTopExpenses()} title={"Top Expenses"} monetize={monetizeNumber}/>
                    <InfoCard width={6} height={1} chart="earned" data={getEarnedData()} title="Total Earned vs Spent"/>
                    <InfoCard width={12} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                    <InfoCard width={12} height={2} chart="table" data={transactions} title="Recent Transactions" monetize={monetizeNumber} fullView={true} setActive={props.setActive}/>
                    <InfoCard width={12} height={2} chart="line" data={getLineData()} title={"Earned vs Spent Time Series"} dropdown={true}/>
                </> :
                <>
                    <InfoCard width={12} height={1} chart="info" title={getRunningBalance()} subtitle={"Current Balance"} change={getTotalChange()}/>
                    <InfoCard width={12} height={1} chart="earned" data={getEarnedData()} title="Total Earned vs Spent"/>
                    <InfoCard width={12} height={2} chart="pie" data={getPieData()} title="Spending Chart"/>
                    <InfoCard width={12} height={2} chart="expenses" data={getTopExpenses()} title={"Top Expenses"} monetize={monetizeNumber}/>
                    <InfoCard width={12} height={2} chart="table" data={transactions} title="Recent Transactions" monetize={monetizeNumber} fullView={true} setActive={props.setActive}/>
                    <InfoCard width={12} height={2} chart="line" data={getLineData()} title={"Earned vs Spent Time Series"} dropdown={true}/>
                </>
                }
            </Box>
        </Box>
    )
}

export default Dashboard;