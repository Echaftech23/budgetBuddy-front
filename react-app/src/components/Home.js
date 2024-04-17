//C:\react-js\myreactdev\src\components\Home.js
import React, { useState } from "react";
import List from "./List";
import axios from "axios";

const Home = () => {
  const [expenseField, setexpenseField] = useState({
    title: "",
    description: "",
    password: "",
    expense: "",
  });

  const changeExpenseFieldHandler = (e) => {
    setexpenseField({
      ...expenseField,
      [e.target.name]: e.target.value,
    });
    //console.log(expenseField);
  };
  const [loading, setLoading] = useState();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User token not found");
      }

      const responce = await axios.post(
        "http://127.0.0.1:8000/api/expenses",
        expenseField,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(responce);
      setLoading(true);
    } catch (err) {
      console.log("Something Wrong");
    }
  };
  if (loading) {
    return <Home />;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card mt-4">
            <div className="card-header">
              <h4 className="card-title">Add Expense</h4>
            </div>
            <form className="m-4 text-start">
              <div className="mb-3 text-start mt-3">
                <label className="form-label">Expense Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Expense Name"
                  name="title"
                  onChange={(e) => changeExpenseFieldHandler(e)}
                />
              </div>
              <div className="mb-3 text-start mt-3">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Enter description"
                  name="description"
                  onChange={(e) => changeExpenseFieldHandler(e)}
                  required
                />
              </div>
              <div className="mb-3 text-start mt-3">
                <label className="form-label">Expense:</label>
                <input
                  type="text"
                  className="form-control"
                  id="expense"
                  placeholder="Enter Expense"
                  name="expense"
                  onChange={(e) => changeExpenseFieldHandler(e)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn text-start btn-primary"
                onClick={(e) => onSubmitChange(e)}
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
