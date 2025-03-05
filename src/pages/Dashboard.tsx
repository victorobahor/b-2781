
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  categories, 
  transactions, 
  getSpendingByCategory, 
  getTotalSpending,
  getTotalBudget,
  getCategoryById
} from '@/data/mockData';
import { formatCurrency, calculatePercentage } from '@/utils/formatUtils';
import DashboardCard from '@/components/DashboardCard';
import ProgressBar from '@/components/ProgressBar';
import TransactionItem from '@/components/TransactionItem';
import AddExpenseDialog from '@/components/AddExpenseDialog';

const Dashboard = () => {
  const totalSpending = getTotalSpending();
  const totalBudget = getTotalBudget();
  const spendingByCategory = getSpendingByCategory();
  const recentTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  
  // For the pie chart
  const pieChartData = spendingByCategory.map(item => {
    const category = getCategoryById(item.categoryId);
    return {
      name: category?.name,
      value: item.total,
      color: category?.color,
    };
  });
  
  // Calculate budget progress
  const budgetPercentage = calculatePercentage(totalSpending, totalBudget);
  const budgetStatus = budgetPercentage > 90 ? 'danger' : budgetPercentage > 75 ? 'warning' : 'success';
  
  // Top spending categories
  const topCategories = [...spendingByCategory]
    .sort((a, b) => b.total - a.total)
    .slice(0, 4)
    .map(item => ({
      ...item,
      percentage: calculatePercentage(item.total, totalSpending),
      category: getCategoryById(item.categoryId),
    }));
  
  useEffect(() => {
    // This would be a good place to fetch data from an API
    console.log('Dashboard mounted');
  }, []);
  
  return (
    <div className="pt-16 pb-20 md:pb-16 min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Financial Overview</h1>
            <p className="text-muted-foreground">Your spending at a glance</p>
          </div>
          <AddExpenseDialog />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Overview Card */}
          <DashboardCard 
            title="Monthly Overview" 
            subtitle="Budget vs. Spending"
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{formatCurrency(totalSpending)}</div>
              <div className="text-sm text-muted-foreground mb-4">
                of {formatCurrency(totalBudget)} budget
              </div>
              <ProgressBar 
                value={totalSpending} 
                max={totalBudget} 
                showLabel 
                className="mt-2 mb-4" 
                color={
                  budgetStatus === 'danger' ? 'bg-destructive' :
                  budgetStatus === 'warning' ? 'bg-yellow-500' :
                  'bg-primary'
                }
              />
              <div className="text-xs text-muted-foreground">
                {budgetPercentage}% of your monthly budget used
              </div>
            </div>
          </DashboardCard>
          
          {/* Spending Breakdown Card */}
          <DashboardCard 
            title="Spending Breakdown" 
            subtitle="By Category"
            action={
              <Link to="/analytics" className="text-xs text-primary hover:underline">
                View All
              </Link>
            }
          >
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
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
          </DashboardCard>
          
          {/* Top Categories Card */}
          <DashboardCard 
            title="Top Categories" 
            subtitle="Where you spend the most"
          >
            <div className="space-y-3">
              {topCategories.map((item) => (
                <div key={item.categoryId} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.category?.name}</span>
                    <span className="text-sm font-medium">{formatCurrency(item.total)}</span>
                  </div>
                  <ProgressBar
                    value={item.percentage}
                    max={100}
                    color={item.category?.color}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </DashboardCard>
          
          {/* Recent Transactions Card */}
          <DashboardCard 
            title="Recent Transactions" 
            subtitle="Last 5 transactions"
            className="md:col-span-2 lg:col-span-3"
            action={
              <Link to="/expenses" className="text-xs text-primary hover:underline">
                View All
              </Link>
            }
          >
            <div className="divide-y divide-border/40">
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
