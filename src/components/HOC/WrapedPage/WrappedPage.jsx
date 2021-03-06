import React from 'react';

import NavBar from 'components/Navbar/NavBar';
import Footer from 'components/Footer/Footer';

const WrappedPage = (ChildComponent) => {
    return(props) => {
        return ( 
            <>
                <NavBar/>
                    <ChildComponent {...props}/>
                <Footer/>
            </>
        );
    }
}
 
export default WrappedPage;