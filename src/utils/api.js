import axios from 'axios';

// ✅ Directly use your deployed backend URL
const api = axios.create({
  baseURL: 'https://electrapredict.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Optional: wake up Render (prevents cold start issues)
const wakeBackend = async () => {
  try {
    await api.get('/health');
  } catch (err) {
    console.warn("Wake-up call failed (can ignore):", err.message);
  }
};

export const predictDemand = async (features) => {
  try {
    // 🔥 Wake backend before prediction (important for free tier)
    await wakeBackend();

    const response = await api.post('/predict', features);
    return response.data;

  } catch (error) {
    console.error("Prediction API Error:", error.response?.data || error.message);
    throw error;
  }
};
    throw error;
  }
};