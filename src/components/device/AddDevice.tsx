import React, { useState, useEffect } from "react";
import {
    Typography, Box, Paper, TextField, Button, MenuItem, 
    FormControl, InputLabel, Select, Divider, Alert, 
    Snackbar, CircularProgress, GridLegacy as Grid
} from "@mui/material"; // Changed Grid to GridLegacy to resolve TS2769
import DashboardLayout from "../layout/DashboardLayout";
import { deviceService } from "../../services/deviceService";
import { gatewayService, GatewayResponse } from "../../services/gatewayService";

const AddDevice: React.FC = () => {
    const [formData, setFormData] = useState({
        label: "",
        location: "",
        gateway_id: "" as string | number,
        hardware_model: "",
        device_type: "Electricity Meter",
        is_active: true
    });

    const [gateways, setGateways] = useState<GatewayResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingGateways, setFetchingGateways] = useState(true);
    const [notification, setNotification] = useState({ 
        open: false, 
        message: "", 
        severity: "success" as "success" | "error" 
    });

    useEffect(() => {
        const fetchGateways = async () => {
            try {
                const data = await gatewayService.getAllGateways();
                setGateways(data);
            } catch (error: any) {
                setNotification({ open: true, message: error.message, severity: "error" });
            } finally {
                setFetchingGateways(false);
            }
        };
        fetchGateways();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deviceService.registerDevice({
                ...formData,
                gateway_id: Number(formData.gateway_id)
            });
            setNotification({ open: true, message: "Device created!", severity: "success" });
            setFormData({ label: "", location: "", gateway_id: "", hardware_model: "", device_type: "Electricity Meter", is_active: true });
        } catch (error: any) {
            setNotification({ open: true, message: error.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: "auto" }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Add New Device</Typography>
                
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth label="Device Label" name="label"
                                    value={formData.label} onChange={handleChange} required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Device Type</InputLabel>
                                    <Select name="device_type" label="Device Type" value={formData.device_type} onChange={handleChange}>
                                        <MenuItem value="Electricity Meter">Electricity Meter</MenuItem>
                                        <MenuItem value="Water Flow Meter">Water Flow Meter</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth required disabled={fetchingGateways}>
                                    <InputLabel>Assign Gateway</InputLabel>
                                    <Select 
                                        name="gateway_id" 
                                        value={formData.gateway_id} 
                                        label="Assign Gateway" 
                                        onChange={handleChange}
                                    >
                                        {fetchingGateways ? (
                                            <MenuItem disabled><CircularProgress size={20} sx={{ mr: 1 }} /> Loading...</MenuItem>
                                        ) : (
                                            gateways.map(gw => (
                                                <MenuItem key={gw.id} value={gw.id}>{gw.imei} ({gw.location})</MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider>
                                    <Typography color="textSecondary" variant="body2">Hardware Details</Typography>
                                </Divider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Hardware Model" name="hardware_model" value={formData.hardware_model} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                    <Button 
                                        variant="contained" 
                                        type="submit" 
                                        size="large"
                                        disabled={loading || fetchingGateways}
                                        sx={{ minWidth: 150 }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : "Create Device"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                <Snackbar 
                    open={notification.open} 
                    autoHideDuration={4000} 
                    onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                >
                    <Alert severity={notification.severity} variant="filled">{notification.message}</Alert>
                </Snackbar>
            </Box>
        </DashboardLayout>
    );
};

export default AddDevice;