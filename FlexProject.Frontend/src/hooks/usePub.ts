import Emitter from '@/services/emitter';
import { StringKey } from '@/types/commonTypes';

export const usePub =
  <T extends object>() =>
  <TKey extends StringKey<T>>(event: TKey, payload: T[TKey]) =>
    Emitter.emit(event, payload);
