function createStore(reducer) {
    //the store should have four parts
    //1. the state tree
    //2. Get the state
    //3. Listen to changes on the state
    //4. Update the state

    let state;
    let listeners = [];

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        // return () => {
        //     listeners = listeners.filter((l) => l !== listener)
        // }
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}