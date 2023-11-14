import React from 'react';

export const useCancel = (deps: React.DependencyList) => {
  let cancelled = false;
  React.useEffect(
    () => () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cancelled = true;
    },
    deps,
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(() => cancelled, deps);
};
