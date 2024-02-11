import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import PieChart from "../../components/PieChart";

const InfoCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const determineChart = () => {
        if (props.chart == "pie") {
            return <PieChart data={props.data}/>
        } 
        else if (props.chart == "earned") {
            console.log(props.data)
            let earnedPercentage = Math.round((props.data[0] / props.data[2]) * 100)
            let spentPercentage = Math.round((props.data[1] / props.data[2]) * 100)
            console.log(`Earned Percentage: ${earnedPercentage}`)
            console.log(`Spent Percentage: ${spentPercentage}`)
            return (
                <Box width="100%" m="0 30px">
                    <Box height="10px" m="10px 0px" width={`${earnedPercentage}%`} backgroundColor={colors.greenAccent[600]} borderRadius="5px">

                    </Box>
                    <Box height="10px" m="10px 0px" width={`${spentPercentage}%`} backgroundColor={colors.redAccent[600]} borderRadius="5px">
                    </Box>
                </Box>
            )
        }
    }

    const infoContent = () => {
        return (
            <Box width="100%" m="0 30px">
                <Box display="flex" justifyContent="space-between" margin="5% 0%">
                    <Box>
                        <Typography variant="h2" fontWeight="bold" sx={{color: colors.gray[100]}}>
                            {props.title}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold" sx={{color: colors.greenAccent[500]}}>
                        {props.subtitle}
                    </Typography>
                </Box>
            </Box>
        )
    }

    const chartContent = () => {
        return (
            <Box width="100%" m="0 30px">
                <Typography variant="h5" fontWeight="bold">
                    {props.title}
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" mt="25px" width="100% !important">
                    {determineChart()}
                </Box>
            </Box>
        )
    }

    return (
        <Box gridColumn={`span ${props.width}`} backgroundColor={colors.primary[400]} gridRow={`span ${props.height}`}
             display="flex" alignItems="center" justifyContent="center" className="card">
            { props.isChart ? chartContent() : infoContent() }
        </Box>
    )
}

export default InfoCard;