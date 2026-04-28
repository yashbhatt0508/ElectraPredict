⚡ Electricity Demand Forecasting System (XGBoost)
An ML-powered system to predict electricity demand using historical consumption data, helping optimize energy distribution and reduce wastage.

🌐 Live Demo: [Add your Streamlit link here]
📊 Model Accuracy: R² = 0.84
⚡ Avg Error: ~740 MW

💡 Problem
Electricity providers often face:

⚠️ Over-supply → energy wastage
⚠️ Under-supply → power shortages
Accurate demand forecasting is critical to balance supply and demand efficiently.

🚀 Solution
Built a machine learning system that:

Uses time-based + historical demand features
Predicts future electricity demand in real-time
Helps simulate demand scenarios
🧠 Model
Algorithm: XGBoost Regressor
Why:
Handles non-linear patterns
Works well with time-series features
Robust performance on tabular data
📊 Dataset
Source: Kaggle — Hourly Energy Consumption
Target: AEP_MW
Range: 12,000 – 22,000 MW
⚙️ Features
⏱️ Time-based
hour, dayofweek, month, quarter
weekend indicator
🔁 Lag features
lag_1 (previous hour)
lag_24 (previous day)
lag_168 (previous week)
📉 Rolling stats
rolling_mean_24 / 168
rolling_std_24
📈 Performance
R² Score: 0.84
MAE: ~740 MW
RMSE: ~1000 MW
👉 Error ≈ 4–6% of total demand

📊 Results (Add Graphs Here)
Actual vs Predicted graph
Error distribution
🖥️ Live App
Built with Streamlit:

Input time + demand features
Get real-time prediction
Run locally: streamlit run app.py

🌍 Real-world Impact
Reduces electricity wastage
Prevents shortages
Improves grid efficiency
🧱 Tech Stack
Python
XGBoost
Pandas, NumPy
Streamlit
🚀 Future Improvements
Add LSTM / deep learning model
Real-time API integration
Region-wise prediction system

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
