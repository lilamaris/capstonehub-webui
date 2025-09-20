export type Brand<T, B extends string> = T & { readonly __brand: B }
export type UUID = Brand<string, 'uuid'>
export type LocalDateTimeString = Brand<string, 'ldt'>
