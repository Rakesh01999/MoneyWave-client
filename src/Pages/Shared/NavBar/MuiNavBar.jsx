import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
    AppBar,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Hidden,
} from "@mui/material";

// import logo from "../../../../public/mm.png";
import logo from "../../../../src/assets/mm.png";
import { useContext } from "react";
import useAdmin from "../../../hooks/useAdmin";
import { AuthContext } from "../../providers/AuthProvider";

const MuiNavBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = true; // Replace with your actual login state
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const menuItems = [
        { text: "Home", link: "/" },
        { text: "Biodatas", link: "/biodatas" },
        { text: "About Us", link: "/aboutUs" },
        { text: "Contact Us", link: "/contactUs" },
        // { text: "Login", link: "/login" },
    ];

    const handleAdminDashboardClick = () => {
        navigate("/dashboard/adminHome");
    };

    const handleUserDashboardClick = () => {
        navigate("/dashboard/userHome");
    };

    const handleLogInClick = () => {
        navigate("/login");
    };

    const handleLogOutClick = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    };

    return (
        <div className="max-w-screen-xl">
            {/* <AppBar position="static"> */}
            <AppBar position="fixed">
                <Toolbar>
                    <Hidden smUp>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                        <Typography variant="h6" component="div" sx={{ color: "white" }}>
                            Money Wave
                        </Typography>
                    </Link>
                    <div style={{ flexGrow: 1 }} />
                    <Hidden smDown>
                        <Stack direction="row" spacing={2}>
                            {menuItems.map((item) => (
                                <Link to={item.link} key={item.text} style={{ textDecoration: "none", color: "inherit" }}>
                                    {item.text}
                                </Link>
                            ))}
                            {/* {isLoggedIn && (
                                <Typography
                                    variant="body1"
                                    component="div"
                                    onClick={handleDashboardClick}
                                    style={{ cursor: "pointer", color: "inherit" }}
                                >
                                    Dashboard
                                </Typography>
                            )} */}
                            {
                                user && isAdmin &&
                                // <li>
                                //     <Link to="/dashboard/adminHome">Dashboard</Link>
                                // </li>

                                <Typography
                                    variant="body1"
                                    component="div"
                                    onClick={handleAdminDashboardClick}
                                    // style={{ cursor: "pointer", color: "inherit" }}
                                    style={{ cursor: "pointer", color: "inherit" }}
                                >
                                    Dashboard
                                </Typography>
                            }

                            {
                                user && !isAdmin &&
                                // <li>
                                //     <Link to="/dashboard/adminHome">Dashboard</Link>
                                // </li>

                                <Typography
                                    variant="body1"
                                    component="div"
                                    onClick={handleUserDashboardClick}
                                    style={{ cursor: "pointer", color: "inherit" }}
                                >
                                    Dashboard
                                </Typography>
                            }

                            {
                                user ?
                                    // <li>
                                    //     <Link to="/dashboard/adminHome">Dashboard</Link>
                                    // </li>

                                    <Typography
                                        variant="body1"
                                        component="div"
                                        onClick={handleLogOutClick}
                                        style={{ cursor: "pointer", color: "inherit" }}
                                    >
                                        Log Out
                                    </Typography> :
                                    <>
                                        <Typography
                                            variant="body1"
                                            component="div"
                                            onClick={handleLogInClick}
                                            style={{ cursor: "pointer", color: "inherit" }}
                                        >
                                            Login
                                        </Typography>
                                    </>
                            }
                        </Stack>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.link} onClick={toggleDrawer(false)}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                    {/* {isLoggedIn && (
                        <ListItem button onClick={handleDashboardClick}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    )} */}
                    {/* {
                        user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
                    } */}
                    {
                        user && isAdmin &&
                        // <li>
                        //     <Link to="/dashboard/adminHome">Dashboard</Link>
                        // </li>

                        <Typography
                            className="text-center mt-3"
                            variant="body1"
                            component="div"
                            onClick={handleAdminDashboardClick}
                            style={{ cursor: "pointer", color: "inherit" }}
                        >
                            Dashboard
                        </Typography>
                    }

                    {
                        user && !isAdmin &&
                        // <li>
                        //     <Link to="/dashboard/adminHome">Dashboard</Link>
                        // </li>

                        <Typography
                            className="text-center mt-3"
                            variant="body1"
                            component="div"
                            onClick={handleUserDashboardClick}
                            style={{ cursor: "pointer", color: "inherit" }}
                        >
                            Dashboard
                        </Typography>
                    }

                    {
                        user ?
                            // <li>
                            //     <Link to="/dashboard/adminHome">Dashboard</Link>
                            // </li>

                            <Typography
                                // className="text-center mt-3"
                                className="text-center mt-3"
                                variant="body1"
                                component="div"
                                onClick={handleLogOutClick}
                                style={{ cursor: "pointer", color: "inherit" }}
                            >
                                Log Out
                            </Typography> :
                            <>
                                <Typography
                                    className="text-center mt-3"
                                    variant="body1"
                                    component="div"
                                    onClick={handleLogInClick}
                                    style={{ cursor: "pointer", color: "inherit" }}
                                >
                                    Login
                                </Typography>
                            </>
                    }
                </List>
            </Drawer>
        </div>
    );
};

export default MuiNavBar;