// Todo.js
import React from 'react';
const List = () => {
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
