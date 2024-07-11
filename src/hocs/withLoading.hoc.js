import React, { Suspense } from 'react';
import { Loading } from '../loading';

export const withLoading = (Component) => {
  return (props) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};
