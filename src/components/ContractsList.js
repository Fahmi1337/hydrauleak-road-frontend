import React from 'react'
import Card from './Card';

const ContractsList = (contracts) => {
  const getContracts = () => {
      let contractsOnPage = [];
      let result = [];

      contracts.map(listing => {
          return contractsOnPage.push(
              
                 listing.contract_title
                  // address={listing.address}
                  // city={listing.city}
                  // state={listing.state}
                  // price={listing.price}
                  // sale_type={listing.sale_type}
                  // home_type={listing.home_type}
                  // bedrooms={listing.bedrooms}
                  // bathrooms={listing.bathrooms}
                  // sqft={listing.sqft}
                  // photo_main={listing.photo_main}
                  // slug={listing.slug}
              
          );
      });

      for (let i = 0; i < contracts.length; i += 3) {
          result.push(
              <div className='row'>
                  <div className='col-1-of-3'>
                      {contractsOnPage[i]}
                  </div>
                  <div className='col-1-of-3'>
                  {contractsOnPage[i+1] ? contractsOnPage[i+1] : null}
                  </div>
                  <div className='col-1-of-3'>
                  {contractsOnPage[i+2] ? contractsOnPage[i+2] : null}
                  </div>
              </div>
          );
      }

      return result;
  };

  return (
      <div>
          {getContracts()}
      </div>
  );
}


export default ContractsList















