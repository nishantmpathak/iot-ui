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
    Divider
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import RouterIcon from "@mui/icons-material/Router"; // For Gateway
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // For Add Device
import { useNavigate } from "react-router-dom";
import { ADD_DEVICE, ADD_GATEWEAY, ELECTRICITY_ROUTE, HOME_ROUTE } from "../../consts/RoutingConstants";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

interface Props {
    children: React.ReactNode;
}

const drawerWidth = 220;

const DashboardLayout: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    // Separate states for the two different menus
    const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const notifications = [
        { id: 1, text: "High Voltage Alert: Device 01", type: "error" },
        { id: 2, text: "New Device Connected", type: "info" },
        { id: 3, text: "Battery low on Sensor B", type: "warning" },
    ];

    // Handlers for Notification Menu
    const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => setNotifAnchorEl(event.currentTarget);
    const handleNotifClose = () => setNotifAnchorEl(null);

    // Handlers for App Menu (Hamburger)
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget);
    const handleMenuClose = () => setMenuAnchorEl(null);

    const handleNavigation = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    {/* TRIGGER FOR ADD OPTIONS */}
                    <IconButton 
                        color="inherit" 
                        edge="start" 
                        sx={{ mr: 2 }} 
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        iot-ui
                    </Typography>

                    {/* NOTIFICATIONS */}
                    <IconButton color="inherit" onClick={handleNotifOpen} sx={{ mr: 1 }}>
                        <Badge badgeContent={notifications.length} color="error" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* --- OPTIONS MENU (ADD GATEWAY / DEVICE) --- */}
                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{ sx: { width: 200, mt: 1 } }}
                    >
                        <MenuItem onClick={() => handleNavigation(ADD_GATEWEAY)}>
                            <ListItemIcon><RouterIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Add Gateway" />
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation(ADD_DEVICE)}>
                            <ListItemIcon><AddCircleOutlineIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Add Device" />
                        </MenuItem>
                    </Menu>

                    {/* --- NOTIFICATION MENU --- */}
                    <Menu
                        anchorEl={notifAnchorEl}
                        open={Boolean(notifAnchorEl)}
                        onClose={handleNotifClose}
                        PaperProps={{ sx: { width: 280, mt: 1.5, borderRadius: 2 } }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
                        </Box>
                        <Divider />
                        {notifications.map((n) => (
                            <MenuItem key={n.id} onClick={handleNotifClose}>
                                <ListItemIcon>
                                    {n.type === "error" && <ErrorOutlineIcon color="error" fontSize="small" />}
                                    {n.type === "info" && <InfoIcon color="info" fontSize="small" />}
                                    {n.type === "warning" && <WarningIcon color="warning" fontSize="small" />}
                                </ListItemIcon>
                                <ListItemText primary={n.text} primaryTypographyProps={{ variant: 'body2' }} />
                            </MenuItem>
                        ))}
                    </Menu>

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
                    "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(HOME_ROUTE)}>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate(ELECTRICITY_ROUTE)}>
                                <ListItemIcon><ElectricBoltIcon /></ListItemIcon>
                                <ListItemText primary="Electricity" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* MAIN CONTENT */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;