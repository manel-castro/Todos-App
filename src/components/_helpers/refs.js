import { useEffect } from "react";

export const useEventListener = (
  target,
  type,
  listener,
  debounceTime = false,
  ...options
) => {
  useEffect(() => {
    //eslint-disable-next-line
    const targetIsRef = target.hasOwnProperty("current");
    const currentTarget = targetIsRef ? target.current : target;
    let time = 0;
    if (debounceTime) time = debounceTime;
    if (currentTarget) {
      var timer = setTimeout(() => {
        currentTarget.addEventListener(type, listener, ...options);
        console.log(...options);
        //        return () => clearTimeout(timer);
      }, time);
    }
    return () => {
      clearTimeout(timer);
      currentTarget.removeEventListener(type, listener, ...options);
    };
  }, [target, type, listener, options]);
};

export const scrollDetect = () => {
  let last_known_scroll_position = 0;
  let ticking = false;

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        ticking = false;
      });

      ticking = true;
    }
  });
};
