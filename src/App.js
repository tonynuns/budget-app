import { Button, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { BudgetsContext, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetContext";
import Container from "react-bootstrap/Container";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import "./App.scss";

function App() {
	const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
	const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
	const { budgets, getBudgetExpenses } = useContext(BudgetsContext);

	const openAddExpenseModal = (budgetId) => {
		setShowAddExpenseModal(true);
		setAddExpenseModalBudgetId(budgetId);
	};

	return (
		<>
			<Container className="my-4">
				<Stack direction="horizontal" gap="2" className="mb-4">
					<h1 className="me-auto">Budgets</h1>
					<Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
						Add Budget
					</Button>
					<Button variant="outline-primary" onClick={openAddExpenseModal}>
						Add Expense
					</Button>
				</Stack>
				<div className="grid-display">
					{budgets.map((budget) => {
						const amount = getBudgetExpenses(budget.id).reduce(
							(total, expense) => total + expense.amount,
							0
						);
						return (
							<BudgetCard
								key={budget.id}
								name={budget.name}
								amount={amount}
								max={budget.max}
								onAddExpenseClick={() => openAddExpenseModal(budget.id)}
								onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
							/>
						);
					})}
					<UncategorizedBudgetCard
						onAddExpenseClick={() => openAddExpenseModal()}
						onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
					/>
					<TotalBudgetCard />
				</div>
			</Container>
			<AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
			<AddExpenseModal
				show={showAddExpenseModal}
				defaultBudgetId={addExpenseModalBudgetId}
				handleClose={() => setShowAddExpenseModal(false)}
			/>
			<ViewExpensesModal
				budgetId={viewExpensesModalBudgetId}
				handleClose={() => setViewExpensesModalBudgetId()}
			/>
		</>
	);
}

export default App;
