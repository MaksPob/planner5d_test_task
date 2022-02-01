export type Observer = <T>(arg: T) => void;


export class StoreObserver {
    observers: Observer[];

    constructor () {
        this.observers = [];
    }
  
    subscribe(fn: Observer): void {
        this.observers.push(fn);
    }
  
    unsubscribe(): void {
        this.observers = [];
    }
  
    emit<T>(data: T) {
        this.observers.forEach((subscriber: Observer) => subscriber(data));
    }
}
