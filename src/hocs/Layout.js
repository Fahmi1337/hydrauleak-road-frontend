import React from 'react';
import Navbar from '../components/navbar/Navbar';
// import { Sidebar } from '../components/navbar/sidebar';

const layout = (props) => (
    <div>
        <Navbar />
        {props.children}
    </div>
);

export default layout;