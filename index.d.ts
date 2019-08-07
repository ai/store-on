type DataTypes<Map, Key extends keyof Map> =
    Map extends never ? [any?] : (Map[Key] extends (never | undefined) ? [never?] : [Map[Key]])

declare namespace createStore {
  export type Dispatch<EventsDataTypesMap> = (<Event extends keyof EventsDataTypesMap>(
      event: Event, ...data: DataTypes<Partial<EventsDataTypesMap>, Event>) => void) & {___events: EventsDataTypesMap};

  export interface Store<State = unknown, EventsDataTypesMap = any> {
    readonly on: <Event extends keyof EventsDataTypesMap>(
      event: Event,
      handler: (state: Readonly<State>, data: EventsDataTypesMap[Event]) => Partial<State> | Promise<void> | null | void
    ) => () => void;
    readonly dispatch: Dispatch<EventsDataTypesMap>;
    readonly get: () => State;
  }

  export type Module<State, EventsDataTypesMap = any> = (store: Store<State, EventsDataTypesMap>) => void;

  export interface StoreonEvents<State> {
    '@init': never;
    '@changed': State;
  }
}

declare function createStore<State, EventsDataTypesMap = any>(
    modules: Array<createStore.Module<State, EventsDataTypesMap> | false>
): createStore.Store<State, EventsDataTypesMap & createStore.StoreonEvents<State>>;

export = createStore;
