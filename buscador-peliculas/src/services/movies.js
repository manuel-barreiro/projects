const API_KEY = 14142394

export async function searchMovies ({ search }) {
  if (search === '') return null

  try {
    // setResponseMovies(withResults)
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const data = await res.json()
    const movies = data.Search
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
