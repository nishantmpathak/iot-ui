import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface GatewayRequest {
    imei: string;
    location: string;
}

export interface GatewayResponse {
    id: number;
    imei: string;
    location: string;
    created_at: string;
}

export interface MetricReading {
    metric: string;
    metric_value: number;
    metric_unit: string;
}

export interface LatestReading {
    id: number;
    device_id: number;
    readings: MetricReading[];
    timestamp: string;
    created_at: string;
    quality_flag: string;
}

export interface DeviceWithReading {
    device_id: number;
    label: string;
    location: string;
    device_type: string;
    is_active: boolean;
    latest_reading: LatestReading | null;
}

export interface GatewayReadingResponse {
    gateway_id: number;
    imei: string;
    location: string;
    devices: DeviceWithReading[];
}

export const gatewayService = {
    registerGateway: async (data: GatewayRequest): Promise<GatewayResponse> => {
        try {
            const response = await axios.post<GatewayResponse>(`${API_BASE_URL}/gateways/`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            return response.data;
        } catch (error: any) {
            // Handle the "Gateway already exists" or other 400 errors
            if (error.response && error.response.data) {
                throw new Error(error.response.data.detail || "Failed to register gateway");
            }
            throw new Error("Network error or server is down");
        }
    },

    getGatewayReadings: async (gatewayIds: number[]): Promise<GatewayReadingResponse[]> => {
        try {
            const response = await axios.post<GatewayReadingResponse[]>(
                `${API_BASE_URL}/gateways/readings`, 
                gatewayIds, // Sending the array directly as requested
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.detail || "Failed to fetch readings");
            }
            throw new Error("Network error while fetching readings");
        }
    },

    getAllGateways: async (): Promise<GatewayResponse[]> => {
        try {
            const response = await axios.get<GatewayResponse[]>(`${API_BASE_URL}/gateways/`, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.detail || "Failed to fetch gateways");
            }
            throw new Error("Network error while fetching gateways");
        }
    }
};