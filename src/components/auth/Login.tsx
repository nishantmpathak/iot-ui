import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../consts/RoutingConstants";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const handleLogin = () => {
        // Hardcoded demo credentials
        if (email === "admin@iot.com" && password === "1234") {
            localStorage.setItem("isLoggedIn", "true");
            navigate(HOME_ROUTE);
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    padding: 4,
                    width: "100%",
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                >
                    iot-ui
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mb: 3, color: "gray" }}
                >
                    Secure Device Management
                </Typography>

                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 1 }}
                    >
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, py: 1.2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;