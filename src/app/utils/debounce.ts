// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <TArgs extends any[]>(func: (...args: TArgs) => any, delay: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
      timer = undefined;
    }, delay);
  };

  return debounced;
};
