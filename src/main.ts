import { Observable, Subscription, of } from "rxjs";

const observable = new Observable(subscriber => {
    subscriber.next(1);
    setTimeout(() => {
        subscriber.next(2);
        subscriber.complete();
    }, 1000);
});
console.log("Start");
const parentSubscription: Subscription = observable.subscribe({
    next(x) { console.log("Value is => ", (x)) },
    error(err) { console.log("Some error occurred ", err); },
    complete() { console.log("subscriber completed") }
});
console.log("End!!");

const childSubscription: Subscription = of(1, 2, 3).subscribe(value => console.log("child process value => ", value));

const subscription = parentSubscription.add(childSubscription);

setTimeout(() => {
    subscription.unsubscribe();
    console.log("unsubscribed both!!");
}, 3000)