import {useEffect, useRef} from 'react';

export function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Copied from https://overreacted.io/making-setinterval-declarative-with-react-hooks/#:~:text=up%20an%20interval.-,useEffect(()%20%3D%3E%20%7B%20function%20tick()%20%7B,(See%20the%20CodeSandbox%20demo.)
export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }