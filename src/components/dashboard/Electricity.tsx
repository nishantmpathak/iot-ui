import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ELECTRICITY_METER } from "../../consts/RoutingConstants";
import { gatewayService, GatewayReadingResponse } from "../../services/gatewayService";

const Electricity: React.FC = () => {
  const navigate = useNavigate();
  
  // State management
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformGatewayData = (gateways: GatewayReadingResponse[]) => {
    const flattenedDevices: any[] = [];
    gateways.forEach((gateway) => {
      gateway.devices.forEach((dev) => {
        const readingsMap = dev.latest_reading?.readings.reduce((acc, r) => {
          acc[r.metric] = r.metric_value;
          return acc;
        }, {} as Record<string, number>) || {};

        flattenedDevices.push({
          id: dev.device_id,
          label: dev.label,
          location: dev.location,
          gatewayImei: gateway.imei,
          isActive: dev.is_active,
          timestamp: dev.latest_reading?.timestamp || "N/A",
          Cr: readingsMap["Cr"] || 0,
          Vr: readingsMap["Vr"] || 0,
          TotalWatts: readingsMap["TotalWatts"] || 0,
        });
      });
    });
    return flattenedDevices;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //TO DO:  Calling your service with the IDs you provided (1 and 3)
        const data = await gatewayService.getGatewayReadings([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        const transformed = transformGatewayData(data);
        setTableData(transformed);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Fetching real-time readings...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        ⚡ Electricity Dashboard
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="textSecondary" sx={{ fontWeight: 'bold' }}>Total Meters</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{tableData.length}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 60, height: 60 }}>
                  <SpeedIcon sx={{ fontSize: 35 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="textSecondary" sx={{ fontWeight: 'bold' }}>Live Load</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {tableData.reduce((sum, row) => sum + row.TotalWatts, 0).toFixed(1)} <Typography component="span" variant="h5" color="error">W</Typography>
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main', width: 60, height: 60 }}>
                  <ElectricBoltIcon sx={{ fontSize: 35 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.50' }}>
            <TableRow>
              {["Label", "Gateway", "Location", "Last Update", "Current (A)", "Voltage (V)", "Power (W)", "Status"].map((header) => (
                <TableCell key={header} sx={{ fontWeight: 700 }}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} hover onClick={() => navigate(`${ELECTRICITY_METER}/${row.id}`)} sx={{ cursor: 'pointer' }}>
                <TableCell sx={{ fontWeight: 600 }}>{row.label}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem' }}>{row.gatewayImei}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.timestamp !== "N/A" ? new Date(row.timestamp).toLocaleTimeString() : "Offline"}</TableCell>
                <TableCell>{row.Cr} A</TableCell>
                <TableCell>{row.Vr} V</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{row.TotalWatts} W</TableCell>
                <TableCell>
                  <Box sx={{ color: row.isActive ? "success.main" : "error.main", fontWeight: 600 }}>
                    ● {row.isActive ? "Online" : "Offline"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
};

export default Electricity;