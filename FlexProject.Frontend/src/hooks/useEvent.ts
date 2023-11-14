import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <F extends (...args: any[]) => any>(fn: F): F => {
  const { current } = React.useRef(fn);
  return current;
};
