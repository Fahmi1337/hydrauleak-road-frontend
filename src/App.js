import { Provider } from 'react-redux';
import store from './store';
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
//container
import Test from './containers/Test'
import Dashboard from './containers/Dashboard';
import UserManagement from './containers/userManagement/UserManagement';
import Login from './containers/login/Login';
import Signup from './containers/Signup';
import Contracts from './containers/Contracts'
// import ContractDetail from './containers/ContractDetail';
import Reports from './containers/reports/Reports'
import PostReport from './containers/reports/PostReport'
import Interventions from './containers/interventions/Interventions'
import ClientManagement from './containers/clientManagement/ClientManagment';

import AdminProfile from './containers/editProfiles/AdminProfile';

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


                    <Route exact path='/test' element={<Test/>} />

                    <Route path="/interventions" element={ !isToken ? <Navigate to="/login" /> : <Interventions/> }/>;
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