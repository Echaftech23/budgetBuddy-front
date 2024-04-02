import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/");
  };

  const [userField, setUserField] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/users/" + id);
      // console.log(result.data.users);
      setUserField(result.data.users);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const changeUserFieldHandler = (e) => {
    setUserField({
      ...userField,
      [e.target.name]: e.target.value,
    });
    console.log(userField);
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:8000/api/usersupdate/" + id, userField);
      navigate("/");
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-2">Edit Form</h1>
      <form>
        <div className="mb-3 mt-3">
          <label className="block text-gray-700 text-sm font-bold mb-2"> ID:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            placeholder="Enter Your Full Name"
            name="id"
            value={id}
            disabled
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="block text-gray-700 text-sm font-bold mb-2"> Full Name:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Your Full Name"
            name="name"
            value={userField.name}
            onChange={(e) => changeUserFieldHandler(e)}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Enter email"
            name="email"
            value={userField.email}
            onChange={(e) => changeUserFieldHandler(e)}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="Enter password"
            name="password"
            value={userField.password}
            onChange={(e) => changeUserFieldHandler(e)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => onSubmitChange(e)}
        >
          Update
        </button>
      </form>
      <div className="container mx-auto px-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clickToBackHandler}>
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default Edit;
