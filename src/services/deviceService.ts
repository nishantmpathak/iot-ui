import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// --- Interfaces ---

export interface DeviceRequest {
    label: string;
    location: string;
    gateway_id: number;
    hardware_model: string;
    device_type: string;
    is_active: boolean;
}

export interface DeviceResponse extends DeviceRequest {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface MetricReading {
    metric: string;
    metric_value: number;
    metric_unit: string;
}

export interface FullReading {
    id: number;
    timestamp: string;
    readings: MetricReading[];
    created_at: string;
    quality_flag: string | number;
}

export interface DeviceReadingResponse {
    device_id: number;
    label: string;
    location: string;
    device_type: string;
    is_active: boolean;
    formatted_readings: FullReading[];
}

export interface ShiftDetails {
    name: string;
    start_time: string;
    end_time: string;
}

export interface DeviceFilterPayload {
    device_ids: number[];
    filter_type: 'shift' | 'range';
    start_date: string;
    end_date: string;
    shift_details: ShiftDetails | null;
}

// --- Service Implementation ---

export const deviceService = {
    /**
     * Registers a new device
     */
    registerDevice: async (data: DeviceRequest): Promise<DeviceResponse> => {
        try {
            const response = await axios.post<DeviceResponse>(`${API_BASE_URL}/device/`, data);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.detail || "Failed to register device";
            throw new Error(message);
        }
    }, // <-- Added missing comma here

    /**
     * Fetches readings based on the filter payload
     */
    getDeviceReadings: async (payload: DeviceFilterPayload): Promise<DeviceReadingResponse[]> => {
        try {
            const response = await axios.post<DeviceReadingResponse[]>(
                `${API_BASE_URL}/device/readings`, 
                payload, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error("Error fetching device readings:", error.response?.data || error.message);
            const message = error.response?.data?.detail || "Error fetching device readings";
            throw new Error(message);
        }
    }
};