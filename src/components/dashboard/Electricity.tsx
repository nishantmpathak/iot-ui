import React from "react";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ELECTRICITY_METER } from "../../consts/RoutingConstants";
import {
  AppBar,
  Toolbar,
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { apiResponse } from "../../consts/mocks";

type Reading = {
  metric_name: string;
  metric_value: number;
  unit: string;
  timestamp: string;
};

type DevicePayload = {
  device: {
    id: string;
    label: string;
    location: string;
    timeStamp: string;
  };
  readings: Reading[];
};

const transformData = (data: DevicePayload[]) => {
  return data.map((item) => {
    const readingsMap = item.readings.reduce((acc, reading) => {
      acc[reading.metric_name] = reading.metric_value;
      return acc;
    }, {} as Record<string, number>);

    return {
      label: item.device.label,
      id: item.device.id,
      location: item.device.location,
      timestamp: item.device.timeStamp,
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
};

const organizationData = {
  organization: "TATA",
  location: "Pune",
  totalDevices: 30,
  activeDevices: 28,
  inactiveDEvices: 2,
  totalPowerComsumed: 1000,
}


const Electricity: React.FC = () => {
  const navigate = useNavigate();
  const tableData = transformData(apiResponse);

  // Common card style that adapts to theme
  const cardStyle = {
    borderRadius: 4,
    p: 1,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid',
    borderColor: 'divider', // Uses theme divider color
    backgroundColor: 'background.paper', // Uses white in light mode
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        ⚡ Electricity Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Meters Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    Total Meters
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: 'text.primary' }}>
                    {organizationData.totalDevices}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 60, height: 60 }}>
                  <SpeedIcon sx={{ fontSize: 35 }} />
                </Avatar>
              </Box>
              <Typography variant="caption" sx={{ color: 'success.main', mt: 2, display: 'block', fontWeight: 600 }}>
                ● {organizationData.activeDevices} Online <span style={{ color: '#666' }}>/ {organizationData.inactiveDEvices} Offline</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Consumption Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    Total Consumption
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, color: 'text.primary' }}>
                    {organizationData.totalPowerComsumed} <Typography component="span" variant="h5" color="error">kW</Typography>
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

      <TableContainer
        component={Paper}
        sx={{
          mt: 4,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper"
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.50' }}>
            <TableRow>
              {[
                "Label", "Location", "Timestamp", "Meter Unit (kWh)",
                "Vr (V)", "Vy (V)", "Vb (V)", "Ir (A)", "Iy (A)", "Ib (A)", "PF",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
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
                  cursor: 'pointer',
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
                onClick={() => navigate(ELECTRICITY_METER + "/" + row.id)}
              >
                <TableCell sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>
                  {new Date(row.timestamp).toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: "success.main", fontWeight: 700 }}>
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
                        ? "success.main"
                        : row.PF > 0.8
                          ? "warning.main"
                          : "error.main",
                    fontWeight: 700,
                  }}
                >
                  {row.PF}
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