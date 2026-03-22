export const apiResponse = [
  {
    "gateway_id": 1,
    "imei": "123123213123213213124",
    "location": "Pune",
    "devices": [
      {
        "device_id": 1,
        "label": "Manufacturing Room",
        "location": "Pune",
        "device_type": "Electricity Meter",
        "is_active": true,
        "latest_reading": {
          "id": 11,
          "device_id": 1,
          "readings": [
            {
              "metric": "Cr",
              "metric_value": 13.2,
              "metric_unit": "A"
            },
            {
              "metric": "Vr",
              "metric_value": 231.4,
              "metric_unit": "V"
            },
            {
              "metric": "TotalWatts",
              "metric_value": 100.0,
              "metric_unit": "W"
            }
          ],
          "timestamp": "2026-03-08T11:50:10",
          "created_at": "2026-03-14T12:01:21.025471",
          "quality_flag": "1"
        }
      }
    ]
  },
  {
    "gateway_id": 3,
    "imei": "123123213123213213126",
    "location": "Pune",
    "devices": [
      {
        "device_id": 2,
        "label": "Manudacturing Room",
        "location": "Pune",
        "device_type": "Electricity Meter",
        "is_active": true,
        "latest_reading": {
          "id": 12,
          "device_id": 2,
          "readings": [
            {
              "metric": "Cr",
              "metric_value": 13.2,
              "metric_unit": "A"
            },
            {
              "metric": "Vr",
              "metric_value": 231.4,
              "metric_unit": "V"
            },
            {
              "metric": "TotalWatts",
              "metric_value": 100.0,
              "metric_unit": "W"
            }
          ],
          "timestamp": "2026-03-08T11:50:10",
          "created_at": "2026-03-14T12:12:24.274591",
          "quality_flag": "1"
        }
      },
      {
        "device_id": 3,
        "label": "Manudacturing Room",
        "location": "Pune",
        "device_type": "Electricity Meter",
        "is_active": true,
        "latest_reading": null
      },
      {
        "device_id": 4,
        "label": "sattion 1",
        "location": "Pune",
        "device_type": "Electricity Meter",
        "is_active": true,
        "latest_reading": null
      }
    ]
  }
]

export const meterData = {
    device: {
        id: "1",
        label: "Shop 1",
        location: "Pune",
        gatewayId: "1231231231231232",
        hardwareModel: "Motorola",
        deviceType: "Electricity Meter",
        isActive: true
    },
    history: [
        {
            hour: "00:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4500.10, "unit": "kWh", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Vr", "metric_value": 230.1, "unit": "V", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Vy", "metric_value": 229.5, "unit": "V", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Vb", "metric_value": 231.0, "unit": "V", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Ir", "metric_value": 4.10, "unit": "A", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Iy", "metric_value": 3.90, "unit": "A", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "Ib", "metric_value": 4.05, "unit": "A", "timestamp": "2026-02-28T00:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.95, "unit": "ratio", "timestamp": "2026-02-28T00:00:00Z" }
            ]
        },
        {
            hour: "01:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4502.45, "unit": "kWh", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Vr", "metric_value": 231.2, "unit": "V", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Vy", "metric_value": 230.1, "unit": "V", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Vb", "metric_value": 231.5, "unit": "V", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Ir", "metric_value": 4.55, "unit": "A", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Iy", "metric_value": 4.20, "unit": "A", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "Ib", "metric_value": 4.30, "unit": "A", "timestamp": "2026-02-28T01:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.94, "unit": "ratio", "timestamp": "2026-02-28T01:00:00Z" }
            ]
        },
        {
            hour: "02:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4504.80, "unit": "kWh", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Vr", "metric_value": 229.8, "unit": "V", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Vy", "metric_value": 228.9, "unit": "V", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Vb", "metric_value": 230.2, "unit": "V", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Ir", "metric_value": 3.80, "unit": "A", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Iy", "metric_value": 3.70, "unit": "A", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "Ib", "metric_value": 3.75, "unit": "A", "timestamp": "2026-02-28T02:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.96, "unit": "ratio", "timestamp": "2026-02-28T02:00:00Z" }
            ]
        },
        {
            hour: "03:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4506.10, "unit": "kWh", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Vr", "metric_value": 230.5, "unit": "V", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Vy", "metric_value": 230.0, "unit": "V", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Vb", "metric_value": 230.8, "unit": "V", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Ir", "metric_value": 2.10, "unit": "A", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Iy", "metric_value": 2.05, "unit": "A", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "Ib", "metric_value": 2.00, "unit": "A", "timestamp": "2026-02-28T03:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.98, "unit": "ratio", "timestamp": "2026-02-28T03:00:00Z" }
            ]
        },
        {
            hour: "04:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4507.20, "unit": "kWh", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Vr", "metric_value": 232.0, "unit": "V", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Vy", "metric_value": 231.4, "unit": "V", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Vb", "metric_value": 232.1, "unit": "V", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Ir", "metric_value": 1.90, "unit": "A", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Iy", "metric_value": 1.85, "unit": "A", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "Ib", "metric_value": 1.88, "unit": "A", "timestamp": "2026-02-28T04:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.97, "unit": "ratio", "timestamp": "2026-02-28T04:00:00Z" }
            ]
        },
        {
            hour: "05:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4508.90, "unit": "kWh", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Vr", "metric_value": 231.5, "unit": "V", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Vy", "metric_value": 230.8, "unit": "V", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Vb", "metric_value": 231.2, "unit": "V", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Ir", "metric_value": 3.10, "unit": "A", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Iy", "metric_value": 3.00, "unit": "A", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "Ib", "metric_value": 3.05, "unit": "A", "timestamp": "2026-02-28T05:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.95, "unit": "ratio", "timestamp": "2026-02-28T05:00:00Z" }
            ]
        },
        {
            hour: "06:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4512.30, "unit": "kWh", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Vr", "metric_value": 228.4, "unit": "V", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Vy", "metric_value": 227.9, "unit": "V", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Vb", "metric_value": 229.1, "unit": "V", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Ir", "metric_value": 6.80, "unit": "A", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Iy", "metric_value": 6.50, "unit": "A", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "Ib", "metric_value": 6.65, "unit": "A", "timestamp": "2026-02-28T06:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.91, "unit": "ratio", "timestamp": "2026-02-28T06:00:00Z" }
            ]
        },
        {
            hour: "07:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4516.50, "unit": "kWh", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Vr", "metric_value": 227.1, "unit": "V", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Vy", "metric_value": 226.5, "unit": "V", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Vb", "metric_value": 227.8, "unit": "V", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Ir", "metric_value": 8.20, "unit": "A", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Iy", "metric_value": 7.90, "unit": "A", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "Ib", "metric_value": 8.10, "unit": "A", "timestamp": "2026-02-28T07:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.89, "unit": "ratio", "timestamp": "2026-02-28T07:00:00Z" }
            ]
        },
        {
            hour: "08:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4520.10, "unit": "kWh", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Vr", "metric_value": 228.9, "unit": "V", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Vy", "metric_value": 228.2, "unit": "V", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Vb", "metric_value": 229.4, "unit": "V", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Ir", "metric_value": 7.50, "unit": "A", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Iy", "metric_value": 7.20, "unit": "A", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "Ib", "metric_value": 7.40, "unit": "A", "timestamp": "2026-02-28T08:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.92, "unit": "ratio", "timestamp": "2026-02-28T08:00:00Z" }
            ]
        },
        {
            hour: "09:00",
            readings: [
                { "metric_name": "meterUnitReading", "metric_value": 4521.85, "unit": "kWh", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Vr", "metric_value": 230.4, "unit": "V", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Vy", "metric_value": 229.8, "unit": "V", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Vb", "metric_value": 231.1, "unit": "V", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Ir", "metric_value": 5.12, "unit": "A", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Iy", "metric_value": 4.95, "unit": "A", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "Ib", "metric_value": 5.03, "unit": "A", "timestamp": "2026-02-28T09:00:00Z" },
                { "metric_name": "PF", "metric_value": 0.94, "unit": "ratio", "timestamp": "2026-02-28T09:00:00Z" }
            ]
        }
    ]
};
