import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  background-color: lightgrey;
  padding: 20px;
  margin: 20px auto 0;
  max-width: 300px;

  h2 {
    margin-top: 0;
  }

  select, textarea {
    margin-bottom: 8px;
    width: 100%;
  }

  textarea {
    font-size: 16px;
  }
`;
