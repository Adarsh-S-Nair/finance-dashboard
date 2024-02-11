import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import PieChart from "../../components/PieChart";

const InfoCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const infoContent = () => {
        return (
            <Box width="100%" m="0 30px">
                <Box display="flex" justifyContent="space-between" margin="5% 0%">
                    <Box>
                        <Typography variant="h4" fontWeight="bold" sx={{color: colors.gray[100]}}>
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
        console.log(props.data)
        return (
            <Box width="100%" m="0 30px">
                <Typography variant="h5" fontWeight="bold">
                    Spending
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" mt="25px" width="100% !important">
                    <PieChart data={props.data}/>
                </Box>
            </Box>
        )
    }

    return (
        <Box gridColumn={`span ${props.width}`} backgroundColor={colors.primary[400]} gridRow={`span ${props.height}`}
             display="flex" alignItems="center" justifyContent="center" boxShadow="5px 5px 5vh 5px rgba(25, 25, 25, 0.7)">
            { props.isChart ? chartContent() : infoContent() }
        </Box>
    )
}

export default InfoCard;