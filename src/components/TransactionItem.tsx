
import { Transaction, getCategoryById } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils/formatUtils';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const category = getCategoryById(transaction.categoryId);
  
  return (
    <div className="flex items-center p-3 hover:bg-muted/20 rounded-lg transition-colors group animate-slide-in">
      <div className="flex-shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${category?.color}20` }}
        >
          <div className="text-lg" style={{ color: category?.color }}>
            💰
          </div>
        </div>
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {transaction.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(transaction.date)} • {category?.name}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-medium text-foreground">
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          View Details
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
