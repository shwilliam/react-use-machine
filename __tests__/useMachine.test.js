import {renderHook, act} from '@testing-library/react-hooks'
import useMachine from '../dist'

const TOGGLE_MACHINE_INITIAL = 'INACTIVE'

describe('useMachine', () => {
  let RETVAL
  let ON_ACTIVATE = jest.fn()

  beforeEach(() => {
    RETVAL = renderHook(() =>
      useMachine(
        {
          ACTIVE: {
            TOGGLE: 'INACTIVE',
          },
          INACTIVE: {
            TOGGLE: {
              to: 'ACTIVE',
              effect: ON_ACTIVATE,
            },
          },
        },
        TOGGLE_MACHINE_INITIAL,
      ),
    ).result
    ON_ACTIVATE = jest.fn()
  })

  afterEach(() => {
    RETVAL = null
    ON_ACTIVATE = null
  })

  test('sets initial state', () => {
    expect(RETVAL.current.state).toBe(TOGGLE_MACHINE_INITIAL)
  })

  test('transitions state on event dispatch', () => {
    expect(RETVAL.current.state).toBe(TOGGLE_MACHINE_INITIAL)

    act(() => {
      RETVAL.current.dispatch('TOGGLE')
    })

    expect(RETVAL.current.state).toBe('ACTIVE')
  })

  test('calls effect on state transition', () => {
    const ON_ACTIVATE_PAYLOAD = 42

    expect(RETVAL.current.state).toBe(TOGGLE_MACHINE_INITIAL)

    act(() => {
      RETVAL.current.dispatch({type: 'TOGGLE', payload: ON_ACTIVATE_PAYLOAD})
    })

    expect(ON_ACTIVATE).toBeCalledWith(ON_ACTIVATE_PAYLOAD)

    expect(RETVAL.current.state).toBe('ACTIVE')
  })

  test('maintains state on invalid event dispatch', () => {
    expect(RETVAL.current.state).toBe(TOGGLE_MACHINE_INITIAL)
    expect(RETVAL.current.event).toBe('')

    act(() => {
      RETVAL.current.dispatch('INVALID_EVENT')
    })

    expect(RETVAL.current.state).toBe(TOGGLE_MACHINE_INITIAL)
    expect(RETVAL.current.event).toBe('')
  })
})
