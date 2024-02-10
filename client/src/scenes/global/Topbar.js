import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const verticalCenter = {
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-90%, -50%)",
        width: "50px", height: "50px"
    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box>
                <h2>DASHBOARD</h2>
            </Box>
            <Box display="flex" position="relative">
                <IconButton onClick={colorMode.toggleColorMode} style={verticalCenter}>
                    { theme.palette.mode === 'dark' ? 
                      <DarkModeOutlinedIcon /> :
                      <LightModeOutlinedIcon /> }
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;