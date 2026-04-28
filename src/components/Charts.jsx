import React from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-8px p-3 shadow-card text-[12px] font-medium text-textPrimary">
        <p className="mb-1 text-textSecondary">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color || '#1e293b' }}>
            {entry.name || 'Value'}: {entry.value.toLocaleString()} {unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Charts = ({ currentHour, prediction }) => {
  const baseHourlyData = [
    { hour: 0, demand: 11200 }, { hour: 1, demand: 10800 }, { hour: 2, demand: 10500 }, { hour: 3, demand: 10200 },
    { hour: 4, demand: 10600 }, { hour: 5, demand: 11800 }, { hour: 6, demand: 13500 }, { hour: 7, demand: 15200 },
    { hour: 8, demand: 16800 }, { hour: 9, demand: 17400 }, { hour: 10, demand: 17800 }, { hour: 11, demand: 18200 },
    { hour: 12, demand: 18500 }, { hour: 13, demand: 18100 }, { hour: 14, demand: 17900 }, { hour: 15, demand: 18000 },
    { hour: 16, demand: 18600 }, { hour: 17, demand: 20100 }, { hour: 18, demand: 21000 }, { hour: 19, demand: 20400 },
    { hour: 20, demand: 19200 }, { hour: 21, demand: 17800 }, { hour: 22, demand: 15600 }, { hour: 23, demand: 13200 }
  ];

  const featureImportance = [
    { name: 'Prev Day Demand', value: 32 },
    { name: 'Prev Week Demand', value: 24 },
    { name: 'Rolling Mean 24h', value: 18 },
    { name: 'Prev Hour Demand', value: 12 },
    { name: 'Rolling Std 24h', value: 7 },
    { name: 'Hour of Day', value: 4 },
    { name: 'Month', value: 2 },
    { name: 'Day of Week', value: 1 }
  ].sort((a, b) => a.value - b.value);

  const baseMonthlyData = [
    { month: 'Jan', demand: 16200 }, { month: 'Feb', demand: 15800 }, { month: 'Mar', demand: 15000 },
    { month: 'Apr', demand: 14200 }, { month: 'May', demand: 14800 }, { month: 'Jun', demand: 17200 },
    { month: 'Jul', demand: 19500 }, { month: 'Aug', demand: 18900 }, { month: 'Sep', demand: 16400 },
    { month: 'Oct', demand: 15200 }, { month: 'Nov', demand: 15800 }, { month: 'Dec', demand: 17100 }
  ];

  // Dynamically scale the chart data based on the actual prediction
  const scale = prediction && baseHourlyData[currentHour] ? (prediction / baseHourlyData[currentHour].demand) : 1;
  const hourlyData = baseHourlyData.map(d => ({ ...d, demand: Math.round(d.demand * scale) }));
  const monthlyData = baseMonthlyData.map(d => ({ ...d, demand: Math.round(d.demand * scale) }));

  const getBarColor = (hour) => {
    if (hour < 6) return '#94a3b8'; // Night
    if (hour < 12) return '#f59e0b'; // Morning
    if (hour < 18) return '#6366f1'; // Afternoon
    return '#ef4444'; // Evening
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[16px] font-semibold text-textPrimary">Analytics Overview</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-[12px] text-success font-medium">Live data</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="bg-cardBg border border-border rounded-14px p-[20px] shadow-card">
          <div className="mb-4">
            <h4 className="text-[14px] font-semibold text-textPrimary">24-Hour Demand Pattern</h4>
            <p className="text-[12px] text-textSecondary">Typical daily load profile</p>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="MW" />} />
                <ReferenceLine x={currentHour} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1.5} label={{ position: 'top', value: 'Now', fill: '#f59e0b', fontSize: 11, fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDemand)" activeDot={{ r: 6, fill: '#6366f1' }} dot={false} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-cardBg border border-border rounded-14px p-[20px] shadow-card">
          <div className="mb-4">
            <h4 className="text-[14px] font-semibold text-textPrimary">Feature Importance</h4>
            <p className="text-[12px] text-textSecondary">Contribution to prediction (%)</p>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={110} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1000}>
                  {featureImportance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index >= featureImportance.length - 3 ? '#6366f1' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3 */}
        <div className="bg-cardBg border border-border rounded-14px p-[20px] shadow-card">
          <div className="mb-4">
            <h4 className="text-[14px] font-semibold text-textPrimary">Monthly Average Demand</h4>
            <p className="text-[12px] text-textSecondary">Seasonal variation across the year</p>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="MW" />} />
                <Area type="monotone" dataKey="demand" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorMonth)" dot={{ r: 4, fill: '#14b8a6', strokeWidth: 0 }} activeDot={{ r: 6 }} animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4 */}
        <div className="bg-cardBg border border-border rounded-14px p-[20px] shadow-card flex flex-col">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <h4 className="text-[14px] font-semibold text-textPrimary">Avg Demand by Hour</h4>
              <p className="text-[12px] text-textSecondary">Color-coded by time period</p>
            </div>
            <div className="flex gap-2 text-[10px] text-textSecondary font-medium">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#94a3b8]"></span>Night</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#f59e0b]"></span>Morn</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#6366f1]"></span>Aft</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#ef4444]"></span>Eve</div>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip unit="MW" />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="demand" radius={[2, 2, 0, 0]} animationDuration={1000}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.hour)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Charts;
