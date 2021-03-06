import React from 'react';

import style from 'components/Templates/PageSectionWrapper/PageSectionWrapper.module.scss';

const PageSectionWrapper = ({ children, title, id }) => {
    const { wrapper, wrapper_title } = style;

    return ( 
        <div className={wrapper} id={id}>
            {title && <h3 className={wrapper_title}>{title}</h3>}
            {children}
        </div>
     );
}
 
export default PageSectionWrapper;