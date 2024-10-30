import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background-color: #BC7C7C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 10; 
  text-decoration: none;
`;

const Mainbutton = ({ to, children }) => {
  return (
    <StyledButton to={to}>{children}</StyledButton>
  )
}

export default Mainbutton