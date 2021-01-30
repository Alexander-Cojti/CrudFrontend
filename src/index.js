import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import jwt_decode from 'jwt-decode';
import AdalConfig from './config/AdalConfig'
import AuthContext from './services/Auth'
import GuestHeader from "./components/GuestHeader";
import UserHeader from "./components/UserHeader";


// AuthContext.handleWindowCallback()

// // Extra callback logic, only in the actual application, not in iframes in the app
// if ((window === window.parent) && window === window.top && !AuthContext.isCallback(window.location.hash)) {
//   // Having both of these checks is to prevent having a token in localstorage, but no user.
//   if (!AuthContext.getCachedToken(AdalConfig.clientId) || !AuthContext.getCachedUser()) {
//     // AuthContext.login()
//     // or render something that everyone can see
  
    ReactDOM.render(<App />, document.getElementById("root"));
//   } else {
    
//     AuthContext.acquireToken(AdalConfig.endpoints.api, (message, token, msg) => {
//       if (token) {
//         //   const emailRegex = /^[acojti]@\S+\.\S+\.\S+$/;
//           const admin="";
    
//         var decode = jwt_decode(token);

//         console.log("------", decode.unique_name);

//         if (decode.unique_name === admin)
//         {
//              ReactDOM.render(<GuestHeader/>, document.getElementById('root'))
//         }
//         else
//         {
//           ReactDOM.render(<UserHeader />, document.getElementById('root'))
//        }
//       }
//     })
//   }
// }

// serviceWorker.unregister();
 








