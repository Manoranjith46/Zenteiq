import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.warn('Failed to read localStorage', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
    } catch (error) {
      console.warn('Failed to write localStorage', error)
    }
  }, [key, initialValue])

  return [value, setValue]
}
