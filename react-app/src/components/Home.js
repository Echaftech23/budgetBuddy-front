import React, { useState } from "react";
import List from "./List";
import axios from "axios";

const Home = () => {
  const [userField, setUserField] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
    //console.log(userField);
  };
  const [loading, setLoading] = useState();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://127.0.0.1:8000/api/addnew",
        userField
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
    <div className="container mx-auto px-4">
      {/* <h2 className="w-full flex justify-center p-3">
        React JS Laravel 10 REST API CRUD (Create, Read, Update and Delete) |
        Axios Mysql
      </h2> */}
      <div className="flex flex-wrap -mx-4 mt-10">
        <div className="w-full md:w-1/3 px-4">
          <h3 className="font-bold text-[25px]">Add Your Detail</h3>
          <form className="mb-5">
            <div className="mb-3 mt-3">
              <label className="block text-left text-gray-700 text-sm font-bold mb-2">
                {" "}
                Full Name:
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="Enter Your Full Name"
                name="name"
                onChange={(e) => changeUserFieldHandler(e)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block text-left text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => changeUserFieldHandler(e)}
                required
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block text-left text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => changeUserFieldHandler(e)}
                required
              />
            </div>

            <div className="w-full flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={(e) => onSubmitChange(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-2/3 px-4">
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
