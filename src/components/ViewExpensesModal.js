import { useContext } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { BudgetsContext, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";
import { currencyFormatter } from "../utils";

function ViewExpensesModal({ budgetId, handleClose }) {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useContext(BudgetsContext);
	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId
			? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
			: budgets.find((budget) => budget.id === budgetId);
	const expenses = getBudgetExpenses(budgetId);

	return (
		<Modal show={budgetId !== undefined} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					<Stack direction="horizontal" gap="2">
						<div>Expenses - {budget?.name}</div>
						{budgetId !== UNCATEGORIZED_BUDGET_ID && (
							<Button
								onClick={() => {
									deleteBudget(budget);
									handleClose();
								}}
								variant="outline-danger">
								Delete
							</Button>
						)}
					</Stack>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Stack direction="vertical" gap="3">
					{expenses.map((expense) => (
						<Stack direction="horizontal" gap="2" key={expense.id}>
							<div className="me-auto fs-4">{expense.description}</div>
							<div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
							<Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
								&times;
							</Button>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	);
}

export default ViewExpensesModal;
