
//This code defines a Demotwo puzzle game. The user is prompted to enter a 3-digit answer in a text area and submit it.

import React, { useState } from 'react';
import styled from 'styled-components'
import Mainbutton from '../components/Mainbutton';
import MyImage from '../assets/Q2.png'


const Container = styled.div`
  width: 100dvw;
  height: 100dvh;

  background:#F6EFBD ;
  display: grid;
  place-items: center;
  place-content: center;
`

const Card = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 300px;
  height: 60px;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
`;



const Button = styled.button`
  background: black;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  display: block;
`



const Demotwo = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>Correct! The answer is 315.</h1>
  }

  // Handles form submission

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    if (answer === '315') {
      setStatus('success');
      setError(null);
    } else {
      setStatus('typing');
      setError(new Error('Incorrect answer. Try again!'));
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (

    <Container>
      <h1>Number Puzzle</h1>
      <h2>Fill in the missing numbers in the order shown in the question.</h2>


      <Card>
        <img 
          src={MyImage}
          alt="Number puzzle" 
          style={{ width: '200px' }} 
        />
      </Card>


      <FormContainer onSubmit={handleSubmit}>
        <Textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          placeholder="Enter the answer as a single number, e.g., 311"
        />
        <Button disabled={answer.length !== 3 || status === 'submitting'}>
          Submit
        </Button>


        {error && (

          <p style={{ color: 'red', fontSize: '14px' }}>
            {error.message}
          </p>

        )}

      </FormContainer>
      <Mainbutton to="/">Home</Mainbutton>
    </Container>
  );
}

export default Demotwo