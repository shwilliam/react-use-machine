import React, {useEffect} from 'react'
import useMachine from '../dist'

const LoadingButton: React.FC = () => {
  const {state, event, dispatch} = useMachine(
    {
      IDLE: {
        DATA_REQUESTED: 'LOADING',
      },
      LOADING: {
        DATA_SUCCESS: 'SUCCESS',
        DATA_ERROR: 'ERROR',
      },
      SUCCESS: {
        DATA_REQUESTED: 'LOADING',
      },
      ERROR: {
        DATA_REQUESTED: 'LOADING',
      },
    },
    'IDLE',
  )

  useEffect(() => {
    switch (event) {
      case 'DATA_REQUESTED':
        fetch('https://swapi.co/api/people/1')
          .then(d => d.json())
          .then(d => {
            console.log('data: ', d)
            dispatch('DATA_SUCCESS')
          })
          .catch(e => {
            console.log('err: ', e)
            dispatch('DATA_ERROR')
          })
        break
      default:
        break
    }
  }, [state, dispatch])

  return (
    <button
      onClick={() => dispatch('DATA_REQUESTED')}
      disabled={state === 'LOADING'}
    >
      load
    </button>
  )
}

export default LoadingButton
