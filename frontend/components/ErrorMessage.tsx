import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #ffccc7;
  background-color: #fff2f0;
  color: #000000d9;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 2px;
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.5715;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  word-wrap: break-word;
  border-radius: 2px;
`;

const ErrorHeading = styled.h1`
  margin: 0;
  display: block;
  margin-bottom: 4px;
  color: #000000d9;
  font-size: 16px;
`;

const ErrorList = styled.ul`
  padding-left: 20px;
  margin-bottom: 0;
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
      {Array.isArray(message) ? (
        renderMessageArray(message)
      ) : (
        <p style={{ margin: 0 }}>{message}</p>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;
