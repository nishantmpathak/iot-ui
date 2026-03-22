import React, { useState, useMemo, useEffect, useCallback } from "react";
import { 
    Typography, Box, MenuItem, Select, FormControl, InputLabel, Paper, 
    Grid, // MUI v6 standard Grid
    Button, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, CircularProgress, Radio, RadioGroup, 
    FormControlLabel, FormLabel, Stack 
} from "@mui/material";
import { useParams } from "react-router-dom";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import DashboardLayout from "../layout/DashboardLayout";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { deviceService, DeviceReadingResponse, FullReading } from "../../services/deviceService";

// Helper for TypeScript indexing
interface DynamicTableRow {
    id: number;
    timestamp: string;
    [key: string]: any; 
}

const SHIFTS = [
    { name: "Morning", start_time: "06:00:00", end_time: "14:00:00" },
    { name: "Afternoon", start_time: "14:00:00", end_time: "22:00:00" },
    { name: "Night", start_time: "22:00:00", end_time: "06:00:00" },
];

export const ElectricityMeter: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const [filterType, setFilterType] = useState<"range" | "shift">("range");
    const [selectedShift, setSelectedShift] = useState(SHIFTS[0]);
    const [selectedMetric, setSelectedMetric] = useState("TotalWatts");
    
    // Default to 1st of current month and today
    const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs().startOf('month'));
    const [toDate, setToDate] = useState<Dayjs | null>(dayjs());
    
    const [deviceData, setDeviceData] = useState<DeviceReadingResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const payload = {
                device_ids: [parseInt(id)],
                filter_type: filterType,
                start_date: fromDate?.format('YYYY-MM-DD') || '',
                end_date: toDate?.format('YYYY-MM-DD') || '',
                shift_details: filterType === "shift" ? selectedShift : null 
            };

            const response = await deviceService.getDeviceReadings(payload);
            setDeviceData(response[0] || null);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    }, [id, fromDate, toDate, filterType, selectedShift]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const availableMetrics = useMemo(() => {
        if (!deviceData?.formatted_readings) return [];
        const metricsSet = new Set<string>();
        deviceData.formatted_readings.forEach(entry => {
            entry.readings.forEach(r => metricsSet.add(r.metric));
        });
        return Array.from(metricsSet).sort();
    }, [deviceData]);

    const tableData = useMemo((): DynamicTableRow[] => {
        if (!deviceData?.formatted_readings) return [];
        return deviceData.formatted_readings.map((entry: FullReading) => {
            const readingsMap = entry.readings.reduce((acc, r) => {
                acc[r.metric] = r.metric_value;
                return acc;
            }, {} as Record<string, any>);

            return {
                id: entry.id,
                timestamp: dayjs(entry.timestamp).format("YYYY-MM-DD HH:mm:ss"),
                ...readingsMap 
            };
        });
    }, [deviceData]);

    const chartData = useMemo(() => {
        if (!deviceData?.formatted_readings) return [];
        return deviceData.formatted_readings.map((entry) => {
            const reading = entry.readings.find((r) => r.metric === selectedMetric);
            return {
                time: dayjs(entry.timestamp).format("HH:mm:ss"),
                value: reading ? reading.metric_value : 0,
            };
        });
    }, [deviceData, selectedMetric]);

    return (
        <DashboardLayout>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        {deviceData?.label || "Electricity Meter Dashboard"}
                    </Typography>
                    
                    <Paper elevation={0} sx={{ p: 3, mb: 3, border: "1px solid", borderColor: "divider" }}>
                        <Grid container spacing={3} alignItems="flex-end">
                            
                            {/* MUI v6: Use 'size' prop, no 'item' prop */}
                            <Grid size={{ xs: 12, md: 3 }}>
                                <FormControl component="fieldset">
                                    <FormLabel sx={{ fontSize: '0.75rem' }}>Filter Mode</FormLabel>
                                    <RadioGroup row value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
                                        <FormControlLabel value="range" control={<Radio size="small" />} label="Range" />
                                        <FormControlLabel value="shift" control={<Radio size="small" />} label="Shift" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 2 }}>
                                <DatePicker label="From" value={fromDate} onChange={setFromDate} slotProps={{ textField: { size: 'small', fullWidth: true }}} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 2 }}>
                                <DatePicker label="To" value={toDate} onChange={setToDate} slotProps={{ textField: { size: 'small', fullWidth: true }}} />
                            </Grid>

                            {filterType === "shift" && (
                                <Grid size={{ xs: 12, md: 2 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Shift</InputLabel>
                                        <Select value={selectedShift.name} label="Shift" onChange={(e) => {
                                            const shift = SHIFTS.find(s => s.name === e.target.value);
                                            if (shift) setSelectedShift(shift);
                                        }}>
                                            {SHIFTS.map(s => <MenuItem key={s.name} value={s.name}>{s.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}

                            <Grid size={{ xs: 12, md: filterType === 'shift' ? 3 : 5 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Metric</InputLabel>
                                    <Select value={selectedMetric} label="Metric" onChange={(e) => setSelectedMetric(e.target.value as string)}>
                                        {availableMetrics.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                     <Button variant="contained" startIcon={<FileDownloadIcon />} onClick={() => {}} disabled={loading}>
                                        Export to Excel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>
                    ) : (
                        <>
                            <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom>{selectedMetric} Trend</Typography>
                                <Box sx={{ width: "100%", height: 350 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="value" stroke="#2196f3" fillOpacity={0.2} fill="#2196f3" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Paper>

                            <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 600 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>Timestamp</TableCell>
                                            {availableMetrics.map(m => (
                                                <TableCell key={m} sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>{m}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((row, idx) => (
                                            <TableRow key={idx} hover>
                                                <TableCell>{row.timestamp}</TableCell>
                                                {availableMetrics.map(m => (
                                                    <TableCell key={m}>{row[m] ?? "—"}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            </LocalizationProvider>
        </DashboardLayout>
    );
};