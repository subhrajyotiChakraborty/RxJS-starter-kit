import { Observable, Subscription, of, from, Subject } from "rxjs";
import { multicast } from "rxjs/operators";

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
}, 3000);

// Subject to multicast

const subject = new Subject<any>();

subject.subscribe({
    next: (x) => console.log("the value is A => ", x)
});

subject.subscribe({
    next: (x) => console.log("the value is B =>", x)
});

const fromObservable = from([1, 2, 3]);

fromObservable.subscribe(subject);


// Multicast Operator

const source = from([1, 2, 3]);
const subject1 = new Subject();
const multicasted = source.pipe(multicast(subject1));

// These are, under the hood, `subject1.subscribe({...})`:
multicasted.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
});
multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
});

// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();
