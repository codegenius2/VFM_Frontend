import React from 'react';
import Spinner from '../assets/images/Spinner.gif';

export const Loading = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <img className={`w-5 h-5 bg-no-repeat overflow-clip bg-cover`} src={Spinner} alt='spinner' />
    </div>
  );
};
