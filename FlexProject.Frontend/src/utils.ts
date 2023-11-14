export const typedObjectKeys = <T extends object, TKey extends keyof T>(obj: T) =>
  Object.keys(obj) as [TKey, ...TKey[]];

export const toAction = <R extends Promise<void>>(actionPromise: (() => R) | R) =>
  void (typeof actionPromise === 'function' ? actionPromise() : actionPromise).catch(console.error);
