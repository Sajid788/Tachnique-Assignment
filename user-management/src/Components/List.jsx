import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdOutlineBrowserUpdated } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AddUser from "./AddUser";

const List = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [showPopup, setshowPopup] = useState(false);

  //Get Request
  const getRequest = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setData(data);
      //   console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  //Edit Function
  const handleUpdate = async (index) => {
    try {
      const updatedData = [...data];
      const currentUserData = updatedData[index];
      const newName = name.trim() !== "" ? name.trim() : currentUserData.name.split(' ')[0];
      const newLastName = lastName.trim() !== "" ? lastName.trim() : currentUserData.name.split(' ')[1];
      const newEmail = email.trim() === "" ? currentUserData.email : email;
      const newDepartment = department.trim() === "" ? currentUserData.company.name : department;
    
      updatedData[index] = {
        ...currentUserData,
        name: newName + " " + newLastName,
        email: newEmail,
        company: { name: newDepartment },
      };
    
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${index + 1}`,
        updatedData[index]
      );
      
      setData(updatedData);
      setEdit(null);
      toast.success("User Updated Successfully!");
    } catch (error) {
      console.log(error);
      setEdit(null);
      toast.error("Something went wrong!");
    }
    
  };

  const handleEdit = (index) => {
    setEdit(index);
  };

  //Delete Function
  const handleDelete = async (index) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${index}`);
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (newUser) => {
    setData([...data, newUser]);
  };

  const handleCancel = () => {
    setshowPopup(false);
  };

  return (
    <>
      <div className="container">
        <div className="pagination-pages">
          <button
            onClick={() => setshowPopup(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "teal",
              borderRadius: "8px",
              border: "none",
              color: "white",
              padding: "5px 18px",
              fontFamily: "bold",
            }}
          >
            Add User{" "}
            <span style={{ marginTop: "5px" }}>
              {" "}
              <FaPlus />
            </span>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User FirstName</th>
              <th>User LastName</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map(function (ele, index) {
                return (
                  <tr key={index}>
                    <td>{ele.id}</td>
                    <td>
                      {edit === index ? (
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          defaultValue={ele.name.split(" ")[0]}
                        />
                      ) : (
                        `${ele.name.split(" ")[0]}`
                      )}
                    </td>
                    <td>
                      {edit === index ? (
                        <input
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          defaultValue={ele.name.split(" ")[1]}
                        />
                      ) : (
                        `${ele.name.split(" ")[1]}`
                      )}
                    </td>
                    <td>
                      {edit === index ? (
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          defaultValue={ele.email}
                        />
                      ) : (
                        `${ele.email}`
                      )}
                    </td>
                    <td>
                      {edit === index ? (
                        <input
                          onChange={(e) => setDepartment(e.target.value)}
                          type="text"
                          defaultValue={ele.company.name}
                        />
                      ) : (
                        `${ele.company.name}`
                      )}
                    </td>
                    <td className="actions-btn">
                      {edit === index ? (
                        <button
                          style={{
                            backgroundColor: "SeaGreen",
                            fontWeight: "bold",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleUpdate(index)}
                        >
                          Update{" "}
                          <span>
                            <MdOutlineBrowserUpdated />
                          </span>
                        </button>
                      ) : (
                        <button
                          style={{
                            backgroundColor: "SeaGreen",
                            fontWeight: "bold",
                            color: "white",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleEdit(index)}
                        >
                          Edit{" "}
                          <span>
                            {" "}
                            <MdEdit />
                          </span>
                        </button>
                      )}
                      <button
                        style={{
                          backgroundColor: "Crimson",
                          fontWeight: "bold",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                        <span>
                          <MdDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Toaster />
        {showPopup && <AddUser onAdd={handleAdd} onCancel={handleCancel} />}
        <div className="pagination-container">
            <button
              className="pagination-btn"
              disabled={page == 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span style={{ fontFamily: "bold" }}>Page: {page}</span>
            <button
              className="pagination-btn"
              disabled={page == 2}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
      </div>
    </>
  );
};

export default List;
