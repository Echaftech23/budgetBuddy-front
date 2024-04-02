import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  // console.log(id);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const result = await axios.get("http://127.0.0.1:8000/api/users/" + id);
      console.log(result.data.users);
      setUser(result.data.users);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const clickToBackHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <h1 className="text-2xl font-bold mb-2">User Details</h1>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">S No.</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 flex justify-center">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={clickToBackHandler}>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
