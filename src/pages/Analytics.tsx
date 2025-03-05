
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  categories, 
  getSpendingByCategory, 
  getCategoryById,
  transactions
} from '@/data/mockData';
import { formatCurrency, calculatePercentage } from '@/utils/formatUtils';
import DashboardCard from '@/components/DashboardCard';

const Analytics = () => {
  const spendingByCategory = getSpendingByCategory();
  
  // Format data for pie chart
  const pieChartData = spendingByCategory.map((item) => {
    const category = getCategoryById(item.categoryId);
    return {
      name: category?.name,
      value: item.total,
      color: category?.color,
    };
  });
  
  // Format data for bar chart
  const barChartData = spendingByCategory.map((item) => {
    const category = getCategoryById(item.categoryId);
    return {
      name: category?.name,
      amount: item.total,
      color: category?.color,
    };
  });
  
  // Create mock data for trend over time
  // In a real app, this would come from actual time-based data
  const mockTrendData = [
    { month: 'Jan', amount: 2100 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2200 },
    { month: 'Apr', amount: 2400 },
    { month: 'May', amount: 1900 },
    { month: 'Jun', amount: 2350 },
    { month: 'Jul', amount: 2500 },
  ];
  
  return (
    <div className="pt-16 pb-20 md:pb-16 min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Spending Analytics</h1>
          <p className="text-muted-foreground">Visualize your spending patterns</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Spending Distribution */}
          <DashboardCard 
            title="Spending Distribution" 
            subtitle="By Category"
            className="animate-fade-in"
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)} 
                    labelFormatter={(_, payload) => payload[0]?.name || ''}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center text-xs">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          {/* Spending by Category */}
          <DashboardCard 
            title="Spending by Category" 
            subtitle="Bar Chart"
            className="animate-fade-in"
          >
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar 
                    dataKey="amount" 
                    radius={[0, 4, 4, 0]}
                  >
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>
        
        {/* Spending Trend */}
        <DashboardCard 
          title="Monthly Spending Trend" 
          subtitle="Past 7 months"
          className="animate-fade-in"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#3B82F6", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Analytics;
