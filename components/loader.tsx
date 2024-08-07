import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-pink/80 z-50">
    <div className="relative flex justify-center items-center">
      <div className="c-test c-01 absolute border-2 rounded-full"></div>
      <div className="c-test c-02 absolute border-2 rounded-full"></div>
      <div className="c-test c-03 absolute border-2 rounded-full"></div>
      <div className="c-test c-04 absolute border-2 rounded-full"></div>
    </div>
  </div>
);

export default Loader;
