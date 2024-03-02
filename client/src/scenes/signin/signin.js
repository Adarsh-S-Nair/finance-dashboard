import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";

const SignIn = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        Username: "",
        Password: ""
    })
    const [error, setError] = useState(null)

    const centerStyle = {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', justifyContent: 'center',
        width: '380px', backgroundColor: colors.primary[400], borderRadius: '5px'
    }

    const formStyle = {
        padding: '30px 20px 25px 20px'
    }

    const rowStyle = {
        position: 'relative', height: '45px', marginBottom: '15px'
    }

    const inputStyle = {
        height: "100%", width: "100%", paddingLeft: '60px', outline: 'none',
        borderRadius: '5px', border: '1px solid lightgrey'
    }

    const iconStyle = {
        position: "absolute", width: "47px", height: "100%", backgroundColor: colors.blueAccent[700],
        display: "flex", alignItems: "center", justifyContent: "center", borderRadius: '5px 0 0 5px'
    }

    const buttonColor = loading ? colors.blueAccent[800] : colors.blueAccent[700];
    const buttonStyle = {
        ...inputStyle, paddingLeft: '0px', fontWeight: '500', backgroundColor: buttonColor,
        border: `1px solid ${buttonColor}`, cursor: `${loading ? 'default' : 'pointer'}`, color: 'white', fontWeight: '700'
    }

    const errorStyle = {
        color: colors.redAccent[400], margin: '8px 0 15px 0'
    }

    const fetchUsers = () => {
        return fetch(process.env.REACT_APP_USERS)
                    .then(res => res.json())
                    .then(data => JSON.parse(data.data));
    }

    const handleLogin = (event) => {
        event.preventDefault()
        setLoading(true)
        fetchUsers()
        .then(users => {
            if (Object.values(values).some(value => value === "")) {
                setError("Please enter all fields")
                return;
            }
            const user = users.find(user => user.Username === values.Username)
            if (!user) {
                setError("User does not exist")
                return
            }
            if (values.Password != user.Password) {
                setError("Incorrect password")
                return
            }
            setError(null)
            localStorage.setItem('authUser', JSON.stringify(user));
            props.setUser(user)
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.placeholder]: e.target.value })
    }

    return (
        <Box className="signin-wrapper" style={centerStyle} onSubmit={loading ? null : handleLogin}>
            <Box className="title">
                <Typography lineHeight="80px" bgcolor={colors.blueAccent[700]} pl="20px" borderRadius="5px 5px 0 0"
                            fontSize="25px" fontWeight="600">
                    Welcome
                </Typography>
            </Box>
            <form action="#" style={formStyle} >
                <Box className="row" style={rowStyle}>
                <div style={iconStyle}><PersonIcon /></div>
                    <input type="text" placeholder="Username" style={inputStyle} onChange={onChange}></input>
                </Box>
                <Box className="row" style={rowStyle}>
                    <div style={iconStyle}><LockIcon /></div>
                    <input type="password" placeholder="Password" style={inputStyle} onChange={onChange}></input>
                </Box>
                {error ? 
                    <Box style={errorStyle}>{error}</Box> : null
                }
                <Box className="row" style={rowStyle}>
                    <input type="submit" value={`${loading ? 'Signing in...' : 'Sign In'}`} style={buttonStyle}></input>
                </Box>
            </form>
        </Box>
    )
}

export default SignIn;