let timer;
export const throttle = (time, action, ...actionParameters) => {
  if (timer) return;
  timer = setTimeout(() => {
    action(...actionParameters);
    clearTimeout(timer);
    timer = null;
  }, time);
};
