import React from 'react';

const Paragraph = ({ text, ...rest }) => {
  return (
    <p className="" {...rest}>
      {text}
    </p>
  );
};

export default Paragraph;
