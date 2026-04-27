import React from 'react'

const Button = ({text,onClick, type = "button",className })=> {
  return (
<button
 onClick={onClick}
 type={type}
 className={`custom-btn ${className}`}
    style={{padding: '10px 20px', borderRadius: '5px'}}>
{text}
</button>
)
}

export default Button
