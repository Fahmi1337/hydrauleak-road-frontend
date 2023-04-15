import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddMarkReport from './AddMarkReport'
import ReportPopup from './ReportPopup'
import PostReport from './PostReport';

const Reports = (props) => {
  
  const [selectedReport, setSelectedReport] = useState(null);

  const [data, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 3;
  const pagesVisited = pageNumber * itemsPerPage;
  const [openPopup, setOpenPopup] = useState(false);
  const [openSubmitReportPopup, setOpenSubmitReportPopup] = useState(false);
  const [openAddMarkReportPopup, setOpenAddMarkReportPopup] = useState(false);

  const style = {
    zoom:'70%',
    widht:'50rem',
    zIndex: 999,
   
  };
  const style2 = {
    zoom:'83.5%',
    zIndex: 999,
  };
  
  const handleOpenReportPopup = () => {
    setOpenPopup(true);
  };
  const getReports = e => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/reports/`, {
      headers: {
        'Authorization': 'Bearer ' +  localStorage.getItem("token")
      }
    })
    .then((res) => {
      setReportData(res.data);
})
.catch((err) => {
  console.log(err);
});
  }


  useEffect(() => {
    getReports()
  }, []);
  
  const handleCancelReport = () => {
    setSelectedReport(null);
  };
  const handleRowClick = (report) => {
    setSelectedReport(report);
    handleOpenReportPopup();
  };
  const handleCancelAddMarkReport = () => {
    setOpenAddMarkReportPopup(false);
    setSelectedReport(null);
  };
  const handleOpenAddMarkReport = () => {
    setOpenAddMarkReportPopup(true);
  };

  // handle Delete user
const handleDeleteUser =async (reportId) => {
  const confirmation = window.confirm('Are you sure you want to delete this report?');

  if (!confirmation) {
    return;
  }
  
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/reports/${reportId}/`,
    
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

  const newData = data.filter(report => report.id !== reportId);
  setReportData(newData);
  // setSelectedUser(null);
};


// display data table
  const displayData = [...data].reverse()
  .filter(report => report.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(report => selectedRole === '' || report.user_role === selectedRole)
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map(report => (
    <tr key={report.id} >
         <td>{report.id}</td>
         <td>{report.user_name}</td>
         <td>{report.user_role}</td>
         <td>{report.report_date}</td>
         <td>{report.subject}</td>
         <td>{report.message}</td>
         <td>
           <button onClick={() => {handleOpenAddMarkReport(); setSelectedReport(report);}}>Add Mark</button>
         </td>
         <td ><button onClick={() => handleRowClick(report)}>Details</button></td>
  
       <td className='tableDeleteTd'> 
          <DeleteIcon onClick={() =>  handleDeleteUser(report.id)}/>
          
         </td>
    </tr>
  ));
  const pageCount = Math.ceil(data.length / itemsPerPage);


  const handleOpenSubmitReport = () => {
    setOpenSubmitReportPopup(true);
  };
  const handleCloseSubmitReport = () => {
    setOpenSubmitReportPopup(false);
  };
  
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

  const renderReportDetails = () => {
    if (!selectedReport) {
      return null;
    }

    return (
      <div>
      {selectedReport && (
        <ReportPopup
        selectedReport={selectedReport}
         
          onCancel={handleCancelReport}
          onOpen = {openPopup}
        />
      )}         
      </div>
     
    );
  };
  return (
    <div className="table_container">



      <Modal
            open={openAddMarkReportPopup}
            // onClick={handleClose}
            onClose={props.onCloseAddMark}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
              >
            <Box sx={style2}>
            {openAddMarkReportPopup && (
                        <AddMarkReport
                        handleCancelAddMarkReport={handleCancelAddMarkReport}                   
                        selectedReport={selectedReport}
                        
                      />
                      )}        
          
            </Box>
      </Modal>

      <Modal
        open={openSubmitReportPopup}
            
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          {openSubmitReportPopup && (
            <PostReport handleCloseSubmitReport= {handleCloseSubmitReport} />
          )}
        </Box>
      </Modal>



      <div>
      <div className="pageTitleContainer">  <h1>Reports</h1></div>
      <div id="addTableButtonContainer"> <button onClick={() => handleOpenSubmitReport()}>+ Submit Report</button></div>
        <div className="table-controls">
          <div className="search-input">
          {/* <button onClick={() => handleOpenAddUser()}>Add User</button> */}
            <label htmlFor="search">Search:</label>
            <input placeholder='Search...' type="text" id="search" value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="role-filter">
            <label htmlFor="role-filter">Filter by role:</label>
            <select id="status-filter" value={selectedRole} onChange={handleRoleFilterChange}>
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
              <th>Sender Name</th>
              <th>Sender Role</th>
              <th>Report Send Date</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Add Mark</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {renderTableRows()} */}
            {displayData}
          </tbody>
        </table>
        {renderReportDetails()}


        
      </div>
  
    <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'pagination'}
        previousLinkClassName={'paginationlink'}
        nextLinkClassName={'paginationlink'}
        disabledClassName={'paginationlink--disabled'}
        activeClassName={'paginationlink--active'}
      />
    </div>
  );
};

export default Reports;
