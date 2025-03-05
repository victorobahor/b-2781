
export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  description: string;
  categoryId: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  period: 'monthly' | 'weekly';
};

export const categories: Category[] = [
  { id: 'food', name: 'Food & Dining', color: '#3B82F6', icon: 'utensils' },
  { id: 'shopping', name: 'Shopping', color: '#10B981', icon: 'shopping-bag' },
  { id: 'housing', name: 'Housing', color: '#6366F1', icon: 'home' },
  { id: 'transportation', name: 'Transportation', color: '#F59E0B', icon: 'car' },
  { id: 'entertainment', name: 'Entertainment', color: '#EC4899', icon: 'film' },
  { id: 'utilities', name: 'Utilities', color: '#8B5CF6', icon: 'bolt' },
  { id: 'healthcare', name: 'Healthcare', color: '#EF4444', icon: 'heart-pulse' },
  { id: 'personal', name: 'Personal Care', color: '#14B8A6', icon: 'spa' },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    date: new Date(2023, 6, 1),
    amount: 85.75,
    description: 'Grocery shopping',
    categoryId: 'food',
  },
  {
    id: '2',
    date: new Date(2023, 6, 2),
    amount: 9.99,
    description: 'Movie streaming subscription',
    categoryId: 'entertainment',
  },
  {
    id: '3',
    date: new Date(2023, 6, 3),
    amount: 1250.00,
    description: 'Monthly rent',
    categoryId: 'housing',
  },
  {
    id: '4',
    date: new Date(2023, 6, 4),
    amount: 45.50,
    description: 'Gas station fill-up',
    categoryId: 'transportation',
  },
  {
    id: '5',
    date: new Date(2023, 6, 5),
    amount: 120.80,
    description: 'Electricity bill',
    categoryId: 'utilities',
  },
  {
    id: '6',
    date: new Date(2023, 6, 6),
    amount: 65.00,
    description: 'Doctor visit copay',
    categoryId: 'healthcare',
  },
  {
    id: '7',
    date: new Date(2023, 6, 7),
    amount: 129.99,
    description: 'New shoes',
    categoryId: 'shopping',
  },
  {
    id: '8',
    date: new Date(2023, 6, 8),
    amount: 35.00,
    description: 'Haircut',
    categoryId: 'personal',
  },
  {
    id: '9',
    date: new Date(2023, 6, 9),
    amount: 22.50,
    description: 'Lunch with friends',
    categoryId: 'food',
  },
  {
    id: '10',
    date: new Date(2023, 6, 10),
    amount: 89.99,
    description: 'Concert tickets',
    categoryId: 'entertainment',
  },
  {
    id: '11',
    date: new Date(2023, 6, 11),
    amount: 15.00,
    description: 'Parking fee',
    categoryId: 'transportation',
  },
  {
    id: '12',
    date: new Date(2023, 6, 12),
    amount: 55.75,
    description: 'Water bill',
    categoryId: 'utilities',
  },
];

export const budgets: Budget[] = [
  {
    id: '1',
    categoryId: 'food',
    amount: 500,
    period: 'monthly',
  },
  {
    id: '2',
    categoryId: 'entertainment',
    amount: 200,
    period: 'monthly',
  },
  {
    id: '3',
    categoryId: 'shopping',
    amount: 300,
    period: 'monthly',
  },
  {
    id: '4',
    categoryId: 'transportation',
    amount: 250,
    period: 'monthly',
  },
  {
    id: '5',
    categoryId: 'utilities',
    amount: 350,
    period: 'monthly',
  },
  {
    id: '6',
    categoryId: 'healthcare',
    amount: 200,
    period: 'monthly',
  },
  {
    id: '7',
    categoryId: 'housing',
    amount: 1500,
    period: 'monthly',
  },
  {
    id: '8',
    categoryId: 'personal',
    amount: 150,
    period: 'monthly',
  },
];

// Helper functions to work with the mock data
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getSpendingByCategory = (): { categoryId: string; total: number }[] => {
  const spending: { [key: string]: number } = {};
  
  transactions.forEach(transaction => {
    if (!spending[transaction.categoryId]) {
      spending[transaction.categoryId] = 0;
    }
    spending[transaction.categoryId] += transaction.amount;
  });
  
  return Object.keys(spending).map(categoryId => ({
    categoryId,
    total: spending[categoryId]
  }));
};

export const getTotalSpending = (): number => {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalBudget = (): number => {
  return budgets.reduce((sum, budget) => sum + budget.amount, 0);
};

export const getBudgetVsActual = (): { categoryId: string; budgeted: number; actual: number }[] => {
  const spending: { [key: string]: number } = {};
  
  transactions.forEach(transaction => {
    if (!spending[transaction.categoryId]) {
      spending[transaction.categoryId] = 0;
    }
    spending[transaction.categoryId] += transaction.amount;
  });
  
  return budgets.map(budget => ({
    categoryId: budget.categoryId,
    budgeted: budget.amount,
    actual: spending[budget.categoryId] || 0
  }));
};
