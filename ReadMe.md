[tao-react-client](https://github.com/noviKorisnik/tao-react-client#readme)
___
### snapshot005
## one bugfix
I noticed a warning at console with the following text:
```
Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
```
And OK, as instructed, changes are made in selects of book and chapter components - warning is gone and the code itself looks somehow nicer.
## keyed navigation
Driven with idea to use arrow buttons as event which turns book pages...

... in App component the following is added:
``` js
const navDispatcher = (e) => {
    if (e.altKey) return;
    const direction =
        e.code === 'ArrowLeft' ? 'prev'
        : e.code === 'ArrowRight' ? 'next'
        : null;
    if (direction !== null) {
        document.dispatchEvent(
            new CustomEvent('navigate', { detail: { direction: direction } })
        );
    };
}
```
As intented to be used with some key event, to map left arrow key as instruction to go on the previous book page and right arrow key as trigger for the next book page. We have check on use of alt key, since the same buttons with pressed alt key already have navigational behavior (moving through history), so this story will go only without alt key.

And, if we have some arrow, we dispatch custom event with info on which direction we want to turn page now. We'll need to listen for this event on some other place, where we know better what to do with it, but, later...

Well, presented like this, we just have some new name not in use... OK, we put in use in the following way:
``` js
  useEffect(() => {
    document.addEventListener('keydown', navDispatcher);
    return () => { document.removeEventListener('keydown', navDispatcher); };
  });
```
Now we have adding listener to keydown event. When some key is down, navDispatcher is called with event info (and if alt is not pressed and some good arrow is...).

Here we added listener with useEffect. Now, besides adding listener there is return something... to remove the same listener before the next call. That is the way how subscriptions are handled with hooks - without that, tested, we get multiplication of listeners and guaranteed memory leak.

I like how is here neat to handle on the same spot both subscribe and unsubscribe process for the single event, and we can have many useEfect declarations, each to handle one specific task with it's full lifecycle. In contrast, with traditional react lifecycle methods we had all subscriptions declared in one method (called like componentDidMount) and, again all of them unsubscribed in another method (componentWillUnmount).
## navigator
Just one more component, set inside app router, with nothing visual, but to take care of our custom navigation.

It uses custom hook **_useNav_** to update page location on **_navigate_** event is dispatched. Hook uses useEffect too add and remove listener on navigate and bind event to **_handler_**. Function navigate provides address of the new page in given direction based on current location...
___
| [Previous](https://github.com/noviKorisnik/tao-react-client/tree/snapshot004#readme) | [Home](https://github.com/noviKorisnik/tao-react-client#readme) | [Next](https://github.com/noviKorisnik/tao-react-client/tree/snapshot006#readme) |
| :-: | :-: | :-: |
___
