import Emitter from '@/services/emitter';
import { Action, StringKey } from '@/types/commonTypes';
import React from 'react';

export const useSub = <T extends object, TKey extends StringKey<T> = StringKey<T>>(
  event: TKey,
  callback: Action<T[TKey]>,
  deps: React.DependencyList,
) => {
  const unsubscribe = () => Emitter.off(event, callback);

  React.useEffect(() => {
    Emitter.on(event, callback);
    console.log('Subscribed to', event);

    return () => {
      unsubscribe();
      console.log('Unsubscribed from', event);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return unsubscribe;
};
