//This code provides a basic form of react component named Home.It contains styled links which will act as buttons for navigation to, deme one, demo two , demo three. 


import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #A2D2DF;
  display: grid;
  place-items: center;
  place-content: center;
`

const StyledLink = styled(Link)`
  background: white;
  padding: 10px 20px;
  border-radius: 5px;
  color: black;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  margin: 10px 0;
  width: 150px;
  text-align: center;

`


const Home = () => {
  return (
   
  <Container>
  <h1>Puzzle Hunter</h1>
  <StyledLink to="/demone">Demone</StyledLink>
  <StyledLink to="/demotwo">Demotwo</StyledLink>
  <StyledLink to="/demothree">Demothree</StyledLink>
  </Container>

  )
}

export default Home