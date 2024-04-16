import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
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
    const combinedName = name + " " + lastName;
    try {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        name: combinedName || data[index].name,
        email: email || data[index].email,
        company: { name: department || data[index].company.name },
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
    toast.success("Data Added Successfully!");
  };

  const handleCancel = () => {
    setshowPopup(false);
  };

  return (
    <>
      <div className="container">
        <div className="pagination-pages">
          <button onClick={() => setshowPopup(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(76,182,57)", border: "none" }}>
            Add User <span style={{ marginTop: "5px" }}></span>
          </button>
          <div>
            <button className="pagination-btn" disabled={page == 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span>Page: {page}</span>
            <button className="pagination-btn" disabled={page == 2} onClick={() => setPage(page + 1)}>Next</button>
          </div>
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
                        <button onClick={() => handleUpdate(index)}>
                          Update <span></span>
                        </button>
                      ) : (
                        <button onClick={() => handleEdit(index)}>
                          Edit <span></span>
                        </button>
                      )}
                      <button onClick={() => handleDelete(index)}>
                        Delete<span></span>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {showPopup && <AddUser onAdd={handleAdd} onCancel={handleCancel} />}
        
      </div>
    </>
  );
};

export default List;



