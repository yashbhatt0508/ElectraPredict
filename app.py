import streamlit as st
import pandas as pd
import pickle

# -----------------------------
# PAGE CONFIG
# -----------------------------
st.set_page_config(page_title="Electricity Predictor", layout="centered")

# -----------------------------
# LIGHT + DARK STYLE COMBO
# -----------------------------
st.markdown("""
<style>
body {
    background-color: #f5f7fa;
}
.main {
    background-color: #f5f7fa;
}
.container {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
}
.title {
    color: #1f77b4;
    text-align: center;
}
button {
    background-color: #1f77b4 !important;
    color: white !important;
    border-radius: 8px !important;
}
</style>
""", unsafe_allow_html=True)

# -----------------------------
# LOAD MODEL
# -----------------------------
with open("electricity_model.pkl", "rb") as f:
    model = pickle.load(f)

# -----------------------------
# UI START
# -----------------------------
st.markdown('<div class="container">', unsafe_allow_html=True)

st.markdown('<h2 class="title">⚡ Electricity Demand Predictor</h2>', unsafe_allow_html=True)

st.write("Enter the values below:")

# -----------------------------
# INPUTS
# -----------------------------
hour = st.number_input("Hour (0-23)", 0, 23, 12)
dayofweek = st.number_input("Day of Week (0-6)", 0, 6, 3)
month = st.number_input("Month (1-12)", 1, 12, 6)

lag_1 = st.number_input("Previous Hour Demand", value=15000)
lag_24 = st.number_input("Previous Day Demand", value=16000)
lag_168 = st.number_input("Previous Week Demand", value=15500)

rolling_mean_24 = st.number_input("Rolling Mean (24h)", value=15800)
rolling_std_24 = st.number_input("Rolling Std (24h)", value=300)

# -----------------------------
# PREDICT
# -----------------------------
if st.button("Predict Demand"):

    input_df = pd.DataFrame([{
        "hour": hour,
        "dayofweek": dayofweek,
        "dayofyear": 100,
        "month": month,
        "quarter": (month-1)//3 + 1,
        "is_weekend": 1 if dayofweek >=5 else 0,
        "lag_1": lag_1,
        "lag_24": lag_24,
        "lag_168": lag_168,
        "rolling_mean_24": rolling_mean_24,
        "rolling_std_24": rolling_std_24,
        "rolling_mean_168": rolling_mean_24
    }])

    prediction = model.predict(input_df)[0]

    st.success(f"⚡ Predicted Demand: {round(prediction, 2)} MW")

st.markdown('</div>', unsafe_allow_html=True)