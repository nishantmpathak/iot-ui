import React, { useCallback, useRef } from "react";
import { Typography, Paper, Box, Button, Stack} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../layout/DashboardLayout";
import DownloadIcon from "@mui/icons-material/Download";
import { useCurrentPng } from "recharts-to-png"; // Utility to convert SVG to PNG
import FileSaver from "file-saver";

// Sample data for the last 7 days
const data = [
  { day: "Mon", units: 450 },
  { day: "Tue", units: 300 },
  { day: "Wed", units: 600 },
  { day: "Thu", units: 800 },
  { day: "Fri", units: 500 },
  { day: "Sat", units: 900 },
  { day: "Sun", units: 1100 },
];

const Home: React.FC = () => {
  // 1. Create a reference for the chart and the PNG generator
  const [getPng, { ref }] = useCurrentPng();

  // 2. Export Handler
  const handleExport = useCallback(async () => {
    const png = await getPng();
    if (png) {
      FileSaver.saveAs(png, "iot-dashboard-chart.png");
    }
  }, [getPng]);

  return (
    <DashboardLayout>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        {/* Header Stack to push button to the right */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Welcome to iot-ui Dashboard 🚀
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Device Monitoring System - Last 7 Days Activity
            </Typography>
          </Box>
          
          
        </Stack>
      </Paper>
    </DashboardLayout>
  );
};

export default Home;