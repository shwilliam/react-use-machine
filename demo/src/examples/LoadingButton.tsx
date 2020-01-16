import React, {useEffect} from 'react'
import useMachine from '../dist'

const LoadingButton: React.FC = () => {
  const [state, dispatch] = useMachine(
    {
      IDLE: {
        DATA_REQUESTED: 'LOADING',
      },
      LOADING: {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
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
    switch (state) {
      case 'LOADING':
        fetch('https://swapi.co/api/people/1')
          .then(d => d.json())
          .then(d => {
            console.log('data: ', d)
            dispatch('SUCCESS')
          })
          .catch(e => {
            console.log('err: ', e)
            dispatch('ERROR')
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
