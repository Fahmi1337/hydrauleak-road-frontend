//needs
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//container
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Contracts from './containers/Contracts'
import ContractDetail from './containers/ContractDetail';
import Report from './containers/Report'
import Interventions from './containers/Interventions'
// import Activate from './containers/Activate';
// import ResetPassword from './containers/ResetPassword';
// import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
// import Facebook from './containers/Facebook';
// import Google from './containers/Google';

//components
import NotFound from './components/NotFound';

import Layout from './hocs/Layout';




import './sass/main.scss';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Dashboard/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/signup' element={<Signup/>} />
                    <Route exact path='/contracts' element={<Contracts/>} />
                    <Route exact path='/contract-detail' element={<ContractDetail/>} />
                    <Route exact path='/report' element={<Report/>} />
                    <Route exact path='/interventions' element={<Interventions/>} />
                    
                    
                    {/* <Route exact path='/facebook' element={<Facebook/>} />
                    <Route exact path='/google' element={<Google/>} /> 
                    <Route exact path='/reset-password' element={<ResetPassword/>} />
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />*/}
                    <Route component={NotFound} />
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;