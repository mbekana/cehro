import React from 'react';
import { FaRegSadCry } from 'react-icons/fa';

const CustomErrorPage = ({ statusCode }: { statusCode: number }) => {
  let message = "Something went wrong!";
  if (statusCode === 404) message = "Page not found!";
  if (statusCode === 500) message = "Internal server error!";

  return (
    <div className="error-page">
      <div className="error-icon">
        <FaRegSadCry size={100} color="gray" />
      </div>
      <h1 className="error-message">{message}</h1>
      <p>Please try again or contact support if the issue persists.</p>
    </div>
  );
};

export default CustomErrorPage;
