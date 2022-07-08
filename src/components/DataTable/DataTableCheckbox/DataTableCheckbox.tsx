import React, { HTMLProps, useEffect, useRef } from 'react'

export const DataTableCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (ref.current?.indeterminate) {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }
  }, [ref, indeterminate, rest.checked])

  return <input type="checkbox" ref={ref} className={`${className} cursor-pointer`} {...rest} />
}
