import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: #ffe4e2;
  color: #b82500;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 2px;
`;

const ErrorHeading = styled.h1`
  font-size: 18px;
  margin: 10px 0;
`;

const ErrorList = styled.ul`
  padding-left: 20px;
  li:first-letter {
    text-transform: capitalize;
  }
`;

type ErrorMessageProps = {
  message: string | string[];
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const renderMessageArray = (errors: string[]) => {    
    const constraints = errors.map((constraint, idx) => (
      <li key={idx}>{constraint}</li>
    ));
    return <ErrorList>{constraints}</ErrorList>;
  };

  return (
    <ErrorContainer>
      <ErrorHeading>Oops!</ErrorHeading>
      {Array.isArray(message) ? renderMessageArray(message) : <p>{message}</p>}
    </ErrorContainer>
  );
};

export default ErrorMessage;
