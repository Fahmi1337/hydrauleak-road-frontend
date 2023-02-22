import React, {useState} from 'react'
import axios from 'axios';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';



const ContractForm = () => {

    const [formData, setFormData] = useState({
        contract_title: '*',
        contract_description: '*',
        contract_type: 'Simple',
        contract_status: 'NotStart',
        contract_date: '',
        address: '*',
        city: '*',
        state: '*',
        zipcode: '*',

        is_published: 'false',


    });

    const { contract_title, contract_description, contract_type, contract_status, contract_date, address, city, state, zipcode, is_published } = formData;

    // const [loading, setLoading] = useState({false});

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});



    return (
    <div>ContractForm</div>
  )
}

export default ContractForm