import React, { FC, HTMLProps, useEffect, useRef } from 'react';

export const DataTableCheckbox: FC<{ indeterminate?: boolean } & HTMLProps<HTMLInputElement>> = ({
  indeterminate,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (ref.current?.indeterminate) {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }
  }, [ref, indeterminate, rest.checked]);

  return <input type='checkbox' ref={ref} className={`${className} cursor-pointer`} {...rest} />;
};
