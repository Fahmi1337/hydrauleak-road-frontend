import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';


const Reports = () => {
  
  const [selectedReport, setSelectedReport] = useState(null);

  const [data, setReportData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

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
  

  const handleRowClick = (report) => {
    setSelectedReport(report);
  };


  // handle Delete user
const handleDeleteUser =async (reportId) => {

  
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
  const displayData = data
  .filter(report => report.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(report => selectedRole === '' || report.roles === selectedRole)
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map(report => (
    <tr key={report.id}  onClick={() => handleRowClick(report)}>
         <td>{report.id}</td>
         <td>{report.user.name}</td>
         <td>{report.user.roles}</td>
         <td>{report.report_date}</td>
         <td>{report.subject}</td>
         <td>{report.message}</td>
       <td>
         <button onClick={() => handleDeleteUser(report.id)}>Delete</button>
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

  const renderReportDetails = () => {
    if (!selectedReport) {
      return null;
    }

    return (
      <div className="report-details-popup">
        <h2>{selectedReport.subject}</h2>
        <p>description: {selectedReport.message}</p>
        <p>Report Date: {selectedReport.report_date}</p>
        <p>Add Sensor Coordinates: {selectedReport.add_sensor_coordinates.join(', ')}</p>
        <p>Add Mark Coordinates: {selectedReport.add_mark_coordinates.join(', ')}</p>
        <p>Add Pipe Coordinates: {selectedReport.add_pipe_coordinates.join(', ')}</p>
        <p>Add Pipe Access Coordinates: {selectedReport.add_pipe_access_coordinates.join(', ')}</p>
      </div>
    );
  };
  return (
    <>
      <div>
        <h1>Reports</h1>
        <div className="table-controls">
          <div className="search-input">
          {/* <button onClick={() => handleOpenAddUser()}>Add User</button> */}
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
              <th>Sender Name</th>
              <th>Sender Role</th>
              <th>Report Send Date</th>
              <th>Subject</th>
              <th>Description</th>
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
};

export default Reports;
