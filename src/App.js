import { Provider } from 'react-redux';
import store from './store';
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
//container

import Test from './containers/Test'
import Test2 from './containers/Test2'
import Test3 from './containers/Test3'

import Dashboard from './containers/Dashboard';
import UserManagement from './containers/userManagement/UserManagement';
import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';

// import Contracts from './containers/Contracts'
import Contracts from './containers/contracts/Contracts'
// import ContractDetail from './containers/ContractDetail';
import Reports from './containers/reports/Reports'
import PostReport from './containers/reports/PostReport'
import Interventions from './containers/interventions/Interventions'
import AddZoneIntervention from './containers/interventions/AddZoneIntervention'
import ClientManagement from './containers/clientManagement/ClientManagment';

import AdminProfile from './containers/editProfiles/AdminProfile';
import LeakerProfile from './containers/editProfiles/LeakerProfile';
import ClientProfile from './containers/editProfiles/ClientProfile';
import axios from 'axios';
// import Activate from './containers/Activate';
// import ResetPassword from './containers/ResetPassword';
// import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
// import Facebook from './containers/Facebook';
// import Google from './containers/Google';

//components
import NotFound from './components/NotFound';

import Layout from './hocs/Layout';

// import PrivateRoute from './components/PrivateRoute'




// import './sass/main.scss';
import "./index.css";

const NoLayout = ({children}) => {
    return (
      <>
        {children}
      </>
    );
  }; 

const App = () => {

// //CHECK ME START
const [me, setMe] = useState([]);


// const getMe = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/user/me`,
//         {
//           method: "GET",
  
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => setMe(data));
//   return response;
//     } catch (error) {
//       console.log(error);
//     }
//   };


// useEffect(() => {
//     getMe();
//     console.log("token me ", me.messages.message )
//    if(me.messages.message.includes("invali")){
//     localStorage.removeItem('token');
//    }
//   }, [me]);



    const [isToken, setIsToken]= useState(true)

    useEffect(() => {
      
        const token = localStorage.getItem('token');

        if (token) {
            setIsToken(true)
            
        }
        else{
            setIsToken(false)
        }

      }, [isToken]);
      console.log("this is the auth",isToken )
//TOKEN MANAGEMENT END
        return(
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    
                    <Route path="/" element={ !isToken ? <Navigate to="/login" /> : <Dashboard/> }/>;
                    <Route path="/contracts" element={ !isToken ? <Navigate to="/login" /> : <Contracts/> }/>;
                    <Route path="/user-management" element={ !isToken ? <Navigate to="/login" /> : <UserManagement/> }/>;
                    <Route path="/client-management" element={ !isToken ? <Navigate to="/login" /> : <ClientManagement/> }/>;

                    <Route path="/admin-profile" element={ !isToken ? <Navigate to="/login" /> : <AdminProfile/> }/>;
                    <Route path="/leaker-profile" element={ !isToken ? <Navigate to="/login" /> : <LeakerProfile/> }/>;
                    <Route path="/client-profile" element={ !isToken ? <Navigate to="/login" /> : <ClientProfile/> }/>;

                    <Route exact path='/test' element={<Test/>} />
                    <Route exact path='/test2' element={<Test2/>} />
                    <Route exact path='/test3' element={<Test3/>} />

                    <Route path="/interventions" element={ !isToken ? <Navigate to="/login" /> : <Interventions/> }/>;
                    <Route path="/add-zone-intervention" element={ !isToken ? <Navigate to="/login" /> : <AddZoneIntervention/> }/>;
                   
                    <Route path="/reports" element={ !isToken ? <Navigate to="/login" /> : <Reports/> }/>;
                    
                    <Route path="/post-report" element={ !isToken ? <Navigate to="/login" /> : <PostReport/> }/>;

                    <Route exact path='/login' element={<NoLayout><Login /></NoLayout>} />
                    <Route exact path='/signup' element={<NoLayout><Signup /></NoLayout>} />
                    

                    {/* <Route exact path='/facebook' element={<Facebook/>} />
                    <Route exact path='/google' element={<Google/>} /> 
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />*/}
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
    )}
;

export default App;