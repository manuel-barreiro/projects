function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies?.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoMovieResults () {
  return (
    <p>No results for that search.</p>
  )
}

export function Movies ({ movies }) {
  // const hasMovies = movies.length > 0 !!!CHEQUEAR ESTO
  // const hasMovies = movies !== undefined

  return (
    movies
      ? (<ListOfMovies movies={movies} />)
      : (<NoMovieResults />)

  )
}
