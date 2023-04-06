import React from 'react';
import Navbar from '../components/navbar/Navbar';
// import { Sidebar } from '../components/navbar/sidebar';

const layout = (props) => (
    <div className='appContainer'>


      <div >  <Navbar /></div>
      <div >   {props.children}</div>

      
     
    </div>
);

export default layout;