import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import { Link } from "react-router-dom";
import { useState } from "react";

const InfoCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [chartType, setChartType] = useState("Line")

    const determineChart = () => {
        const containerStyle = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 10%)", width: "100%"}
        if (props.chart == "pie") {
            return (
                <Box style={containerStyle}>
                    <PieChart data={props.data}/>
                </Box>
            )
        }
        else if (props.chart == "line") {
            return (
                <Box style={containerStyle} p="0 30px">
                    <LineChart data={props.data}/>
                </Box>
            )
        }
        else if (props.chart == "earned") {
            let earnedPercentage = Math.round((props.data[0] / props.data[2]) * 100)
            let spentPercentage = Math.round((props.data[1] / props.data[2]) * 100)

            const style = {height: "15px", margin: "10px 30px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center"}
            return (
                <Box mt="5px" style={containerStyle}>
                    <Box style={style} width={`${earnedPercentage}%`} backgroundColor={colors.greenAccent[600]}>
                        <h5>{`$${props.data[0]}`}</h5>
                    </Box>
                    <Box style={style} width={`${spentPercentage}%`} backgroundColor={colors.redAccent[600]}>
                        <h5>{`$${props.data[1]}`}</h5>
                    </Box>
                </Box>
            )
        }
    }

    const infoContent = () => {
        let change = props.change
        return (
            <Box width="100%" m="0 30px">
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h1" fontWeight="bold" sx={{color: colors.gray[100]}}>
                            {props.title}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold" sx={{color: colors.gray[100]}}>
                        {props.subtitle}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{color: change < 0 ? colors.redAccent[500] : colors.greenAccent[500]}}>
                        {`${change < 0 ? '- ' : '+ '}${props.change}%`}
                    </Typography>
                </Box>
            </Box>
        )
    }

    const chartContent = () => {
        return (
            <Box width="100%" display="flex" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`2px solid ${colors.primary[500]}`}
                 colors={colors.gray[100]} p="15px" backgroundColor={colors.blueAccent[700]}>
                    <Typography colors={colors.gray[100]} variant="h5" fontStyle="bold" fontWeight="600">
                        {props.title}
                    </Typography>
                    {props.dropdown ?
                        <Typography>
                            {`${chartType} Chart`}
                        </Typography> : null
                    }
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" position="relative" width="100% !important">
                    {determineChart()}
                </Box>
            </Box>
        )
    }

    const tableContent = () => {
        let transactions = props.chart == "expenses" ? props.data : props.data.toReversed();
        let isExpenses = props.chart == "expenses" ? true : false;
        return (
            <Box width="100%" display="flex" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`2px solid ${colors.primary[500]}`}
                 colors={colors.gray[100]} p="15px" backgroundColor={colors.blueAccent[700]}>
                    <Typography colors={colors.gray[100]} variant="h5" fontStyle="bold" fontWeight="600">
                        {props.title}
                    </Typography>
                    {!props.fullView ? null :
                    <Link to="/transactions" onClick={() => {props.setActive('Transactions')}} style={{textDecoration: "underline"}}>
                        See full view
                    </Link>
                    }
                </Box>
                <Box style={{overflowY: "auto", overflowX: "hidden"}} className="table">
                    {transactions.map((transaction, i) => (
                        <Box key={`${i}`} display="flex" justifyContent="space-between" alignItems="center" 
                            borderBottom={`1px solid ${colors.primary[500]}`} p="10px" className="item">
                                {
                                    isExpenses ?
                                     <Box display="flex" width="100%">
                                        <Box width="70%">
                                            <Typography variant="h7">
                                                {transaction.expenses}
                                            </Typography>
                                        </Box>
                                        <Box width="30%" textAlign="center" display="flex" justifyContent="center">
                                            <Box backgroundColor={colors.redAccent[600]} width="90%" borderRadius="2px">
                                                <Typography variant="h7" fontStyle="bold" fontWeight="600">
                                                    {props.monetize(Number(transaction.spent))}
                                                </Typography>
                                            </Box>
                                        </Box>
                                     </Box> 
                                     :
                                     <Box display="flex" width="100%">
                                        <Box width="20%">
                                            <Typography variant="h7">
                                                {formatDate(transaction["Date"])}
                                            </Typography>
                                        </Box>
                                        <Box width="40%">
                                            <Typography variant="h9" fontStyle="bold">
                                                {transaction["Description"]}
                                            </Typography>
                                        </Box>
                                        <Box width="40%" textAlign="center" display="flex" justifyContent="right">
                                            {
                                                transaction['Debits'] === "" ?
                                                (
                                                    <Box backgroundColor={colors.greenAccent[600]} width="40%" borderRadius="2px">
                                                        <Typography variant="h7" fontStyle="bold" fontWeight="600">
                                                            {props.monetize(Number(transaction['Income']))}
                                                        </Typography>
                                                    </Box>
                                                ) :
                                                (
                                                    <Box backgroundColor={colors.redAccent[600]} width="40%" borderRadius="2px">
                                                        <Typography variant="h7" fontStyle="bold" fontWeight="600">
                                                            {props.monetize(Number(transaction['Debits']))}
                                                        </Typography>
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                }
                        </Box>
                    ))}
                </Box>
            </Box>
        )
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);

        return `${month}/${day}/${year}`;
    }

    // const backgroundColor = props.chart === "info" ? colors.greenAccent[700] : colors.primary[400]
    const backgroundColor = colors.primary[400]

    return (
        <Box gridColumn={`span ${props.width}`} backgroundColor={backgroundColor} gridRow={`span ${props.height}`}
             display="flex" alignItems="center" justifyContent="center" className="card">
            {
                props.chart === "pie" ? chartContent() :
                props.chart === "earned" ? chartContent() :
                props.chart === "line" ? chartContent() :
                props.chart === "info" ? infoContent() :
                props.chart == "table" ? tableContent() : 
                props.chart == "expenses" ? tableContent() : null
            }
        </Box>
    )
}

export default InfoCard;