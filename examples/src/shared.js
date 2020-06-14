import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato');

  html {
    background-color: #EBECEC;
    font-family: 'Lato', sans-serif;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const GitLink = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    height: 32px;
    margin-right: 10px;
    width: 32px;
  }
`;

export const Container = styled.div`
  border-radius: 10px;
  background-color: lightgrey;
  padding: 20px;
  margin: 0 20px 20px 20px;
  max-width: 300px;

  button {
    border-radius: 4px;
    font-size: 16px;
    padding: 8px;
    text-align: center;
    width: 100%;
  }

  h2 {
    margin-top: 0;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
  }

  select,
  textarea {
    font-size: 16px;
    margin-bottom: 12px;
    width: 100%;
  }

  textarea {
    border: 1px solid darkgrey;
    border-radius: 10px;
    padding: 8px;
    resize: none;
  }
`;
