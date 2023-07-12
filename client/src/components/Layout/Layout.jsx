import React, { Children } from "react";
import Footer from "../Footer";
import Header from "./Header";

const Layout = ({children}) =>{
return(
    <div>
        <Header/>
        <div className="content container-fluid">
            {children}
        </div>
        <Footer />
    </div>
);
};

export default Layout;