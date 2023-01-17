import React, {useState} from 'react'
import axios from 'axios';
import { Rings } from 'react-loader-spinner';
import PropTypes from 'prop-types';



const ContractForm = (props) => {

    const [formData, setFormData] = useState({
        contract_title: '',
        contract_description: '',
        contract_type: 'Simple',
        contract_status: 'NotStart',
        contract_date: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',

        is_published: 'false',


    });

    const { contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, is_published } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventdefault();

        axios.defaults.headers = {
            "Content-Type": "application/json"
        };

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/contracts/search`,{ contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, is_published })
        .then(res => {
            setLoading(false);
            props.setContracts(res.data);
            window.scrollTo(0, 0);
        })
        .catch(err=>{
            setLoading(false);
            window.scrollTo(0, 0);

        })

    };

    return (
    <>
    <form className='listingform' onSubmit={ e=> onSubmit(e)} >
        <div className='row'>
            <div className='col-1-of-6'>
                <div className='listinform__section'>
                    <label className='listingform__label' htmlFor='contract_title'>Contract Title</label>
                    <input 
                        className='listingform__input'
                        type='title'
                        placeholder='Contract Title'
                        name='contract_title' value={contract_title}
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
                        name='contract_description' value={contract_description}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_type'>Contract Type</label>
                        <select className='listingform__select' name='contract_type' onChange={e => onChange(e)} value={contract_type}>
                            <option>Hight</option>
                            <option>Simple</option>
                            <option>PipeSearch</option>
                        </select>
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='contract_status'>Contract Status</label>
                        <select className='listingform__select' name='contract_status' onChange={e => onChange(e)} value={contract_type}>
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
                        type='date'
                        placeholder='Contract Date'
                        name='contract_date' value={contract_date}
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
                        name='address' value={address}
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
                        name='city' value={city}
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
                        name='state' value={state}
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
                        name='zipcode' value={zipcode}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>
            </div>

            <div className='col-1-of-6'>
                <div className='listinform__section'>
                        <label className='listingform__label' htmlFor='is_published'>Is Published</label>
                        <input 
                        className='listingform__checkbox'
                        type='checkbox'
                        placeholder='Is Published'
                        name='is_published' value={true}
                        onChange={e => onChange(e)}
                        required
                        />
                </div>                 
            </div>

            <div className='col-1-of-6'>
                {loading ?
                    <div className='listingform__loader'>
                        <Rings
                            type="Oval"
                            color="424242"
                            height={50}
                            width={50}
                        />


                    </div>:
                    <button className='listingform__button listingform__button--primary'>Save</button>
                }              
            </div>
        </div> 
    </form>
    </>
  );
};


ContractForm.propTypes = {
    setContracts: PropTypes.func.isRequired
};

export default ContractForm;