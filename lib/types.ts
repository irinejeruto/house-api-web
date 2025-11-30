export interface HealthResponse {
  status: string;
  message: string;
  models: {
    linear_model: boolean;
    logit_model: boolean;
  };
}

export interface HouseInputs {
  Beds: number;
  Baths: number;
  Sqft_home: number;
  Sqft_lot: number;
  Age: number;
  Type: string;
  Town: string;
}

export interface PredictPriceResponse {
  error: boolean;
  message?: string;
  inputs?: HouseInputs;
  predicted_log_price?: number;
  predicted_price?: number;
}

export interface PredictHighLowResponse {
  error: boolean;
  message?: string;
  inputs?: HouseInputs;
  threshold?: number;
  prob_high?: number;
  predicted_class?: string;
}

export interface HighLowInputs extends HouseInputs {
  threshold?: number;
}

