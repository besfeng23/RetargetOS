
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Palette, Users, DollarSign, 
  TrendingUp, TrendingDown, Minus, CheckCircle2, AlertCircle,
  Sparkles, ChevronRight, Bell, ArrowUpRight, ArrowDownRight, 
  Briefcase, Menu, X, SlidersHorizontal, ArrowRight, Search,
  Activity, Command, Settings
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_BRIEF = {
  bestOpportunity: { campaign: 'Summer Sale', impact: '+$5,520 Rev', type: 'scale' },
  biggestWaste: { campaign: 'Cold Traffic Test', impact: '-$3,100 Loss', type: 'pause' },
};

const MOCK_METRICS = {
  totalSpend: 15400, totalRevenue: 48200, netProfit: 12800, roas: 3.13,
};

const MOCK_CAMPAIGNS = [
  { id: 'c1', name: 'Summer Sale Campaign', status: 'active', spend: 5200, revenue: 18400, roas: 3.54, trend: 'improving', action: 'Scale +25%' },
  { id: 'c2', name: 'Cold Traffic Test', status: 'active', spend: 3100, revenue: 1850, roas: 0.60, trend: 'declining', action: 'Pause' },
  { id: 'c3', name: 'Retargeting Sequence', status: 'active', spend: 4200, revenue: 16800, roas: 4.00, trend: 'stable', action: null },
  { id: 'c4', name: 'Win-back Offer', status: 'paused', spend: 1200, revenue: 2100, roas: 1.75, trend: 'declining', action: 'Audit' },
];

const MOCK_RECOMMENDATIONS = [
  {
    id: 'r1', type: 'scale', title: 'Scale High-Performing Campaign',
    desc: 'Summer Sale Campaign is achieving 3.54 ROAS with an improving trend.',
    rationale: 'ROAS exceeds the 2.5x profitability threshold. Trend analysis shows decreasing CPA over the last 4 days.',
    impact: { rev: 5520, profit: 3200 }, req: 1300,
    confidence: 'high', status: 'pending'
  },
  {
    id: 'r2', type: 'pause', title: 'Pause Underperforming Ad Sets',
    desc: 'Cold Traffic Test is operating at a severe loss with 0.60 ROAS.',
    rationale: 'Cost of acquisition ($85) is triple the target margin. Continuing spend will compound daily losses.',
    impact: { rev: 0, profit: 3100 }, req: 0,
    confidence: 'high', status: 'pending'
  }
];

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutGrid },
  { id: 'recommendations', label: 'Insights', icon: Sparkles, badge: 2 },
  { id: 'audiences', label: 'Audiences', icon: Users },
  { id: 'creatives', label: 'Creatives', icon: Palette },
  { id: 'financial', label: 'Financials', icon: DollarSign },
];

// --- APPLE-STYLE UI COMPONENTS ---

const Card = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white/70 backdrop-blur-3xl rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] ring-1 ring-black/[0.03] ${noPadding ? '' : 'p-7 md:p-8'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'gray', className = '' }) => {
  const styles = {
    green: 'bg-[#34c759]/10 text-[#248a3d]',
    red: 'bg-[#ff3b30]/10 text-[#c9241b]',
    orange: 'bg-[#ff9500]/10 text-[#b36800]',
    blue: 'bg-[#0071e3]/10 text-[#0052a3]',
    gray: 'bg-gray-100 text-gray-600',
  };
  return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${styles[variant]} ${className}`}>{children}</span>;
};
