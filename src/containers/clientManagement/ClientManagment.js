import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import EditClientPopupForm from './EditClientPopupForm';
import AddClientPopupForm from './AddClientPopupForm';
import ViewClientPopupForm from './ViewClientPopupForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const ClientManagement = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  const [openPopup, setOpenPopup] = useState(false);
  const [openAddClientPopup, setOpenAddClientPopup] = useState(false);
  const [openViewClientPopup, setOpenViewClientPopup] = useState(false);

const [selectedClient, setSelectedClient] = useState(null); // new state variable
const [me, setMe] = useState([]);




useEffect(() => {
    getMe() 
  }, []);


   const getMe = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/me`,
          {
            method: "GET",
    
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((response) => response.json())
          .then((data) => setMe(data));
    return response;
      } catch (error) {
        console.log(error);
      }
    };


    const getClients = e => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/clients/`, {
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

    const handleOpenClientViewPopup = () => {
      setOpenViewClientPopup(true);
    };
    const handleRowClick = (item) => {
      setSelectedClient(item);
      handleOpenClientViewPopup();
    };
   



const handleEditClient = (client) => {
  setSelectedClient(client);
};

// handle Delete client
const handleDeleteClient =async (clientId) => {
  const confirmation = window.confirm('Are you sure you want to delete this Client data?');

  if (!confirmation) {
    return;
  }
  
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/clients/${clientId}/`,
    
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

  const newData = data.filter(item => item.id !== clientId);
  setData(newData);
  setSelectedClient(null);
  getClients();
};

  


// display data table

    const displayData = [...data].reverse()
    .filter(item => item.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedRole === '' || item.roles === selectedRole)
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.user.name}</td>        
        <td>{item.user.phone}</td>
        <td>{item.description}</td>
        <td>{item.inscription_date}</td>



        {me.roles==="is_admin" && (
    <td ><button onClick={() => handleRowClick(item)}>Details</button></td>
    )} 
       {me.roles==="is_admin" && (
   <td className='tableEditTd'> 
   <EditIcon onClick={() =>  {handleEditClient(item); handleOpenEditClient();}} />
 
  </td>
    )} 
       {me.roles==="is_admin" && (
     <td className='tableDeleteTd'> 
     <DeleteIcon onClick={() => handleDeleteClient(item.id)}/>
     
    </td>
    )} 

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

  useEffect(() => {
    getClients()
  }, []);


// Update Client
const handleUpdateClient = async (client) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client/${client.id}/`, client,
    
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



  const updatedClient = response.data;
  const index = data.findIndex((u) => u.id === updatedClient.id);
  const newData = [...data];
  newData[index] = updatedClient;
  setData(newData);
  setSelectedClient(null);
  getClients()
};


// handle buttons
const handleCancelEditClient = () => {
  setSelectedClient(null);
};

const handleOpenEditClient = () => {
  setOpenPopup(true);
};

const handleOpenAddClient = () => {
  setOpenAddClientPopup(true);
};
const handleCloseAddClient = () => {
  setOpenAddClientPopup(false);
};

const handleCloseViewClient = () => {
  setOpenViewClientPopup(false);
};
    
    



  return (
    <div className="table_container">

        <div>

            <div>
                      {openViewClientPopup && (
                        <ViewClientPopupForm                    
                          onClose={handleCloseViewClient}
                          onOpen = {openViewClientPopup}
                          clientId={selectedClient.id}
                        />
                      )}         
              </div>


                  {selectedClient && (
                    <EditClientPopupForm
                      client={selectedClient}
                      onUpdateClient={handleUpdateClient}
                      onCancel={handleCancelEditClient}
                      onOpen = {openPopup}
                      getClients={getClients}
                    />
                  )}         
          </div>
          <div>
                  {openAddClientPopup && (
                    <AddClientPopupForm                    
                      onCancel={handleCloseAddClient}
                      onOpen = {openAddClientPopup}
                      
                    />
                  )}         
          </div>

          <div className="pageTitleContainer">  <h1>Client data Management</h1></div>
       
    
        <div className="search-input">  
        {me.roles==="is_admin" && (
  <div id="addTableButtonContainer">  <button onClick={() => handleOpenAddClient()}>+ Add Client Data</button> </div>
    )}     
      <div className="table-controls">
      
        <div className="search-input">
      
      <label htmlFor="search">Search:</label>
      <input type="search" id="search" value={searchTerm} onChange={handleSearchChange} placeholder="Search..."/>
      <div className="icons-container">
<div className="icon-search"></div>
<div className="icon-close">
  <div className="x-up"></div>
  <div className="x-down"></div>
</div>
</div>
    </div>
        </div>
        
      </div>



      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Inscription Date</th>
            {me.roles==="is_admin" && (
   <th>Details</th>
    )}
      {me.roles==="is_admin" && (
  <th>Edit</th>
    )}
      {me.roles==="is_admin" && (
  <th>Delete</th>
    )}
          
          </tr>
        </thead>
        <tbody>
          {displayData}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />



    </div>
  );
}

export default ClientManagement