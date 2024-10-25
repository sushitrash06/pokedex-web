import * as React from 'react';

const Loading: React.FunctionComponent = () => {
  return (
    <div className="w-full flex justify-center">
      <img
        src="/path/to/pikachu-running.gif"
        alt="Loading"
        className="w-24 h-24 object-contain"
      />
    </div>
  );
};

export default Loading;
