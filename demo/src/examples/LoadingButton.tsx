import React, {useState, SyntheticEvent} from 'react'
import useMachine from '../dist'

const fetchPokemon = (id: string): Promise<any> =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(d => d.json())

const LoadingButton: React.FC = () => {
  const [called, setCalled] = useState(0)
  const [pokemonData, setPokemonData] = useState()
  const [pokemonId, setPokemonId] = useState(1)

  const {state, dispatch} = useMachine(
    {
      IDLE: {
        DATA_REQUESTED: {
          to: 'LOADING',
          effect: pokeId => {
            fetchPokemon(pokeId)
              .then(d => {
                setPokemonData(d)
                dispatch('DATA_SUCCESS')
              })
              .catch(() => {
                dispatch('DATA_ERROR')
              })
              .finally(() => setCalled(s => s + 1))
          },
        },
      },
      LOADING: {
        DATA_SUCCESS: 'SUCCESS',
        DATA_ERROR: 'ERROR',
      },
      SUCCESS: {
        RESET: {
          to: 'IDLE',
          effect: () => setPokemonData(null),
        },
      },
      ERROR: {
        RESET: 'IDLE',
      },
    },
    'IDLE',
  )

  const handlePokemonIdChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setPokemonId(Number(target.value))
  }

  const handlePokemonFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch({type: 'DATA_REQUESTED', payload: pokemonId})
  }

  return (
    <>
      Called: {called} times
      {state === 'SUCCESS' && (
        <div>
          <p>Name: {pokemonData.name}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
      {['IDLE', 'LOADING'].includes(state) && (
        <form onSubmit={handlePokemonFormSubmit}>
          <label>
            Pokemon:{' '}
            <input
              type="number"
              min="1"
              value={pokemonId}
              onChange={handlePokemonIdChange}
            />
          </label>

          <button type="submit" disabled={state === 'LOADING'}>
            load
          </button>
        </form>
      )}
      {['SUCCESS', 'ERROR'].includes(state) && (
        <button onClick={() => dispatch('RESET')}>reset</button>
      )}
    </>
  )
}

export default LoadingButton
