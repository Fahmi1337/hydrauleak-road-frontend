import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import EditInterventionPopupForm from './EditInterventionPopupForm';
import AddInterventionPopupForm from './AddInterventionPopupForm';




const Intervention = () => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  const [openPopup, setOpenPopup] = useState(false);
  const [openAddInterventionPopup, setOpenAddInterventionPopup] = useState(false);


const [selectedIntervention, setSelectedIntervention] = useState(null); // new state variable
  

    const getInterventions = e => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/interventions/`, {
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
      getInterventions()
    }, []);


const handleEditIntervention = (intervention) => {
  setSelectedIntervention(intervention);
};

// handle Delete intervention
const handleDeleteIntervention =async (interventionId) => {

  
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/intervention/${interventionId}/`,
    
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

  const newData = data.filter(item => item.id !== interventionId);
  setData(newData);
  setSelectedIntervention(null);
};

  


// display data table

    const displayData = data
    .filter(item => item.intervention_title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedStatus === '' || item.intervention_status === selectedStatus)
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.intervention_title}</td>
        <td>{item.intervention_date}</td>
        <td>{item.intervention_type}</td>
        <td>{item.intervention_status}</td>
        <td>{item.is_published}</td>
         <td>
           <button onClick={() =>  {handleEditIntervention(item); handleOpenEditIntervention();}}>Edit</button>
         </td>
         <td>
           <button onClick={() => handleDeleteIntervention(item.id)}>Delete</button>
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




// Update Intervention
const handleUpdateIntervention = async (intervention) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/interventions/${intervention.id}/`, intervention,
    
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



  const updatedIntervention = response.data;
  const index = data.findIndex((u) => u.id === updatedIntervention.id);
  const newData = [...data];
  newData[index] = updatedIntervention;
  setData(newData);
  setSelectedIntervention(null);
};


// handle buttons
const handleCancelEditIntervention = () => {
  setSelectedIntervention(null);
};

const handleOpenEditIntervention = () => {
  setOpenPopup(true);
};

const handleOpenAddIntervention = () => {
  setOpenAddInterventionPopup(true);
};
const handleCloseAddIntervention = () => {
  setOpenAddInterventionPopup(false);
};
    



  return (
    <div className="table_container">

        <div>
                  {selectedIntervention && (
                    <EditInterventionPopupForm
                      intervention={selectedIntervention}
                      onUpdateIntervention={handleUpdateIntervention}
                      onCancel={handleCancelEditIntervention}
                      onOpen = {openPopup}
                    />
                  )}         
          </div>
          <div>
                  {openAddInterventionPopup && (
                    <AddInterventionPopupForm                    
                      onCancel={handleCloseAddIntervention}
                      onOpen = {openAddInterventionPopup}
                    />
                  )}         
          </div>

      <div className="table-controls">
        <div className="search-input">
        <button onClick={() => handleOpenAddIntervention()}>Add Intervention</button>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
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



    </div>
  );
}

export default Intervention

