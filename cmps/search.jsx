const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM
export function SearchHeader() {
    const [searchTxt, setSearchTxt] = useState({ txt: '' })
    const [searchParams, setSearchParams] = useSearchParams()
    const debouncedSearchTerm = useDebounce(searchTxt, 500)
    useEffect(() => {}, [searchTxt])

  function handleSearch({ target }) {
    let { value } = target
    setSearchTxt((prevReview) => ({ ...prevReview, txt: value }))
  }

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setSearchParams({ q: searchTxt.txt })
      }
    },
    [debouncedSearchTerm] 
  )

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay)
        return () => {
          clearTimeout(handler)
        }
      },
      [value, delay] 
    )
    return debouncedValue
  }

  return (
    <section className='search'>
      <input type='text' placeholder='Search...' onChange={handleSearch} />
    </section>
  )
}