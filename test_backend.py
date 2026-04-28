from main import app, predict, Features

f = Features(
    hour=12,
    day_of_week=3,
    month=6,
    lag_1h=15000,
    lag_24h=16000,
    lag_168h=15500,
    rolling_mean_24h=15800,
    rolling_std_24h=300
)

print("Predicting...")
result = predict(f)
print("Result:", result)
