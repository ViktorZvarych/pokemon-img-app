import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './App.css';
import Pagination from '@mui/material/Pagination';
import Footer from './Components/Footer'

export default function App() {
  let pokemonsNumberPerPage = useRef(8);

  const [allPokemonsCount, setAllPokemonsCount] = useState(null)
  const [pokemonsNumber, setPokemonsNumber] = useState(0);
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemon, setPokemon] = useState('');
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    // console.log(allPokemonsCount);
  }, [allPokemonsCount])

  useEffect(() => {
    // console.log(pokemonsNumber);
  }, [pokemonsNumber])

  useEffect(() => {
    // console.log(pokemonList);
  }, [pokemonList])

  useEffect(() => {
    // console.log(imgSrc);
  }, [pokemon])

  useEffect(() => {
    // console.log(pokemon);
  }, [imgSrc])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`)
      .then(response => setAllPokemonsCount(response.data.results.length.toString()))
  }, [])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonsNumber}&limit=${pokemonsNumberPerPage.current}`)
      // .then(response => console.log(response));
      .then(responseList => setPokemonList(responseList.data.results))
      .catch(error => console.error('Error fetching : PokemonList', error));
  }, [pokemonsNumber])

  useEffect(() => {
    if (pokemon) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        // .then(response => console.log(response));
        .then(response => setImgSrc(response.data.sprites.other['official-artwork'].front_shiny))
        .catch(error => console.error('Error fetching : PokemonList', error));
    }
  }, [pokemon])

  const onSubmitHandler = (e) => {
    setPokemon(e.target.innerHTML.toLowerCase())
  }

  const onChangePaginationPageHandler = (e, page) => {
    setPokemonsNumber(page * pokemonsNumberPerPage.current - pokemonsNumberPerPage.current);
    // console.log(page);
  }

  return (
    <>
      {
        pokemonList
        &&
        // IMAGE
        <div className='choosePokemon-container'>
          <div className='choosePokemon-img'>
            {
              pokemon
              &&
              <img src={imgSrc} alt={pokemon} />
            }
          </div>

          {/* POKEMON TITLE */}
          {
            pokemon
              ? <h2 className='title'>{pokemon}</h2>
              : <h2 className='title'>Choose pokemon</h2>
          }

          {/* PAGINATION */}
          {
            pokemonList
            &&
            <Pagination
              className='pagination'
              count={Math.ceil(allPokemonsCount / +pokemonsNumberPerPage.current)}
              shape="rounded"
              color='secondary'
              onChange={onChangePaginationPageHandler}
            />
          }

          {/* POKEMONS LIST */}
          <ul className='choosePokemon-buttons'>
            {
              pokemonList
              &&
              pokemonList.map((pokemonItem) => (
                <li key={pokemonItem.name}>
                  <button id={pokemonItem.name} onClick={onSubmitHandler}>{pokemonItem.name.toUpperCase()}</button>
                </li>
              ))
            }
          </ul>

          <Footer />
        </div>
      }
    </>
  )
}