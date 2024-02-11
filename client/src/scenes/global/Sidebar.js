import { createContext, useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {expanded} = useContext(SidebarContext);

    const itemStyle = { 
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: colors.gray[100],
        padding: "0.5rem 1rem",
        margin: "0.25rem 0",
        borderRadius: "0.375rem",
        cursor: "pointer"
    }

    const textStyle = {
        overflow: "hidden",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms"
    }

    if (selected === title) {
        itemStyle.backgroundColor = `${theme.palette.background.default}`
    }

    if (expanded) {
        textStyle.width = "13rem";
        textStyle.marginLeft = "0.75rem";
        textStyle.paddingTop = "0.2rem"
    } else {
        textStyle.width = "0px";
    }

    return (
        <li active={`${selected === title}`} style={itemStyle} onClick={() => setSelected(title)}>
            { icon }
            <span style={textStyle}>{title}</span>
            <Link to={to}/>
        </li>
    )
}

const SidebarContext = createContext();

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [expanded, setExpanded] = useState(window.innerWidth > 720);
    const [selected, setSelected] = useState("Dashboard");

    const handleResize = () => {
        window.innerWidth < 720 ? setExpanded(false) : setExpanded(true)
    }
    
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    const sideStyle = {
        height: "100vh",
        backgroundColor: `${colors.primary[400]}`
    }

    const navStyle = {
        height: "100%",
        display: "flex", 
        flexDirection: "column"
    };

    const headerStyle = {  
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "center",
        padding: "1rem"
    }

    const listStyle = {
        flex: "1 1 0%",
        padding: "0 0.5rem"
    }

    return (
        <aside style={sideStyle}>
            <nav style={navStyle}>
                <div style={headerStyle}>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul style={listStyle}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    )
}

export default Sidebar;