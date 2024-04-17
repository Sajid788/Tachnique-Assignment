import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddUser = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedName = `${formData.firstName} ${formData.lastName}`;
      const postData = {
        id: formData.id,
        name: combinedName,
        email: formData.email,
        company: {
          name: formData.department,
        },
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users/",
        postData
      );
      onAdd(response.data);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
      toast.success("User Added Successfully!");
      onCancel();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="backside"></div>
      <div className="add-user">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <input
            type="number"
            name="id"
            placeholder="Enter Id"
            value={formData.id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="firstName"
            placeholder="Enter firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={handleInputChange}
          />
          <button
            style={{
              backgroundColor: "SeaGreen",
              padding: "5px",
              border: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            type="submit"
          >
            Add
          </button>
          <button
            style={{
              marginTop: "20px",
              cursor: "pointer",
              backgroundColor: "Crimson",
              border: "none",
              color: "white",
              fontWeight: "bold",
              padding: "5px",
              borderRadius: "5px"
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
