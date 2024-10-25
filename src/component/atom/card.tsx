import React from 'react';

interface CardBoxProps {
  children: React.ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({ children }) => {
    return (
      <div className=" w-36 h-44 flex flex-col items-center justify-center min-w-['40px'] rounded-lg">
        {children}
      </div>
    );
  };

export default CardBox;
