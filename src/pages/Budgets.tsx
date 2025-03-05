
import { 
  budgets, 
  categories, 
  getCategoryById, 
  getSpendingByCategory,
  getBudgetVsActual
} from '@/data/mockData';
import { formatCurrency, calculatePercentage } from '@/utils/formatUtils';
import DashboardCard from '@/components/DashboardCard';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';

const Budgets = () => {
  const budgetVsActual = getBudgetVsActual();
  
  return (
    <div className="pt-16 pb-20 md:pb-16 min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Budget Goals</h1>
            <p className="text-muted-foreground">Track your spending against budget targets</p>
          </div>
          <Button variant="outline">Edit Budgets</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetVsActual.map((budget) => {
            const category = getCategoryById(budget.categoryId);
            const percentage = calculatePercentage(budget.actual, budget.budgeted);
            
            // Determine status color based on percentage
            const getStatusColor = () => {
              if (percentage > 100) return 'bg-destructive';
              if (percentage > 85) return 'bg-yellow-500';
              return category?.color || 'bg-primary';
            };
            
            return (
              <DashboardCard
                key={budget.categoryId}
                title={category?.name || 'Unknown Category'}
                subtitle={`${formatCurrency(budget.actual)} of ${formatCurrency(budget.budgeted)}`}
                className="animate-fade-in"
              >
                <div className="space-y-4">
                  <ProgressBar
                    value={budget.actual}
                    max={budget.budgeted}
                    color={getStatusColor()}
                    showLabel
                  />
                  
                  <div className="text-xs text-muted-foreground">
                    {percentage >= 100 ? (
                      <span className="text-destructive font-medium">
                        Over budget by {formatCurrency(budget.actual - budget.budgeted)}
                      </span>
                    ) : (
                      <span>
                        {formatCurrency(budget.budgeted - budget.actual)} remaining
                      </span>
                    )}
                  </div>
                </div>
              </DashboardCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
