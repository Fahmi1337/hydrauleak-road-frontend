import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Rings } from 'react-loader-spinner';
import PropTypes from 'prop-types';



const ContractForm = (props) => {
    useEffect(() => {
        getContractsById() 
      }, []);
    const [ContractById, SetContractById] = useState([]);
    // console.log("MY API", ContractById.contract_title);
    const [formData, setFormData] = useState({
       
    });

 

    const { contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, client, is_published } = formData;
    
   
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

const ShowUpdateButton = localStorage.getItem("ShowUpdateButton") !== 'true';
// console.log("show update button?", ShowUpdateButton);
const [clients, setClients] = useState([]);
   
  
useEffect(() => {
    getClients() 
  }, []);


   const getClients = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/clients/`,
          {
            method: "GET",
    
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then((response) => response.json())
          .then((data) => setClients(data));
    return response;
      } catch (error) {
        console.log(error);
      }
    };
    


    const onSubmit = () => {
       
        
       
        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json"
        };

        // setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/contracts/`, { contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, client, is_published}, 
        {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
    }})
        .then(res => {
         
            // props.setContracts(res.data);
            window.scrollTo(0, 0);
            getContracts();
        })
        .catch(err=>{
           
            window.scrollTo(0, 0);
            getContracts();
        })
        getContracts();
getContracts();
    };
    

    const UpdateContract = async () => {
      const id=localStorage.getItem("currentContract").split(",")[0];
      
         console.log("MY ID", localStorage.getItem("currentContract").split(",")[0]);
         
         
         const token = localStorage.getItem('token');
        axios.defaults.headers = {
            "Content-Type": "application/json"
        };

        // setLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/api/contracts/${id}/`, { contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, client, is_published}, 
        {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
    }})
        .then(res => {
          
            // props.setContracts(res.data);
            window.scrollTo(0, 0);
            getContracts();
        })
        .catch(err=>{
         
            window.scrollTo(0, 0);
            getContracts();
        })
        getContracts();
getContracts();
       };

       const getContractsById = async () => {
        const id=localStorage.getItem("currentContract").split(",")[0];
        console.log("MY ID", localStorage.getItem("currentContract").split(",")[0]);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/contracts/${id}/`,
            {
              method: "GET",
      
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
            .then((response) => response.json())
            .then((data) => SetContractById(data));
      return response;
        } catch (error) {
          console.log(error);
        }
      };

    const { getContracts} = props;
    
    // if(!data) return <Rings />
   
    return (
    <>
    <form className='listingform'  >
        <div className='row'>
            <div className='col-1-of-6'>
                <div className='listinform__section'>
                    <label className='listingform__label' htmlFor='contract_title'>Contract Title</label>
                    <input 
                        className='listingform__input'
                        type='title'
                        placeholder='Contract Title' id='contract_title'
                        name='contract_title' value={formData.contract_title || ContractById.contract_title}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_description'>Description</label>
                        <input 
                        className='listingform__input'
                        type='text'
                        placeholder='Contract Description'
                        name='contract_description' value={formData.contract_description || ContractById.contract_description}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_type'>Contract Type</label>
                        <select className='listingform__select' name='contract_type' onChange={e => onChange(e)} value={formData.contract_type || ContractById.contract_type}>
                            <option>Hight</option>
                            <option>Simple</option>
                            <option>PipeSearch</option>
                        </select>
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_status'>Contract Status</label>
                        <select className='listingform__select' name='contract_status' onChange={e => onChange(e)} value={formData.contract_status || ContractById.contract_status}>
                            <option>NotStart</option>
                            <option>Pending</option>
                            <option>Completed</option>
                        </select>
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_date'>Contract Date</label>
                        <input 
                        className='listingform__input'
                        type="date"
                        placeholder='Contract Date'
                        name='contract_date' value={formData.contract_date || ContractById.contract_date}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='address'>Address</label>
                        <input 
                        className='listingform__input'
                        type='text'
                        placeholder='Address'
                        name='address' value={formData.address || ContractById.address}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='city'>City</label>
                        <input 
                        className='listingform__input'
                        type='text'
                        placeholder='City'
                        name='city' value={formData.city || ContractById.city}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='state'>State</label>
                        <input 
                        className='listingform__input'
                        type='input'
                        placeholder='State'
                        name='state' value={formData.state || ContractById.state}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='zipcode'>Zipcode</label>
                        <input 
                        className='listingform__input'
                        type='input'
                        placeholder='Zipcode'
                        name='zipcode' value={formData.zipcode || ContractById.zipcode}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>
            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='client'>Client</label>
                     
                        <select className='listingform__select' name='client' onChange={e => onChange(e)} value={formData.client || ContractById.client}>
                        {clients.results?.map(client => (
              <option key={client.id} value={client.id}>{client.user.name}</option>
            ))}
                            
                        </select>
                </div>
            </div>
            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='is_published'>Is Published</label>
                      

<select className='listingform__select' name='is_published' onChange={e => onChange(e)} value={formData.is_published || ContractById.is_published} required>
                            <option>Not Published</option>
                            <option>Published</option>
                            
                        </select>
                </div>                 
            </div>

            <div className='col-1-of-6'>
                {!ShowUpdateButton ?
                    <div className='listingform__loader'>
                        <Rings
                            type="Oval"
                            color="424242"
                            height={50}
                            width={50}
                        />


                    </div>:
                    
                   
                    <input 
                    className='listingform__button listingform__button--primary'
                    type = "button" 
                    onClick={onSubmit} 
                    value = "Submit" 
                />
                }   
 {ShowUpdateButton ?
                    <div className='listingform__loader'>
                       


                    </div>:
                    
                   
                    <input 
                    className='listingform__button listingform__button--primary'
                    type = "button" 
                    onClick={UpdateContract} 
                    value = "Update" 
                />
                }   

            </div>
        </div> 
    </form>
    </>
  );
};


ContractForm.propTypes = {
    getContracts: PropTypes.func.isRequired,
   
};

export default ContractForm;