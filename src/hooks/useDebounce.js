import React from 'react'

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value)
    }, delay);

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounced

}