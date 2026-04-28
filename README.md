<div align="center">

# ⚡ ElectraPredict
### Electricity Demand Forecasting System

*An end-to-end machine learning system that predicts electricity grid load using XGBoost — helping energy providers balance supply and demand in real time.*

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-Regressor-FF6600?style=flat-square)
![Streamlit](https://img.shields.io/badge/Streamlit-Live%20App-FF4B4B?style=flat-square&logo=streamlit&logoColor=white)
![R²](https://img.shields.io/badge/R²%20Score-0.84-22c55e?style=flat-square)
![MAE](https://img.shields.io/badge/MAE-~740%20MW-f59e0b?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)

**[🌐 Live Demo](#)** · **[📓 Notebook](#)** · **[📊 Dataset](https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption)**

</div>

---

## 📌 Overview

Electricity providers face a constant balancing act — generate too much and you waste energy, generate too little and you cause shortages. Neither outcome is acceptable at grid scale.

**ElectraPredict** solves this by learning from historical consumption patterns to forecast demand with high accuracy. Given the hour, day, and recent demand history, it predicts how many megawatts the grid will need — before it needs them.

| Metric | Value |
|--------|-------|
| Algorithm | XGBoost Regressor |
| Dataset | AEP Hourly Energy Consumption (Kaggle) |
| Target Variable | `AEP_MW` |
| Demand Range | 12,000 – 22,000 MW |
| R² Score | **0.84** |
| MAE | **~740 MW** |
| RMSE | **~1,000 MW** |
| Error Rate | ~4–6% of total demand |

---

## 💡 Problem Statement

Energy grid operators must decide how much electricity to generate hours — sometimes days — in advance. Without accurate forecasting:

- **Over-supply** leads to wasted generation capacity and higher costs
- **Under-supply** causes rolling blackouts and power shortages
- **Inefficient scheduling** strains infrastructure and increases carbon emissions

Accurate demand forecasting is not a nice-to-have — it is core infrastructure.

---

## 🧠 Model

**Algorithm: XGBoost Regressor**

XGBoost was chosen for this task because:
- Handles non-linear temporal patterns without manual feature engineering
- Naturally captures interactions between time-based and lag features
- Robust to outliers and skewed distributions common in energy data
- Fast training and inference on tabular datasets
- Consistently strong benchmark performance on time-series regression tasks

---

## ⚙️ Feature Engineering

The model uses 3 categories of features, all derived from the raw timestamp and historical demand values.

**Time-based features**
| Feature | Description |
|---------|-------------|
| `hour` | Hour of day (0–23) |
| `dayofweek` | Day of week (0 = Monday) |
| `month` | Month of year (1–12) |
| `quarter` | Quarter (1–4) |
| `is_weekend` | Binary flag for Saturday/Sunday |

**Lag features** *(previous demand values)*
| Feature | Description |
|---------|-------------|
| `lag_1` | Demand 1 hour ago |
| `lag_24` | Demand 24 hours ago (same hour yesterday) |
| `lag_168` | Demand 168 hours ago (same hour last week) |

**Rolling statistics**
| Feature | Description |
|---------|-------------|
| `rolling_mean_24` | 24-hour rolling average demand |
| `rolling_mean_168` | 7-day rolling average demand |
| `rolling_std_24` | 24-hour rolling standard deviation |

---

## 📈 Model Performance

```
R� Score  :  0.84      (84% of demand variance explained)
MAE       :  ~740 MW   (average prediction error)
RMSE      :  ~1000 MW  (penalises large errors)
Error %   :  4–6%      (relative to typical demand of ~15,000 MW)
```

> An MAE of 740 MW on a demand range of 12,000–22,000 MW means the model is typically accurate to within **4–6%** — well within operational planning thresholds for most grid operators.

**Results visualisation** *(add your plots here)*

| Actual vs Predicted | Error Distribution |
|--------------------|--------------------|
| `[insert graph]` | `[insert graph]` |

---

## 🖥️ Live Application

Built with Streamlit. Input your time and demand features, get an instant prediction.

**🌐 Live app:** [Add your Streamlit Cloud link here]

**Run locally:**
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/electrapredict.git
cd electrapredict

# 2. Install dependencies
pip install -r requirements.txt

# 3. Launch the app
streamlit run app.py
```

---

## 🗂️ Project Structure

```
electrapredict/
│
├── app.py                  # Streamlit application
├── model.pkl               # Trained XGBoost model
├── requirements.txt        # Python dependencies
│
├── notebooks/
│   └── electricity_demand_forecasting.ipynb   # Full EDA + training notebook
│
├── data/
│   └── AEP_hourly.csv      # Raw dataset (download from Kaggle)
│
└── README.md
```

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3.9+ |
| ML Model | XGBoost |
| Data processing | Pandas, NumPy |
| Frontend / UI | Streamlit |
| Model persistence | Joblib / Pickle |

---

## 🌍 Real-World Impact

- **Grid operators** can pre-schedule generation capacity more accurately
- **Renewable integration** improves as surplus/deficit windows are predicted earlier
- **Cost reduction** from avoiding emergency power purchases during shortage spikes
- **Carbon efficiency** improves when fossil backup plants are activated only when genuinely needed

---

## 🚀 Future Improvements

- [ ] Replace XGBoost with an LSTM or Transformer model for longer-horizon forecasting
- [ ] Add a real-time data pipeline (live feed from energy APIs)
- [ ] Region-wise prediction system supporting multiple grid zones
- [ ] Anomaly detection layer to flag unusual consumption spikes
- [ ] Docker containerisation for one-command deployment
- [ ] REST API via FastAPI for integration into grid management systems

---

## 📊 Dataset

**Source:** [Kaggle — Hourly Energy Consumption](https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption)  
**Provider:** AEP (American Electric Power)  
**Granularity:** Hourly readings  
**Target column:** `AEP_MW`  
**Range:** 12,000 – 22,000 MW

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

Built by **[Your Name]** · [LinkedIn](#) · [Portfolio](#)

*If you found this useful, consider giving it a ⭐*

</div>
