import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-[240px] flex-shrink-0 bg-sidebarBg border-r border-border h-full flex flex-col">
      {/* Brand Block */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary-gradient flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white"></polygon>
            </svg>
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-textPrimary leading-tight">ElectraPredict</h1>
            <p className="text-[12px] text-textMuted leading-tight mt-0.5">Demand Forecasting</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="text-[14px] font-medium text-indigo-700">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-not-allowed opacity-70 group hover:bg-gray-50 border-l-4 border-transparent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-textSecondary">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="text-[14px] font-medium text-textSecondary">Prediction Log</span>
          </div>
          
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-not-allowed opacity-70 group hover:bg-gray-50 border-l-4 border-transparent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-textSecondary">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
            <span className="text-[14px] font-medium text-textSecondary">Model Info</span>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6">
        {/* Model Status Card */}
        <div className="bg-slate-50 border border-border rounded-[10px] p-[14px] shadow-sm">
          <div className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
            <span className="text-[12px] text-textSecondary">Algorithm</span>
            <span className="text-[12px] font-medium text-textPrimary">XGBoost</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
            <span className="text-[12px] text-textSecondary">Input Features</span>
            <span className="text-[12px] font-medium text-textPrimary">8 variables</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
            <span className="text-[12px] text-textSecondary">Status</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="text-[12px] font-medium text-success">Live</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[12px] text-textSecondary">Version</span>
            <span className="text-[12px] font-medium text-textPrimary">v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
