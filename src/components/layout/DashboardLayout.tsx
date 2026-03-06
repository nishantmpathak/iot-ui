import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Avatar,
    Badge,
    MenuItem,
    Menu,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useNavigate } from "react-router-dom";
import { ELECTRICITY_ROUTE, HOME_ROUTE } from "../../consts/RoutingConstants";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

interface Props {
    children: React.ReactNode;
}

const drawerWidth = 220;


const DashboardLayout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // Sample Notifications Data
    const notifications = [
        { id: 1, text: "High Voltage Alert: Device 01", type: "error" },
        { id: 2, text: "New Device Connected", type: "info" },
        { id: 3, text: "Battery low on Sensor B", type: "warning" },
    ];

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: "flex" }}>

            {/* TOP BAR */}
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        iot-ui
                    </Typography>

                    {/* Notification Bell with Badge (The Dot) */}
                    <IconButton color="inherit" onClick={handleOpen} sx={{ mr: 1 }}>
                        <Badge badgeContent={notifications.length} color="error" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* --- ADD THE MENU COMPONENT HERE --- */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose} // Close when clicking anywhere in the menu
                        PaperProps={{
                            sx: { width: 280, mt: 1.5, borderRadius: 2 }
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                Notifications
                            </Typography>
                        </Box>
                        {notifications.map((n) => (
                            <MenuItem key={n.id} onClick={handleClose}>
                                <ListItemIcon>
                                    {n.type === "error" && <ErrorOutlineIcon color="error" fontSize="small" />}
                                    {n.type === "info" && <InfoIcon color="info" fontSize="small" />}
                                    {n.type === "warning" && <WarningIcon color="warning" fontSize="small" />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={n.text}
                                    primaryTypographyProps={{ variant: 'body2' }}
                                />
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Profile Icon Right Corner */}
                    <IconButton color="inherit">
                        <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* SIDE NAV */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(HOME_ROUTE)}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(ELECTRICITY_ROUTE)}>
                                <ListItemIcon>
                                    <ElectricBoltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Electricity" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* MAIN CONTENT */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;