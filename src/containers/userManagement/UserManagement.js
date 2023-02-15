import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import EditUserPopupForm from './EditUserPopupForm';
import AddUserPopupForm from './AddUserPopupForm';




const UserManagement = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  const [openPopup, setOpenPopup] = useState(false);
  const [openAddUserPopup, setOpenAddUserPopup] = useState(false);


const [selectedUser, setSelectedUser] = useState(null); // new state variable
  

    const getUsers = e => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/user/`, {
        headers: {
          'Authorization': 'Bearer ' +  localStorage.getItem("token")
        }
      })
      .then((res) => {
        setData(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
    }

    useEffect(() => {
      getUsers()
    }, []);


const handleEditUser = (user) => {
  setSelectedUser(user);
};

const [reloadTable, setReloadTable] = useState(0);


const handleDeleteUser =async (userId) => {

  
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${userId}/`,
    
  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +   localStorage.getItem("token")
}}
)    
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

  const newData = data.filter(item => item.id !== userId);
  setData(newData);
  setSelectedUser(null);
};

  
    const displayData = data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedRole === '' || item.roles === selectedRole)
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.roles}</td>
         <td>
           <button onClick={() =>  {handleEditUser(item); handleOpenEditUser();}}>Edit</button>
         </td>
         <td>
           <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
         </td>
      </tr>
    ));

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const handleRoleFilterChange = event => {
    setSelectedRole(event.target.value);
    setPageNumber(0);
  };


const handleUpdateUser = async (user) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/${user.id}/`, user,
    
  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +   localStorage.getItem("token")
}}

)    
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });



  const updatedUser = response.data;
  const index = data.findIndex((u) => u.id === updatedUser.id);
  const newData = [...data];
  newData[index] = updatedUser;
  setData(newData);
  setSelectedUser(null);
};

const handleCancelEditUser = () => {
  setSelectedUser(null);
};

const handleOpenEditUser = () => {
  setOpenPopup(true);
};

const handleOpenAddUser = () => {
  setOpenAddUserPopup(true);
};
const handleCloseAddUser = () => {
  setOpenAddUserPopup(false);
};
    

  return (
    <>

        <div>
                  {selectedUser && (
                    <EditUserPopupForm
                      user={selectedUser}
                      onUpdateUser={handleUpdateUser}
                      onCancel={handleCancelEditUser}
                      onOpen = {openPopup}
                    />
                  )}         
          </div>
          <div>
                  {openAddUserPopup && (
                    <AddUserPopupForm                    
                      onCancel={handleCloseAddUser}
                      onOpen = {openAddUserPopup}
                    />
                  )}         
          </div>

      <div className="table-controls">
        <div className="search-input">
        <button onClick={() => handleOpenAddUser()}>Add User</button>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="role-filter">
          <label htmlFor="role-filter">Filter by role:</label>
          <select id="role-filter" value={selectedRole} onChange={handleRoleFilterChange}>
            <option value="">All</option>
            <option value="is_admin">Admin</option>
            <option value="is_leaker">Leaker</option>
            <option value="is_client">Client</option>
          </select>
        </div>
      </div>



      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {displayData}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />



    </>
  );
}

export default UserManagement


