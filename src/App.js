import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://pokeapi.co/api/v2/pokemon'
  )
  const [prevPageUrl, setPrevPageUrl] = useState('')
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setPokemons(response.data.results.map((item) => item.name))
        setPrevPageUrl(response.data.previous)
        setNextPageUrl(response.data.next)
        setLoading(false)
      })

    return () => {
      cancel()
    }
  }, [currentPageUrl])

  const getNextPage = () => {
    if (nextPageUrl !== null) setCurrentPageUrl(nextPageUrl)
  }

  const getPrevPage = () => {
    if (prevPageUrl !== null) setCurrentPageUrl(prevPageUrl)
  }

  if (Loading) return 'Loading...'
  return (
    <>
      <PokemonList pokemons={pokemons} />
      <Pagination
        getPrevPage={getPrevPage}
        isPrevDisabled={prevPageUrl === null ? true : false}
        getNextPage={getNextPage}
        isNextDisabled={nextPageUrl === null ? true : false}
      />
    </>
  )
}
export default App
