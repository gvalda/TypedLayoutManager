import Emitter from '@/services/emitter';
import { StringKey } from '@/types/eventEmitterTypes';
import React from 'react';

export const useSub = <T extends object, TKey extends StringKey<T> = StringKey<T>>(
  event: TKey,
  callback: (props: T[TKey]) => void,
) => {
  const unsubscribe = () => Emitter.off(event, callback);

  React.useEffect(() => {
    Emitter.on(event, callback);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return unsubscribe;
};
