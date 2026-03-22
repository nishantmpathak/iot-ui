import React, { useState } from "react";
import {
    Typography, Box, Paper, TextField, Button, Grid, 
    Divider, Alert, Snackbar, Stack, CircularProgress
} from "@mui/material";
import RouterIcon from "@mui/icons-material/Router";
import DashboardLayout from "../layout/DashboardLayout";
import { gatewayService } from "../../services/gatewayService";

const AddGateway: React.FC = () => {
    const [formData, setFormData] = useState({
        imei: "",
        location: ""
    });

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await gatewayService.registerGateway({
                imei: formData.imei,
                location: formData.location
            });
            
            setNotification({
                open: true,
                message: "Gateway registered successfully!",
                severity: "success"
            });
            setFormData({ imei: "", location: "" }); // Reset form
        } catch (error: any) {
            setNotification({
                open: true,
                message: error.message, // Will show "Gateway already exists"
                severity: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 600, mx: "auto" }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Register Gateway
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                    Enter the hardware details to connect a new hub to the network.
                </Typography>

                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                    <form onSubmit={handleSubmit}>
                        {/* Using size prop for MUI v6/v2 compatibility as established previously */}
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="IMEI Number"
                                    name="imei"
                                    placeholder="Enter 15-21 digit IMEI"
                                    value={formData.imei}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Installation Location"
                                    name="location"
                                    placeholder="e.g. Pune, Section B"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button variant="outlined" color="inherit" disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <RouterIcon />}
                                        sx={{ px: 4 }}
                                    >
                                        {loading ? "Registering..." : "Register Gateway"}
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                <Snackbar 
                    open={notification.open} 
                    autoHideDuration={5000} 
                    onClose={() => setNotification({ ...notification, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Box>
        </DashboardLayout>
    );
};

export default AddGateway;