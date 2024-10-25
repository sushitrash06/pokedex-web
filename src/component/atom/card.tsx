import React from 'react';

interface CardBoxProps {
  children: React.ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({ children }) => {
  return (
    <div className="w-36 h-44 flex items-center rounded-lg bg-red-600">
      {children}
    </div>
  );
};

export default CardBox;
