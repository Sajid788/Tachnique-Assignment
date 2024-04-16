import React,{ useState, useEffect } from 'react';
import axios from "axios";

const List = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [edit, setEdit] = useState(null);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [showPopup, setshowPopup] = useState(false);

    const getRequest = async () => {
        try {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
          setData(data);
        //   console.log(data)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getRequest();
      }, []);

  return (
    <>
      <div className='container'>
        <div className='pagination-pages'>
          <button >
            Add User <span style={{ marginTop: "5px" }}></span>
          </button>
          <div>
            <button className='pagination-btn'>Prev</button>
            <span>Page: </span>
            <button className='pagination-btn'>Next</button>
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
          {data?.slice((page - 1) * 10, (page - 1) * 10 + 10).map(function (ele, index) {
              return <tr key={index}>
                <td>{ele.id}</td>
                <td>{edit === index ? <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={ele.name.split(' ')[0]} /> : `${ele.name.split(' ')[0]}`}</td>
                <td>{edit === index ? <input onChange={(e) => setLastName(e.target.value)} type="text" defaultValue={ele.name.split(' ')[1]} /> : `${ele.name.split(' ')[1]}`}</td>
                <td>{edit === index ? <input onChange={(e) => setEmail(e.target.value)} type="email" defaultValue={ele.email} /> : `${ele.email}`}</td>
                <td>{edit === index ? <input onChange={(e) => setDepartment(e.target.value)} type="text" defaultValue={ele.company.name} /> : `${ele.company.name}`}</td>
                <td className="actions-btn">
                  {edit === index ? (
                    <button>Update <span></span></button>
                  ) : (
                    <button >Edit <span></span></button>
                  )}
                  <button>Delete<span></span></button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
