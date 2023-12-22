import { useState } from 'react'

export const MovieFiles = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '9ff657e9ba056f368a835aee804db262'

  const [movie, setMovie] = useState('')
  const [list, setList] = useState([])
  const [message, setMessage] = useState('')
  
    const handleInputChange = (e) => {
    setMovie(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchList()
  }

  const fetchList = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${movie}&api_key=${API_KEY}`)
      const data = await response.json()
      console.log(data.results.length)
      if(data.results.length > 0) {
        setList(data.results)
        setMessage('')
      }
      else{
        setMessage("NOT FOUND")
        setList([])
      }
    }catch (error) {
      console.error("This Error: ", error)
    }

  }

  return (
    <div className="container">

      <h1 className="title">Movie Files</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write a movie...'
          value={movie}
          onChange={handleInputChange}
        />
        <button type='submit' className='search-button'>Search</button>
      </form>

      <h1>{message}</h1>

      <div className='movie-list'>
        {list.map( (movie) => (
          <div key={movie.id} className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p><strong>Release Date: </strong>{movie.release_date}</p>
            <p><strong>Vote Average ⭐: </strong>{movie.vote_average.toFixed(1)}</p>
            <p>{movie.overview}</p>
          </div>

        ))}

      </div>


    </div>

  )
  
}
