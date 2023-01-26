import React from 'react';
import Navbar from '../components/Navbar';
import { Sidebar } from '../containers/sidebar';

const layout = (props) => (
    <div>
        <Navbar />
        <Sidebar />
        {props.children}
    </div>
);

export default layout;