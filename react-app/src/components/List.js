import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [userData, setUSerData] = useState([]);
  const [info, setInfo] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/api/users");
      setInfo(result.data.results);
      setUSerData(result.data.results.data);
    } catch (err) {
      console.log("somthing Wrong");
    }
  };

  const fetchProducts = (url) => {
    axios
      .get(url)
      .then((data) => {
        setUSerData(data.data.results.data);
        setInfo(data.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    fetchProducts(info.next_page_url);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    fetchProducts(info.prev_page_url);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);
    const newUserData = userData.filter((item) => {
      return item.id !== id;
    });
    setUSerData(newUserData);
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-lg font-bold mb-2">User Details</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, i) => {
            return (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name} </td>
                <td className="border px-4 py-2">{user.email} </td>
                <td className="border px-4 py-2">
                  {user.budget ? user.budget : "000"}{" "}
                </td>
                <td className="border flex px-4 py-2">
                  <NavLink
                    to={`/view/${user.id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    View
                  </NavLink>
                  <NavLink
                    to={`/edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                  >
                    Edit
                  </NavLink>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className="flex justify-center mt-5">
        {info.prev_page_url ? (
          <li className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
          </li>
        ) : null}

        {info.next_page_url ? (
          <li className="mx-[1px]">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              onClick={handleNextPage}
            >
              Next
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default List;
