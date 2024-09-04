import { createContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export const BudgetsContext = createContext();

const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

// const useBudgets = () => useContext(BudgetsContext);

const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage("budgets", []);
	const [expenses, setExpenses] = useLocalStorage("expenses", []);

	const getBudgetExpenses = (budgetId) => {
		return expenses.filter((expense) => expense.budgetId === budgetId);
	};
	const addBudget = ({ name, max }) => {
		setBudgets((prevBudgets) => {
			if (prevBudgets.find((budget) => budget.name === name)) {
				return prevBudgets;
			}
			return [...prevBudgets, { id: uuidV4(), name, max }];
		});
	};
	const addExpense = ({ description, amount, budgetId }) => {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
		});
	};
	const deleteBudget = ({ id }) => {
		setExpenses((prevExpenses) => {
			return prevExpenses.map((expense) => {
				if (expense.budgetId !== id) return expense;
				return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
			});
		});
		setBudgets((prevBudgets) => {
			return prevBudgets.filter((budget) => budget.id !== id);
		});
	};
	const deleteExpense = ({ id }) => {
		setExpenses((prevExpenses) => {
			return prevExpenses.filter((expense) => expense.id !== id);
		});
	};

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addBudget,
				addExpense,
				deleteBudget,
				deleteExpense,
			}}>
			{children}
		</BudgetsContext.Provider>
	);
};

export { BudgetsProvider, UNCATEGORIZED_BUDGET_ID };
