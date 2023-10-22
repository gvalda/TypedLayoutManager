import Emitter from '@/services/emitter';
import { StringKey } from '@/types/eventEmitterTypes';

export const usePub =
  () =>
  <T extends object, TKey extends StringKey<T> = StringKey<T>>(event: TKey, payload: T[TKey]) =>
    Emitter.emit(event, payload);
