import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart as PieIcon, BarChart3, Info } from 'lucide-react';

const CATEGORY_COLORS = {
  idol_purchase: '#F38B2B', // Saffron
  decoration: '#E5BF00',   // Gold
  prasad: '#2D5A4C',       // Emerald/Sage
  logistics: '#800020',    // Maroon
  miscellaneous: '#62A271',// Light Sage
};

const CATEGORY_NAMES = {
  idol_purchase: 'Idol Purchase',
  decoration: 'Mandap Decoration',
  prasad: 'Prasad & Sweets',
  logistics: 'Logistics & Audio',
  miscellaneous: 'Miscellaneous',
};

export const FundSummary = ({ summary, expenses, contributions }) => {
  const categoryBreakdown = summary?.categoryBreakdown || [];

  // Format data for Pie Chart
  const pieData = categoryBreakdown.map((item) => ({
    name: CATEGORY_NAMES[item._id] || item._id,
    value: item.total,
    color: CATEGORY_COLORS[item._id] || '#F38B2B',
  }));

  // Format daily contribution bar chart data
  const dateMap = {};
  (contributions || []).forEach((c) => {
    const formattedDate = new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    dateMap[formattedDate] = (dateMap[formattedDate] || 0) + c.amount;
  });

  const barData = Object.keys(dateMap)
    .slice(-7)
    .map((dateStr) => ({
      date: dateStr,
      amount: dateMap[dateStr],
    }));

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-cream-50 flex items-center">
            <PieIcon className="w-6 h-6 mr-2.5 text-saffron-600 dark:text-gold-400" />
            Financial Breakdown & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Visual breakdown of how community funds are allocated and received.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Expense Categories Pie Chart */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-cream-100 flex items-center mb-4">
            <PieIcon className="w-5 h-5 mr-2 text-saffron-500" />
            Expense Allocation by Category
          </h3>
          {pieData.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: '#FAF6F0',
                      borderColor: '#F38B2B',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-xs text-stone-400">
              No expense categories recorded yet
            </div>
          )}
        </div>

        {/* Chart 2: Daily Contributions Trend */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-cream-100 flex items-center mb-4">
            <BarChart3 className="w-5 h-5 mr-2 text-gold-500" />
            Daily Fund Collection Activity
          </h3>
          {barData.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Collected']}
                    contentStyle={{
                      backgroundColor: '#FAF6F0',
                      borderColor: '#E5BF00',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Bar dataKey="amount" fill="#F38B2B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-xs text-stone-400">
              No contribution trend data available
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
