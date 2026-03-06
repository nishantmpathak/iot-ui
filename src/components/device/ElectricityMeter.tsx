import React, { useState, useMemo } from "react";
import { Typography, Box, MenuItem, Select, FormControl, InputLabel, Paper, Card, CardContent, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import DashboardLayout from "../layout/DashboardLayout";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as XLSX from 'xlsx/xlsx.mjs';
import { saveAs } from 'file-saver';
import { Button, Stack } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { meterData } from "../../consts/mocks";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const ElectricityMeter: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [selectedMetric, setSelectedMetric] = useState("Vr");

    //  Add Date State (Defaulting to a 10-hour range or specific dates)
    const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs().subtract(1, 'day'));
    const [toDate, setToDate] = useState<Dayjs | null>(dayjs());

    const tableData = useMemo(() => {
        return meterData.history.map((entry) => {
            const readingsMap = entry.readings.reduce((acc, reading) => {
                acc[reading.metric_name] = reading.metric_value;
                return acc;
            }, {} as Record<string, number>);

            return {
                hour: entry.hour,
                meterUnitReading: readingsMap["meterUnitReading"],
                Vr: readingsMap["Vr"],
                Vy: readingsMap["Vy"],
                Vb: readingsMap["Vb"],
                Ir: readingsMap["Ir"],
                Iy: readingsMap["Iy"],
                Ib: readingsMap["Ib"],
                PF: readingsMap["PF"],
            };
        });
    }, []);


    // Filter history to get only the selected metric for each hour
    const chartData = useMemo(() => {
        return meterData.history.map((entry) => {
            const reading = entry.readings.find((r) => r.metric_name === selectedMetric);
            return {
                hour: entry.hour,
                value: reading ? reading.metric_value : 0,
                unit: reading ? reading.unit : "",
            };
        });
    }, [selectedMetric]);

    const handleExport = () => {
        // 1. Prepare the data: Map keys to human-readable headers
        const exportData = tableData.map(row => ({
            "Hour": row.hour,
            "Meter Reading (kWh)": row.meterUnitReading,
            "Voltage R (V)": row.Vr,
            "Voltage Y (V)": row.Vy,
            "Voltage B (V)": row.Vb,
            "Current R (A)": row.Ir,
            "Current Y (A)": row.Iy,
            "Current B (A)": row.Ib,
            "Power Factor": row.PF,
        }));

        // 2. Create worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Meter History");

        // 3. Buffer and download
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        
        const fileName = `Meter_Data_${dayjs().format('YYYY-MM-DD_HHmm')}.xlsx`;
        saveAs(data, fileName);
    };

    return (
        <DashboardLayout>

            {/* 1. This Provider MUST wrap the DatePickers */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: 4 }}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 3, 
                            mb: 3, 
                            borderRadius: 2, 
                            backgroundColor: "background.paper", // Adapts to light theme
                            border: "1px solid",
                            borderColor: "divider" // Subtle light grey border
                        }}
                    >
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, md: 4 }}>
                                <DatePicker
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(newValue) => setFromDate(newValue)}
                                    slotProps={{ 
                                        textField: { 
                                            fullWidth: true, 
                                            size: "small",
                                            // Removed custom dark CSS overrides
                                        } 
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <DatePicker
                                    label="To Date"
                                    value={toDate}
                                    onChange={(newValue) => setToDate(newValue)}
                                    slotProps={{ 
                                        textField: { 
                                            fullWidth: true, 
                                            size: "small",
                                        } 
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Select Reading Type</InputLabel>
                                    <Select
                                        value={selectedMetric}
                                        label="Select Reading Type"
                                        onChange={(e) => setSelectedMetric(e.target.value)}
                                        // Removed manual color overrides
                                    >
                                        <MenuItem value="meterUnitReading">Total Consumption (kWh)</MenuItem>
                                        <MenuItem value="Vr">Voltage R (V)</MenuItem>
                                        <MenuItem value="Vy">Voltage Y (V)</MenuItem>
                                        <MenuItem value="Vb">Voltage B (V)</MenuItem>
                                        <MenuItem value="Ir">Current R (A)</MenuItem>
                                        <MenuItem value="Iy">Current Y (A)</MenuItem>
                                        <MenuItem value="Ib">Current B (A)</MenuItem>
                                        <MenuItem value="PF">Power Factor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 12 }} sx={{ textAlign: 'right', mt: 1 }}>
                                <Button 
                                    variant="contained" 
                                    startIcon={<FileDownloadIcon />}
                                    onClick={handleExport}
                                    sx={{ 
                                        boxShadow: 'none',
                                        '&:hover': { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }
                                    }}
                                >
                                    Export to Excel
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </LocalizationProvider>
            

            <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, mb: 5 }}>
                <Typography variant="h6" gutterBottom>
                    {selectedMetric} History - Last 10 Hours
                </Typography>

                <Box sx={{ width: "100%", height: 400, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            {/* 1. Define the Gradient Color */}
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis
                                dataKey="hour"
                                tick={{ fill: '#666', fontSize: 12 }}
                            />
                            <YAxis
                                domain={['auto', 'auto']}
                                tick={{ fill: '#666', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    border: 'none',
                                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value: number | string | undefined) => {
                                    if (value === undefined) return ["N/A", selectedMetric];
                                    return [`${value} ${chartData[0]?.unit || ""}`, selectedMetric];
                                }}
                            />

                            {/* 2. Use Area instead of Line */}
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#2196f3"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)" // Points to the gradient defined above
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <TableContainer
                component={Paper}
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                                "Hour",
                                "Meter (kWh)",
                                "Vr (V)",
                                "Vy (V)",
                                "Vb (V)",
                                "Ir (A)",
                                "Iy (A)",
                                "Ib (A)",
                                "PF",
                            ].map((header) => (
                                <TableCell key={header} sx={{ fontWeight: 700 }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(0,0,0,0.04)",
                                    },
                                }}
                            >
                                <TableCell>{row.hour}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                    {row.meterUnitReading}
                                </TableCell>
                                <TableCell>{row.Vr}</TableCell>
                                <TableCell>{row.Vy}</TableCell>
                                <TableCell>{row.Vb}</TableCell>
                                <TableCell>{row.Ir}</TableCell>
                                <TableCell>{row.Iy}</TableCell>
                                <TableCell>{row.Ib}</TableCell>
                                <TableCell
                                    sx={{
                                        color:
                                            row.PF > 0.9
                                                ? "green"
                                                : row.PF > 0.8
                                                    ? "orange"
                                                    : "red",
                                        fontWeight: 600,
                                    }}
                                >
                                    {row.PF}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Box sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {meterData.device.label} (ID: {id})
                        </Typography>
                        <Typography color="textSecondary">
                            Location: {meterData.device.location}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: 'right' }}>
                        <FormControl sx={{ minWidth: 220 }}>
                            <InputLabel id="metric-select-label">Select Reading Type</InputLabel>
                            <Select
                                labelId="metric-select-label"
                                value={selectedMetric}
                                label="Select Reading Type"
                                onChange={(e) => setSelectedMetric(e.target.value)}
                            >
                                <MenuItem value="meterUnitReading">Total Consumption (kWh)</MenuItem>
                                <MenuItem value="Vr">Voltage R (V)</MenuItem>
                                <MenuItem value="Vy">Voltage Y (V)</MenuItem>
                                <MenuItem value="Vb">Voltage B (V)</MenuItem>
                                <MenuItem value="Ir">Current R (A)</MenuItem>
                                <MenuItem value="Iy">Current Y (A)</MenuItem>
                                <MenuItem value="Ib">Current B (A)</MenuItem>
                                <MenuItem value="PF">Power Factor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box> */}
        </DashboardLayout>
    );
};