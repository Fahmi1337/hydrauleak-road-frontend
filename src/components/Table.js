import React, { useState, useEffect  } from 'react';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ContractForm from '../components/ContractForm';
import Button from '@mui/material/Button';

import Pagination from "react-js-pagination";


export default function Table () {
  const [data, setcontracts] = useState([]);
  
 
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getContracts = async () => {
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contracts/`,
        {
          method: "GET",
  
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setcontracts(data));
  return response;
    } catch (error) {
      console.log(error);
    }
   
  };


  useEffect(() => {
   
    getContracts();
  }, []);




  const handlePageChange = (page) => {
    setCurrentPage(page);
}
const totalItems = data.length;
const pageStart = (currentPage - 1) * postsPerPage;
const pageEnd = pageStart + postsPerPage;




const currentData = data
.filter((data) => {
  if (search === "") {
    return data;
  } 
  else if (
    data.contract_title.toLowerCase().includes(search.toLowerCase()) 
  ) {
    return data;
  }
  return false;
})
.slice(pageStart, pageEnd)
.map((data) => {
  return (
   data
  );
});






  const DeleteContract = async (e) => {
    try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/contracts/${e}/`,
            {
              method: "DELETE",
    
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
    
          if (res.status === 200 || res.status === 201) {
            console.log("success");
          } else {
            console.log("failed");
          }
        } catch (error) {
          console.log(error);
        }
        getContracts();
      };
      function ChildModal() {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
      
        return (
          <React.Fragment>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Text in a child modal</h2>
                <p id="child-modal-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <Button onClick={handleClose}>Close Child Modal</Button>
              </Box>
            </Modal>
          </React.Fragment>
        );
      }
console.log("current posts?", data);

return (
  <div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '80%' }}>
        <ContractForm getContracts={getContracts} />
          <ChildModal />
        </Box>
      </Modal>
  <div className="pagination-container">
  <input
      type="text"
      placeholder="Search for contract"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>
  
  
      <table>
        <thead>
          <tr>
          <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
              <th>Published</th>
              <th>Client</th>
              <th>Update</th>
              <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {currentData
              .filter(data =>
                data.contract_title.toLowerCase().includes(search.toLowerCase())
              )
              .map(data => (
                <tr key={data.id}>
                   <td>{data.id}</td>
                  <td >{data.contract_title}</td>
                  <td>{data.contract_description}</td>
                  <td>{data.contract_type}</td>
                  <td>{data.contract_status}</td>
                  
                  <td>{data.contract_date}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>{data.zipcode}</td>
                  <td>{data.is_published}</td>
                  <td>{data?.client?.user?.name}</td>
                  <td>  <button  onClick={() => {
              localStorage.setItem("currentContract", data.id); localStorage.setItem("ShowUpdateButton", true);  handleOpen();
            }}>Update</button></td>
                  <td><button  onClick={() => {
               
               DeleteContract(data.id);
             }}>Delete</button></td>
          
                </tr>
              ))}
        </tbody>
      </table>
    
    <div>
 

<div className="pagination-container">
<Pagination
                    activePage={currentPage}
                    itemsCountPerPage={postsPerPage}
                    totalItemsCount={totalItems}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    innerClass='pagination'
                    activeClass='active'
                    linkClass='link'
                />  </div>
            </div>

    
  </div>
);
};

