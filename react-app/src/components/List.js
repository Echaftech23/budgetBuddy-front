import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Edit from "./Edit"; // Import the modal component for editing expense
function Index() {
  const [expense, setexpense] = useState([]);

  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    async function fetchexpense() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User token not found");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setexpense(response.data.expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }

    fetchexpense();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out the deleted Expense from the state
      setexpense((prevexpense) =>
        prevexpense.filter((Expense) => Expense.id !== id)
      );
      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Expense delete failed:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Display error message from the server
      }
    }
  };

  const handleEdit = (Expense) => {
    setEditExpense(Expense);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setexpense((prevexpense) =>
      prevexpense.map((Expense) =>
        Expense.id === updatedExpense.id ? updatedExpense : Expense
      )
    );
  };

  const closeEditModal = () => {
    setEditExpense(null); // Function to close the edit modal
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="card-title">expense</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th className="text-center">Title</th>
                <th className="text-center">Description</th>
                <th className="text-center">Expense</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((Expense) => (
                <tr key={Expense.id}>
                  <td className="text-center">{Expense.id}</td>
                  <td>{Expense.title}</td>
                  <td>{Expense.description}</td>
                  <td className="text-right">{Expense.expense}</td>
                  <td className="text-center">
                    <Link
                      to={"/expenses/" + Expense.id}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <span style={{ marginRight: "8px" }}></span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(Expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editExpense && (
        <Edit ExpenseId={editExpense.id} handleClose={closeEditModal} />
      )}
    </div>
  );
}

export default Index;
