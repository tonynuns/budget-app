import { useContext } from "react";
import { BudgetsContext } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

function TotalBudgetCard() {
	const { expenses, budgets } = useContext(BudgetsContext);
	const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
	const max = budgets.reduce((total, budget) => total + budget.max, 0);
	if (max === 0) return null;

	return <BudgetCard amount={amount} name="Total" gray max={max} hideButton />;
}

export default TotalBudgetCard;
