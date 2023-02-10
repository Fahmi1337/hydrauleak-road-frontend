import { Navigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom';
const PrivateRoute = ({element, ...rest }) => {

  


      
const [authenticated, setAuthenticated] = useState(false);
useEffect(() => {
    const isAuth = localStorage.getItem('token');
    if (isAuth){
    setAuthenticated(true);
}
  }, []);


    console.log ("is authentificated ya zebi",authenticated  )
    if (!authenticated) {
       <Navigate to="/login" />;
    }
  
    return (
      <Route {...rest} element={element} />
    );
  };

export default PrivateRoute;




// export default function PrivateRoute({ isAuthenticated, Component, ...rest }) {

//     const isLogged = isAuthenticated;

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return isLogged ? <Component/> : <Navigate to="/login" />;
// }