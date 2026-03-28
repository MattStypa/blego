export interface Record {
  readonly key: string;
  [prop: string]: unknown;
}

export declare class Store {
  constructor(records: Record[]);

  [Symbol.iterator](): Iterator<Record>;

  dd(): never;
  dump(): Store;

  all(): Record[];
  chunk(size: number): Record[][];
  count(): number;
  each(fn: (record: Record) => void): Store;
  filter(fn: (record: Record) => boolean): Store;
  get(key: string): Record;
  isEmpty(): boolean;
  keyed(): { [key: string]: Record };
  map<T>(fn: (record: Record) => T): T[];
  pluck(prop: string): unknown[];
  reverse(): Store;
  sort(fn: (a: Record, b: Record) => number): Store;
  sortBy(prop: string | ((record: Record) => unknown)): Store;
  take(size: number): Record[];
  where(prop: string, value: unknown): Store;

  linkToOne(relatedStore: Store, prop: string): void;
  linkToMany(relatedStore: Store, prop: string): void;
  linkFromOne(relatedStore: Store, relatedProp: string, prop: string): void;
  linkFromMany(relatedStore: Store, relatedProp: string, prop: string): void;
}

export interface Blego {
  data: { [key: string]: Store };
  global: { [key: string]: Record };

  init(): void;
  dd(...data: unknown[]): never;
  dump(...data: unknown[]): void;
  log(...messages: unknown[]): void;
  macro(name: string, fn: (...args: unknown[]) => unknown): void;
  page(path: string, templatePath: string, context: object): void;
  warn(...messages: unknown[]): void;
}

declare const blego: Blego;

export default blego;
