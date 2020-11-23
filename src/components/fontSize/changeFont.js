import React from 'react'
import PropTypes from "prop-types";

import fontSizeContext from '../../contexts/fontSizeContext'

const ChangeFont=(props)=>{
    const{selectFont}=React.useContext(fontSizeContext);
    return(
        <button onClick={()=>selectFont(props.fontSizeName)}>
            {props.fontSizeName}
        </button>
    )
}

ChangeFont.propTypes={
    fontSizeName: PropTypes.string.isRequired
}

export default ChangeFont;