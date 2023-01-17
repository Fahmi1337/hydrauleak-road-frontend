import React from 'react'

const Interventions = () => {
  return (
    <div>Interventions</div>
  )
}

export default Interventions


// import React, {useState} from 'react';
// import  { Helmet}  from "react-helmet";
// import ContractForm from '../components/ContractForm';
// import ContractsList from '../components/ContractsList';
// import Pagination from '../components/Pagination';


// const Contracts = () => {
//   const [contracts, setcontracts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [contractsPerPage, setContractsPerPage] = useState(3);
//     const [active, setActive] = useState(1);

//     const indexOfLastListing = currentPage * contractsPerPage;
//     const indexOfFirstListing = indexOfLastListing - contractsPerPage;
//     const currentcontracts = contracts.slice(indexOfFirstListing, indexOfLastListing);

//     const visitPage = (page) => {
//         setCurrentPage(page);
//         setActive(page);
//     };

//     const previous_number = () => {
//         if (currentPage !== 1) {
//             setCurrentPage(currentPage-1);
//             setActive(currentPage-1);
//         }
//     };

//     const next_number = () => {
//         if (currentPage !== Math.ceil(contracts.length/3)) {
//             setCurrentPage(currentPage+1);
//             setActive(currentPage+1);
//         }
//     };

//     return (
//         <main className='home'>
//             <Helmet>
//                 <title>Hydrauleak Road - Contracts</title>
//                 <meta
//                     name='description'
//                     content='hydrauleak Road Dashboard'
//                 />
//             </Helmet>
//             <section className='home__form'>
//                 <ContractForm setcontracts={setcontracts} />
//             </section>
//             <section className='home__listings'>
//                 <ContractsList contracts={currentcontracts} />
//             </section>
//             <section className='home__pagination'>
//                 <div className='row'>
//                     {
//                         contracts.length !== 0 ? (
//                             <Pagination
//                                 itemsPerPage={contractsPerPage}
//                                 count={contracts.length}
//                                 visitPage={visitPage}
//                                 previous={previous_number}
//                                 next={next_number}
//                                 active={active}
//                                 setActive={setActive}
//                             />
//                         ) : null
//                     }
//                 </div>
//             </section>
//         </main>
//     );
// };

// export default Contracts