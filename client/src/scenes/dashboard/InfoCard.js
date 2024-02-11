import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import PieChart from "../../components/PieChart";

const InfoCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const determineChart = () => {
        const containerStyle = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 10%)", width: "100%"}
        if (props.chart == "pie") {
            return (
                <Box style={containerStyle}>
                    <PieChart data={props.data}/>
                </Box>
            )
        } 
        else if (props.chart == "earned") {
            let earnedPercentage = Math.round((props.data[0] / props.data[2]) * 100)
            let spentPercentage = Math.round((props.data[1] / props.data[2]) * 100)

            const style = {height: "20px", margin: "10px 30px", borderRadius: "2px", display: "flex", justifyContent: "center", alignItems: "center"}
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
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" position="relative" width="100% !important">
                    {determineChart()}
                </Box>
            </Box>
        )
    }

    const tableContent = () => {
        let transactions = props.data;
        console.log(transactions.toReversed())
        return (
            <Box width="100%" display="flex" flexDirection="column" height="100%">
                <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`2px solid ${colors.primary[500]}`}
                 colors={colors.gray[100]} p="15px" backgroundColor={colors.blueAccent[700]}>
                    <Typography colors={colors.gray[100]} variant="h5" fontStyle="bold" fontWeight="600">
                        Recent Transactions
                    </Typography>
                </Box>
                <Box overflow="auto">
                    {transactions.toReversed().map((transaction, i) => (
                        <Box key={`${i}`} display="flex" justifyContent="space-between" alignItems="center" 
                            borderBottom={`2px solid ${colors.primary[500]}`} p="10px">
                                <Box display="flex" width="100%">
                                    <Box width="20%">
                                        <Typography variant="h9" fontStyle="bold">
                                            {formatDate(transaction["Date"])}
                                        </Typography>
                                    </Box>
                                    <Box width="40%">
                                        <Typography variant="h9" fontStyle="bold">
                                            {transaction["Description"]}
                                        </Typography>
                                    </Box>
                                    <Box width="40%" textAlign="center" display="flex" justifyContent="center">
                                        {
                                            transaction['Debits'] === "" ?
                                            (
                                                <Box backgroundColor={colors.greenAccent[600]} width="30%" borderRadius="2px">
                                                    <Typography variant="h7" fontStyle="bold" fontWeight="600">
                                                        {props.monetize(Number(transaction['Income']))}
                                                    </Typography>
                                                </Box>
                                            ) :
                                            (
                                                <Box backgroundColor={colors.redAccent[600]} width="30%" borderRadius="2px">
                                                    <Typography variant="h7" fontStyle="bold" fontWeight="600">
                                                        {props.monetize(Number(transaction['Debits']))}
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                    </Box>
                                </Box>
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

    const backgroundColor = props.chart === "info" ? colors.greenAccent[700] : colors.primary[400]

    return (
        <Box gridColumn={`span ${props.width}`} backgroundColor={backgroundColor} gridRow={`span ${props.height}`}
             display="flex" alignItems="center" justifyContent="center" className="card">
            {
                props.chart === "pie" ? chartContent() :
                props.chart === "info" ? infoContent() :
                props.chart === "earned" ? chartContent() :
                props.chart == "table" ? tableContent() : null
            }
        </Box>
    )
}

export default InfoCard;