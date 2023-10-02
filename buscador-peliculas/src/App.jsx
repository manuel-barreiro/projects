import './App.css'
// import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState, useEffect, useRef } from 'react'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía.')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número.')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            placeholder='Avengers, Star Wars, The Matrix ...'
            name='query'
            onChange={handleChange}
            value={search}
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>

    </div>
  )
}

export default App
