export type StringKey<T> = keyof T extends string ? keyof T : never;
export type Action<T> = (props: T) => void;

export interface EmitterWrapper {
  on: <T extends object, TKey extends StringKey<T>>(event: TKey, fn: Action<T[TKey]>) => void;
  once: <T extends object, TKey extends StringKey<T>>(event: TKey, fn: Action<T[TKey]>) => void;
  off: <T extends object, TKey extends StringKey<T>>(event: TKey, fn: Action<T[TKey]>) => void;
  emit: <T extends object, TKey extends StringKey<T>>(event: TKey, payload: T[TKey]) => void;
}
