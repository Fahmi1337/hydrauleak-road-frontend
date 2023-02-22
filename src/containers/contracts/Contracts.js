import React, {useState, useEffect} from 'react';
import  { Helmet}  from "react-helmet";
import ContractForm from '../../components/ContractForm';
import ContractsList from '../../components/ContractsList';
// import Pagination from '../components/Pagination';
import Table from '../../components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Pagination from 'react-paginate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Contracts = () => {
  const [contracts, setcontracts] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [contractsPerPage, setContractsPerPage] = useState(3);
    // const [active, setActive] = useState(1);

    // const indexOfLastListing = currentPage * contractsPerPage;
    // const indexOfFirstListing = indexOfLastListing - contractsPerPage;
    // const currentcontracts = contracts.slice(indexOfFirstListing, indexOfLastListing);

    // const visitPage = (page) => {
    //     setCurrentPage(page);
    //     setActive(page);
    // };

    // const previous_number = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage-1);
    //         setActive(currentPage-1);
    //     }
    // };

    // const next_number = () => {
    //     if (currentPage !== Math.ceil(contracts.length/3)) {
    //         setCurrentPage(currentPage+1);
    //         setActive(currentPage+1);
    //     }
    // };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

   
    useEffect(() => {
      getContracts() 
    }, []);


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
    return (
        <main className='home table_container'>
            <Helmet>
                <title>Hydrauleak Road - Contracts</title>
                <meta
                    name='description'
                    content='hydrauleak Road Dashboard'
                />
            </Helmet>
            <section className='home__form'>
           
               
                <Button className="addContractBtn" variant="contained" color="success" onClick={() => {
                 handleOpen();  localStorage.setItem("currentContract",""); localStorage.setItem("ShowUpdateButton", false);;
             }}>Add Contract +</Button>
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
            </section>
            <section className='home__listings'>
            <div>
              <Table/>
      </div>
            </section>
            
        </main>
    );
};

export default Contracts