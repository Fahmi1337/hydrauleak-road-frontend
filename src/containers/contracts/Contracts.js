import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import EditContractPopupForm from './EditContractPopupForm';
import AddContractPopupForm from './AddContractPopupForm';
import ViewContractPopup from './ViewContractPopup'
import AddMapContract from './AddMapContract'
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './contracts.css'

const Contract = (props) => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;

  const [openPopup, setOpenPopup] = useState(false);
  const [openMapPopup, setOpenMapPopup] = useState(false);
  const [openAddContractPopup, setOpenAddContractPopup] = useState(false);
  const [openViewContractPopup, setOpenViewContractPopup] = useState(false);
  const [openAddMapContractPopup, setOpenAddMapContractPopup] = useState(false);

const [selectedContract, setSelectedContract] = useState(null); // new state variable
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const style = {
  zoom:'83.5%',
  zIndex: 999,
};

    const getContracts = e => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/contracts/`, {
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
      getContracts()
    }, []);


const handleEditContract = (contract) => {
  setSelectedContract(contract);
};

// handle Delete contract
const handleDeleteContract =async (contractId) => {

  const confirmation = window.confirm('Are you sure you want to delete this Contract?');

  if (!confirmation) {
    return;
  }
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/contracts/${contractId}/`,
    
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

  const newData = data.filter(item => item.id !== contractId);
  setData(newData);
  setSelectedContract(null);
};

  


// display data table

    const displayData = [...data].reverse()
    .filter(item => item.contract_title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedStatus === '' || item.contract_status === selectedStatus)
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.contract_title}</td>
        <td>{item.contract_date}</td>
        <td>{item.contract_type}</td>
        <td>{item.contract_status}</td>
        <td>{item.is_published}</td>
        <td>
           <button onClick={() => {handleOpenAddMapContract(); setSelectedContract(item);}}>Add Map</button>
         </td>
         <td>
           <button onClick={() => {handleEditContract(item);handleOpenViewContract();}}>Details</button>
         </td>
         <td className='tableEditTd'> 
    <EditIcon onClick={() =>  {handleEditContract(item); handleOpenEditContract();}} />
  
   </td>
   <td className='tableDeleteTd'> 
    <DeleteIcon onClick={() => handleDeleteContract(item.id)}/>
    
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

  const handleStatusFilterChange = event => {
    setSelectedStatus(event.target.value);
    setPageNumber(0);
  };




// Update Contract
const handleUpdateContract = async (contract) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/contracts/${contract.id}/`, contract,
    
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



  const updatedContract = response.data;
  const index = data.findIndex((u) => u.id === updatedContract.id);
  const newData = [...data];
  newData[index] = updatedContract;
  setData(newData);
  setSelectedContract(null);
};


// handle buttons
const handleCancelEditContract = () => {
  setOpenPopup(false);
  setSelectedContract(null);
};

const handleOpenEditContract = () => {
  setOpenPopup(true);
};







const handleOpenAddContract = () => {
  setOpenAddContractPopup(true);
};
const handleCloseAddContract = () => {
  setOpenAddContractPopup(false);
};

const handleOpenViewContract = () => {
  setOpenViewContractPopup(true);
};
const handleCloseViewContract = () => {
  setOpenViewContractPopup(false);
};
const handleCancelAddMapContract = () => {
  setOpenAddMapContractPopup(false);
  setSelectedContract(null);
};
const handleOpenAddMapContract = () => {
  setOpenAddMapContractPopup(true);
};

// console.log("selectedContract",selectedContract )
  return (
    <div className="table_container">

{/* <div>
                  {openAddMapContractPopup && (
                    <AddMapContract
                      contractId={selectedContract}
                    />
                  )}         
          </div> */}
        <Modal
        open={openAddMapContractPopup}
        // onClick={handleClose}
        onClose={props.onCloseAddMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {openAddMapContractPopup && (
                    <AddMapContract
                    handleCancelAddMapContract={handleCancelAddMapContract}
                    selectedContract={selectedContract}
                  />
                  )} 
    
                    
        </Box>
      </Modal>
        <div>
                  {openPopup && (
                    <EditContractPopupForm
                      contract={selectedContract}
                      onUpdateContract={handleUpdateContract}
                      onCancel={handleCancelEditContract}
                      onOpen = {openPopup}
                      getContracts = {getContracts}
                    />
                  )}         
          </div>
          <div>
                  {openAddContractPopup && (
                    <AddContractPopupForm                    
                      onCancel={handleCloseAddContract}
                      onOpen = {openAddContractPopup}
                    />
                  )}         
          </div>

          <div>
                  {openViewContractPopup && (
                    <ViewContractPopup 
                    selectedContract={selectedContract}
                    contractId={selectedContract.id}                 
                      onCancel={handleCloseViewContract}
                      onOpen = {openViewContractPopup}
                    />
                  )}         
          </div>
          <div className="pageTitleContainer">  <h1>Contracts</h1></div>
          <div id="addTableButtonContainer"> <button onClick={() => handleOpenAddContract()}>+ Add Contract</button></div>
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
        <div className="status-filter">
          <label htmlFor="status-filter">Filter by status:</label>
          <select id="status-filter" value={selectedStatus} onChange={handleStatusFilterChange}>
            <option value="">All</option>
            <option value="NotStart">not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
       
      </div>
     


      
      <table>
        
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>date</th>
            <th>Type</th>
            <th>Status</th>
            <th>published</th>
            <th>Add Map</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
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

export default Contract

