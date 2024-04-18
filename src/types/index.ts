export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type EntityCondition<T> = {
  [P in keyof T]?: T[P] | T[P][] | undefined;
};

export type MaybeType<T> = T | undefined;

export type NullableType<T> = T | null;

export type OrNeverType<T> = T | never;

export type MapValuesToKeysIfAllowed<T> = {
  [K in keyof T]: T[K] extends PropertyKey ? K : never;
};

export type Filter<T> = MapValuesToKeysIfAllowed<T>[keyof T];

export type ConvertCamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${ConvertCamelCase<P3>}`
    : Lowercase<S>;

export type CamelCase<T> = {
  [K in keyof T as ConvertCamelCase<string & K>]: T[K];
};