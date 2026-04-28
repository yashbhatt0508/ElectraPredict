import React, { useState, useEffect } from 'react';
import { predictDemand } from '../utils/api';
import Charts from './Charts';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US', { hour12: false });

  return (
    <div className="flex flex-col items-end">
      <span className="text-[13px] font-mono text-textSecondary">{timeStr}</span>
      <span className="text-[12px] text-textMuted">{dateStr}</span>
    </div>
  );
};

const KPICard = ({ title, value, trend, trendColor, iconBg, iconPath }) => (
  <div className="bg-cardBg border border-border rounded-14px px-[20px] py-[18px] flex flex-col justify-between shadow-card w-full">
    <div className="flex justify-between items-start">
      <div className={`w-10 h-10 rounded-8px flex items-center justify-center`} style={{ backgroundColor: iconBg }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d={iconPath}></path>
        </svg>
      </div>
      {trend && (
        <span className={`text-[12px] font-bold px-2 py-0.5 rounded-pills ${trendColor === 'green' ? 'bg-successBg text-success' : 'bg-dangerBg text-danger'}`}>
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-[12px] text-textSecondary mb-1">{title}</p>
      <h3 className="text-[22px] font-semibold text-textPrimary leading-none">{value}</h3>
    </div>
  </div>
);

const InputField = ({ label, unit, value, onChange, min, max, type = "number" }) => (
  <div className="flex flex-col gap-1.5 mb-3.5">
    <div className="flex justify-between items-center">
      <label className="text-[13px] font-medium text-gray-700">{label}</label>
      <span className="text-[11px] bg-pageBg text-textSecondary border border-border px-1.5 py-0.5 rounded-md">{unit}</span>
    </div>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="w-full border border-border rounded-8px h-[38px] px-3 text-[14px] focus:outline-none focus:border-chart1 focus:ring-1 focus:ring-chart1"
    />
    <div className="flex items-center gap-2 mt-1">
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={onChange}
        className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-chart1"
      />
    </div>
    <span className="text-[11px] text-textMuted text-right">Min: {min} Max: {max}</span>
  </div>
);

const Dashboard = () => {
  const [params, setParams] = useState({
    hour: 12,
    day_of_week: 3,
    month: 6,
    lag_1h: 15000,
    lag_24h: 16000,
    lag_168h: 15500,
    rolling_mean_24h: 15800,
    rolling_std_24h: 300
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictDemand(params);
      setResult(res.prediction);
      showToast(`Prediction complete — ${res.prediction.toLocaleString()} MW`);
    } catch (err) {
      showToast("Error computing prediction", true);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex-1 bg-pageBg p-[28px] overflow-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 bg-white border-l-4 ${toast.isError ? 'border-danger' : 'border-success'} rounded-8px py-3 px-4 shadow-card flex items-center gap-3 animate-fade-in z-50`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={toast.isError ? '#dc2626' : '#22c55e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {toast.isError ? (
              <circle cx="12" cy="12" r="10"></circle>
            ) : (
              <>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </>
            )}
          </svg>
          <span className="text-[14px] font-medium text-textPrimary">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[22px] font-semibold text-textPrimary leading-tight">Demand Prediction Dashboard</h2>
          <p className="text-[13px] text-textSecondary mt-1">Real-time ML forecasting · XGBoost Model</p>
        </div>
        <ClockWidget />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <KPICard title="Model Accuracy" value="94.7%" trend="↑ 0.3%" trendColor="green" iconBg="#ede9fe" iconPath="M22 12h-4l-3 9L9 3l-3 9H2" />
        <KPICard title="Avg Demand (24h)" value="15,840 MW" trend="↑ 1.2%" trendColor="green" iconBg="#e0f2fe" iconPath="M3 3v18h18 M18 9l-5 5-4-4-5 5" />
        <KPICard title="Peak Hour Today" value="6:00 PM" trend="" trendColor="" iconBg="#fef9c3" iconPath="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <KPICard title="Data Points Used" value="8,760 hrs" trend="" trendColor="" iconBg="#dcfce7" iconPath="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
      </div>

      {/* Middle Section */}
      <div className="flex gap-[20px] mb-8">
        {/* Left: Input Parameters */}
        <div className="w-[45%] bg-cardBg border border-border rounded-14px p-[22px] px-[24px] shadow-card relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary-gradient"></div>
          <div className="mb-6 ml-2">
            <h3 className="text-[15px] font-semibold text-textPrimary">Input Parameters</h3>
            <p className="text-[12px] text-textMuted">Set variables for prediction</p>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 ml-2 custom-scrollbar">
            <InputField label="Hour" unit="hr" min={0} max={23} value={params.hour} onChange={(e) => handleParamChange('hour', e.target.value)} />
            <InputField label="Day of Week" unit="day" min={0} max={6} value={params.day_of_week} onChange={(e) => handleParamChange('day_of_week', e.target.value)} />
            <InputField label="Month" unit="mo" min={1} max={12} value={params.month} onChange={(e) => handleParamChange('month', e.target.value)} />
            <InputField label="Prev Hour Demand" unit="MW" min={5000} max={25000} value={params.lag_1h} onChange={(e) => handleParamChange('lag_1h', e.target.value)} />
            <InputField label="Prev Day Demand" unit="MW" min={5000} max={25000} value={params.lag_24h} onChange={(e) => handleParamChange('lag_24h', e.target.value)} />
            <InputField label="Prev Week Demand" unit="MW" min={5000} max={25000} value={params.lag_168h} onChange={(e) => handleParamChange('lag_168h', e.target.value)} />
            <InputField label="Rolling Mean 24h" unit="MW" min={5000} max={25000} value={params.rolling_mean_24h} onChange={(e) => handleParamChange('rolling_mean_24h', e.target.value)} />
            <InputField label="Rolling Std 24h" unit="MW" min={0} max={2000} value={params.rolling_std_24h} onChange={(e) => handleParamChange('rolling_std_24h', e.target.value)} />
          </div>

          <button 
            onClick={handlePredict}
            disabled={loading}
            className="w-full h-[46px] mt-6 bg-primary-gradient text-white font-semibold text-[14px] rounded-10px flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed ml-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing demand...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor"></polygon>
                </svg>
                Run Prediction
              </>
            )}
          </button>
        </div>

        {/* Right: Prediction Result */}
        <div className="w-[55%] bg-cardBg border border-border rounded-14px p-[22px] px-[24px] shadow-card flex flex-col justify-center">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[80px] h-[80px] rounded-full border-2 border-dashed border-border flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#c4b5fd"></polygon>
                </svg>
              </div>
              <p className="text-[14px] text-textMuted font-medium">Run a prediction to see results</p>
              <p className="text-[12px] text-slate-400 mt-1">Adjust parameters and click the button</p>
            </div>
          ) : (
            <div className="animate-fade-in-up h-full flex flex-col">
              <div className="mb-6">
                <span className="text-[12px] text-textMuted uppercase tracking-wider font-medium">Predicted Electricity Demand</span>
                <div className="flex items-end gap-3 mt-1">
                  <h2 className="text-[42px] font-bold text-chart1 leading-none">{result.toLocaleString()} MW</h2>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-indigo-50 text-indigo-800 text-[12px] font-medium px-3 py-1 rounded-pills">
                    ± {Math.round(result * 0.02)} MW estimated range
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <span className={`text-[12px] font-medium px-3 py-1 rounded-pills ${result > 17500 ? 'bg-dangerBg text-danger' : result < 13000 ? 'bg-warningBg text-warning' : 'bg-successBg text-success'}`}>
                  {result > 17500 ? 'High Demand' : result < 13000 ? 'Low Demand' : 'Normal'}
                </span>
                <span className="text-[12px] font-medium px-3 py-1 rounded-pills bg-slate-100 text-textSecondary">
                  {params.hour < 6 ? 'Night Hours' : params.hour < 12 ? 'Morning Peak' : params.hour < 18 ? 'Afternoon Load' : 'Evening Peak'}
                </span>
                <span className="text-[12px] font-medium px-3 py-1 rounded-pills bg-slate-100 text-textSecondary">
                  {[12,1,2].includes(params.month) ? 'Winter' : [3,4,5].includes(params.month) ? 'Spring' : [6,7,8].includes(params.month) ? 'Summer' : 'Autumn'}
                </span>
              </div>

              <div className="border-t border-border w-full mb-6"></div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 rounded-8px p-3">
                  <p className="text-[12px] text-textSecondary mb-1">vs Prev Hour</p>
                  {(() => {
                    const diff = ((result - params.lag_1h) / params.lag_1h * 100).toFixed(1);
                    const isPos = diff > 0;
                    return (
                      <span className={`text-[14px] font-semibold flex items-center gap-1 ${isPos ? 'text-success' : 'text-danger'}`}>
                        {isPos ? '↑' : '↓'} {Math.abs(diff)}%
                      </span>
                    )
                  })()}
                </div>
                <div className="bg-slate-50 rounded-8px p-3">
                  <p className="text-[12px] text-textSecondary mb-1">vs Prev Day</p>
                  {(() => {
                    const diff = ((result - params.lag_24h) / params.lag_24h * 100).toFixed(1);
                    const isPos = diff > 0;
                    return (
                      <span className={`text-[14px] font-semibold flex items-center gap-1 ${isPos ? 'text-success' : 'text-danger'}`}>
                        {isPos ? '↑' : '↓'} {Math.abs(diff)}%
                      </span>
                    )
                  })()}
                </div>
                <div className="bg-slate-50 rounded-8px p-3">
                  <p className="text-[12px] text-textSecondary mb-1">vs Prev Week</p>
                  {(() => {
                    const diff = ((result - params.lag_168h) / params.lag_168h * 100).toFixed(1);
                    const isPos = diff > 0;
                    return (
                      <span className={`text-[14px] font-semibold flex items-center gap-1 ${isPos ? 'text-success' : 'text-danger'}`}>
                        {isPos ? '↑' : '↓'} {Math.abs(diff)}%
                      </span>
                    )
                  })()}
                </div>
                <div className="bg-slate-50 rounded-8px p-3">
                  <p className="text-[12px] text-textSecondary mb-1">Demand Zone</p>
                  <span className="text-[14px] font-semibold text-textPrimary">
                    {result > 18000 ? 'Peak' : result > 15000 ? 'Shoulder' : 'Off-Peak'}
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[12px] text-textSecondary">Relative to typical daily range</span>
                  <span className="text-[12px] font-medium text-chart1">{Math.max(0, Math.min(100, ((result - 10000) / 12000) * 100)).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-pageBg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-gradient rounded-full"
                    style={{ width: `${Math.max(0, Math.min(100, ((result - 10000) / 12000) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <Charts currentHour={params.hour} prediction={result} />
    </div>
  );
};

export default Dashboard;
