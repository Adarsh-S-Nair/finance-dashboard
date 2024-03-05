import { createContext, useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setActive, setExpanded, setUser }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {expanded, isMobile} = useContext(SidebarContext);

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
        transitionDuration: "150ms",
        width: "0px"
    }

    if (!(isMobile && !expanded) && selected === title) {
        itemStyle.backgroundColor = `${theme.palette.background.default}`
    }

    if (expanded) {
        textStyle.width = "13rem";
        textStyle.marginLeft = "0.75rem";
    } else {
        textStyle.width = "0px";
    }

    const logout = title === "Logout"
    const logoutStyle = {
        ...itemStyle, position: 'absolute', bottom: isMobile ? '90px' : '20px'
    }
    return (
        <Link to={to} active={`${selected === title}`} style={logout ? logoutStyle : itemStyle} onClick={() => {
            if (logout) {
                localStorage.removeItem('authUser');
                setUser(null);
                return;
            }
            setExpanded(false)
            setActive(title)
        }}>
            { isMobile && !expanded ? null : icon }
            <span style={textStyle}>{title}</span>
        </Link>
    )
}

const SidebarContext = createContext();

const Sidebar = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const size = props.size;
    const isMobile = size === "mobile";
    const expanded = props.expanded;

    const sideStyle = {
        height: isMobile ? "70px" : "100vh",
        width: isMobile ? "100vw" : "auto",
        backgroundColor: `${colors.primary[400]}`,
        zIndex: '1',
        boxShadow: '0px 0px 5vh 1vh rgba(25, 25, 25, 0.7)'
    }

    const navStyle = {
        // height: "100%",
        display: "flex", 
        flexDirection: "column"
    };

    const headerStyle = {  
        display: "flex", 
        justifyContent: size == "mobile" ? "left" : "flex-end", 
        alignItems: "center",
        padding: "1rem"
    }

    const listStyle = {
        position: isMobile ? "absolute" : "static",
        top: "70px",
        flex: "1 1 0%",
        padding: `0 ${isMobile && !expanded ? '0' : '0.5'}rem`,
        backgroundColor: colors.primary[400],
        width: isMobile && !expanded ? "0px" : isMobile && expanded ? "65vw" : "auto",
        height: "100vh",
        // display: isMobile && !expanded ? "none" : "block"
    }

    return (
        <div style={sideStyle}>
            <nav style={navStyle}>
                <div style={headerStyle}>
                    <IconButton onClick={() => props.setExpanded(!expanded)}>
                        <MenuOutlinedIcon />
                    </IconButton>
                </div>

                {isMobile ?
                    <SidebarContext.Provider value={{expanded, isMobile}}>
                        <div style={listStyle} className={`sidebar mobile`}>
                            <Item
                                title="Dashboard"
                                to="/"
                                icon={<DashboardIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                            />
                            <Item
                                title="Transactions"
                                to="/transactions"
                                icon={<TableRowsIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                            />
                            <Item
                                title="Logout"
                                to="/"
                                icon={<LogoutIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                                setUser={props.setUser}
                            />
                        </div>
                        
                    </SidebarContext.Provider>
                    : 
                    <SidebarContext.Provider value={{expanded}}>
                        <ul style={listStyle} height="80%" className="sidebar">
                            <Item
                                title="Dashboard"
                                to="/"
                                icon={<DashboardIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                            />
                            <Item
                                title="Transactions"
                                to="/transactions"
                                icon={<TableRowsIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                            />
                        </ul>
                        <ul style={listStyle}>
                            <Item
                                title="Logout"
                                to="/"
                                icon={<LogoutIcon/>}
                                selected={props.selected}
                                setActive={props.setActive}
                                setExpanded={props.setExpanded}
                                setUser={props.setUser}
                            />
                        </ul>
                    </SidebarContext.Provider>
                }
            </nav>
        </div>
    )
}

export default Sidebar;