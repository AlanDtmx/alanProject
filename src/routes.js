import React from "react";
import { Route, BrowserRouter } from "react-router-dom";


import Inicio from "./Inicio.tsx";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Inicio }  path="/" exact />
       </BrowserRouter>
   )
} 

export default Routes;