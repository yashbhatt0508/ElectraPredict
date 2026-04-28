from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="ElectraPredict API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# Load the user's specific model
model = joblib.load("electricity_model.pkl")

class Features(BaseModel):
    hour: int
    day_of_week: int
    month: int
    lag_1h: float
    lag_24h: float
    lag_168h: float
    rolling_mean_24h: float
    rolling_std_24h: float

@app.post("/predict")
def predict(f: Features):
    # The UI provides 8 features, but the XGBoost model expects 12 based on the README.
    # We will derive the remaining 4 features to ensure the model does not crash.
    
    dayofyear = f.month * 30 - 15  # Approximation
    quarter = (f.month - 1) // 3 + 1
    is_weekend = 1 if f.day_of_week >= 5 else 0
    rolling_mean_168 = f.rolling_mean_24h  # Use 24h mean as proxy
    
    # Construct a DataFrame so XGBoost has the correct feature names
    X = pd.DataFrame([{
        "hour": f.hour,
        "dayofweek": f.day_of_week,
        "dayofyear": dayofyear,
        "month": f.month,
        "quarter": quarter,
        "is_weekend": is_weekend,
        "lag_1": f.lag_1h,
        "lag_24": f.lag_24h,
        "lag_168": f.lag_168h,
        "rolling_mean_24": f.rolling_mean_24h,
        "rolling_std_24": f.rolling_std_24h,
        "rolling_mean_168": rolling_mean_168
    }])
    
    # Try using DataFrame first (needed if trained with pandas), otherwise fallback to array
    try:
        pred = float(model.predict(X)[0])
    except:
        X_arr = np.array(X)
        pred = float(model.predict(X_arr)[0])
        
    return {"prediction": round(pred, 2), "unit": "MW"}

@app.get("/health")
def health():
    return {"status": "ok", "model": "loaded"}
