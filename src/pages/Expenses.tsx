
import { useState } from 'react';
import { categories, transactions, getCategoryById } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatUtils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TransactionItem from '@/components/TransactionItem';
import AddExpenseDialog from '@/components/AddExpenseDialog';

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  
  // Filter transactions based on search query and category filter
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || transaction.categoryId === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Calculate total for filtered transactions
  const filteredTotal = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  
  return (
    <div className="pt-16 pb-20 md:pb-16 min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Expenses</h1>
            <p className="text-muted-foreground">Manage and track your spending</p>
          </div>
          <AddExpenseDialog />
        </div>
        
        <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden mb-6 animate-fade-in">
          <div className="p-4 border-b border-border/40">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-border/40 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {filteredTransactions.length} transactions found
            </span>
            <span className="text-sm font-medium">
              Total: {formatCurrency(filteredTotal)}
            </span>
          </div>
          
          <div className="divide-y divide-border/40 max-h-[600px] overflow-y-auto subtle-scroll">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
