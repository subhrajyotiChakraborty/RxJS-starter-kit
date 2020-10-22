import { Observable } from "rxjs";

const observable = new Observable(subscriber => {
    subscriber.next(1);
    setTimeout(() => {
        subscriber.next(2);
        subscriber.complete();
    }, 1000);
});
console.log("Start");
observable.subscribe({
    next(x) { console.log("Value is => ", (x)) },
    error(err) { console.log("Some error occurred ", err); },
    complete() { console.log("subscriber completed") }
});
console.log("End!!");