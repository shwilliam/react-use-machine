import React, {useEffect} from 'react'
import useMachine from '../dist'

const HoverableLoadingButton: React.FC = () => {
  const {state, event,dispatch} = useMachine(
    {
      IDLE: {
        DATA_REQUESTED: 'LOADING',
        MOUSE_ENTER: 'HOVERING',
      },
      HOVERING: {
        DATA_REQUESTED: 'LOADING',
        MOUSE_LEAVE: 'IDLE',
      },
      LOADING: {
        DATA_SUCCESS: 'SUCCESS',
        DATA_ERROR: 'ERROR',
      },
      SUCCESS: {
        RETRY: 'IDLE',
      },
      ERROR: {
        RETRY: 'IDLE',
      },
    },
    'IDLE',
  )

  useEffect(() => {
    switch(event) {
      case 'DATA_REQUESTED':
      // load data
      setTimeout(
        () => dispatch(Math.random() > 0.5 ? 'DATA_SUCCESS' : 'DATA_ERROR'),
        500,
      )
        break
      default:
        break
    }
  }, [state, event, dispatch])

  return (
    <main>
      <p>state: {state}</p>

      {['IDLE', 'HOVERING', 'LOADING'].includes(state) ? (
        <button
          onMouseEnter={() => dispatch('MOUSE_ENTER')}
          onMouseLeave={() => dispatch('MOUSE_LEAVE')}
          onClick={() => dispatch('DATA_REQUESTED')}
          disabled={state === 'LOADING'}
        >
          load data
        </button>
      ) : null}

      {state === 'SUCCESS' && (
        <button onClick={() => dispatch('RETRY')}>fetch again</button>
      )}

      {state === 'ERROR' && (
        <button onClick={() => dispatch('RETRY')}>retry</button>
      )}
    </main>
  )
}

export default HoverableLoadingButton
