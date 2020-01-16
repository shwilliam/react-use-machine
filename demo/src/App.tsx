import React, {useEffect} from 'react'
import useMachine from './dist'

const App: React.FC = () => {
  const [state, dispatch] = useMachine(
    {
      IDLE: {
        CLICK: 'DATA_REQUESTED',
        MOUSE_ENTER: 'HOVERING',
      },
      HOVERING: {
        CLICK: 'DATA_REQUESTED',
        MOUSE_LEAVE: 'IDLE',
      },
      DATA_REQUESTED: {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
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
    switch (state) {
      case 'DATA_REQUESTED':
        // load data
        setTimeout(
          () => dispatch(Math.random() > 0.5 ? 'SUCCESS' : 'ERROR'),
          500,
        )
        break
      default:
        break
    }
  }, [state, dispatch])

  return (
    <main>
      <p>state: {state}</p>

      {['IDLE', 'HOVERING', 'DATA_REQUESTED'].includes(state) ? (
        <button
          onMouseEnter={() => dispatch('MOUSE_ENTER')}
          onMouseLeave={() => dispatch('MOUSE_LEAVE')}
          onClick={() => dispatch('CLICK')}
          disabled={state === 'DATA_REQUESTED'}
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

export default App;
