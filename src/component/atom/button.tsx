import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  Title?: string;
  type?: 'main' | 'transparent' | 'warning';
  onPress: () => void;
  Icon?: ReactNode;
}

const ButtonComponent: FC<ButtonProps> = ({ Title, Icon, type = 'main', onPress }) => {
  const buttonClass = getButtonClass(type);

  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${buttonClass}`}
      onClick={onPress}
    >
      {Icon}
      <span>{Title}</span>
    </button>
  );
};

const getButtonClass = (type: ButtonProps['type']) => {
  switch (type) {
    case 'main':
      return 'bg-green-500 text-white hover:bg-green-600';
    case 'transparent':
      return 'bg-transparent text-black hover:bg-gray-100';
    case 'warning':
      return 'bg-orange-500 text-white hover:bg-orange-600';
    default:
      return 'bg-green-500 text-white hover:bg-green-600';
  }
};

export default ButtonComponent;
