import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";

const InfoCard = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (
        <Box gridColumn={`span ${props.width}`} backgroundColor={colors.primary[400]}
             display="flex" alignItems="center" justifyContent="center" boxShadow="5px 5px 5vh 5px rgba(25, 25, 25, 0.7)">
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
        </Box>
    )
}

export default InfoCard;