import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useLocation } from 'react-router-dom';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const location = useLocation();

    const getTitle = () => {
        let title = location.pathname.slice(1)
        if (title == "") title = "dashboard"
        return title.toUpperCase();
    }

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box>
                <Typography variant="h2" fontStyle="bold" fontWeight="600">{getTitle()}</Typography>
            </Box>
            {/* <Box display="flex" position="relative">
                <IconButton onClick={colorMode.toggleColorMode} style={verticalCenter}>
                    { theme.palette.mode === 'dark' ? 
                      <DarkModeOutlinedIcon /> :
                      <LightModeOutlinedIcon /> }
                </IconButton>
            </Box> */}
        </Box>
    )
}

export default Topbar;