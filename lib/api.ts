import { HealthResponse, HouseInputs, PredictPriceResponse, PredictHighLowResponse, HighLowInputs } from './types';

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
};

export async function getHealth(): Promise<HealthResponse> {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/health`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch health status: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
}

export async function predictPrice(inputs: HouseInputs): Promise<PredictPriceResponse> {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();
  
  // Add all inputs to query params
  Object.entries(inputs).forEach(([key, value]) => {
    params.append(key, String(value));
  });

  try {
    const res = await fetch(`${baseUrl}/predict_price?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${errorText}`);
    }

    const data: PredictPriceResponse = await res.json();
    
    if (data.error) {
      throw new Error(data.message || 'Unknown API error');
    }

    return data;
  } catch (error) {
    console.error("Predict price failed:", error);
    throw error;
  }
}

export async function predictHighLow(inputs: HighLowInputs): Promise<PredictHighLowResponse> {
  const baseUrl = getBaseUrl();
  const params = new URLSearchParams();

  Object.entries(inputs).forEach(([key, value]) => {
      params.append(key, String(value));
  });

  try {
    const res = await fetch(`${baseUrl}/predict_highlow?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${errorText}`);
    }

    const data: PredictHighLowResponse = await res.json();

    if (data.error) {
      throw new Error(data.message || 'Unknown API error');
    }

    return data;
  } catch (error) {
    console.error("Predict high/low failed:", error);
    throw error;
  }
}

