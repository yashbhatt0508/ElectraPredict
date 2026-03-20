# ⚡ Electricity Demand Prediction using XGBoost

## 📌 Overview
This project focuses on predicting hourly electricity demand using machine learning techniques.  
The model is trained on historical energy consumption data and uses time-based and lag features to forecast future demand.

The goal is to build an accurate and reliable forecasting system that can help in energy planning and demand management.

---

## 📊 Dataset

## Dataset: Hourly Energy Consumption

Source: Kaggle

Link: https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption

Kaggle Path: /kaggle/input/hourly-energy-consumption

Target Variable: AEP_MW (Electricity Demand)

Data Range: ~12,000 to 22,000 MW

## 🧠 Features Used

### ⏱️ Time-based Features
- `hour`
- `dayofweek`
- `dayofyear`
- `month`
- `quarter`
- `is_weekend`

### 🔁 Lag Features
- `lag_1` → Previous hour demand  
- `lag_24` → Previous day demand  
- `lag_168` → Previous week demand  

### 📉 Rolling Statistics
- `rolling_mean_24`
- `rolling_std_24`
- `rolling_mean_168`

---

## 🤖 Model Used
- **XGBoost Regressor**

### Why XGBoost?
- Handles non-linear relationships
- Works well with tabular + engineered features
- Robust against overfitting

---

## 📈 Model Performance

| Metric | Value |
|------|------|
| R² Score | 0.84 |
| MAE | 740 |
| RMSE | 1000 |

### 📊 Interpretation
- Model explains **84% of variance**
- Average error is **~4–6% of demand**
- Performs well across normal and peak conditions

---

## 🧪 Model Behavior (Testing Insights)

- Accurately predicts **low demand during night hours**
- Handles **peak demand (evening hours)** effectively
- Smooths sudden spikes instead of overreacting
- Predictions remain within realistic range (12k–22k)

---

## 🖥️ Streamlit App

An interactive web app is built using Streamlit where users can:

- Input time and lag features
- Get real-time electricity demand predictions

### ▶️ Run the app
```bash
streamlit run app.py