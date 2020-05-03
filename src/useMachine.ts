import {useReducer, useRef} from 'react'

const parseEvent = (action: Action): Event =>
  typeof action === 'string' ? action : action.type

const callEffectIfExists = (state: IStateObj, action: Action) => {
  if (typeof state.effect === 'function') {
    const effectPayload = typeof action !== 'string' && action?.payload

    state.effect(effectPayload)
  }
}

const useMachine = (machine: IMachine, initialState: State): IRetVal => {
  const eventRef = useRef('')

  const [state, dispatch] = useReducer((s: State, action: Action): State => {
    const event = parseEvent(action)

    if (machine[s] && machine[s][event]) {
      eventRef.current = event
      const nextState = machine[s][event]

      if (typeof nextState === 'string') return nextState

      callEffectIfExists(nextState, action)
      return nextState.to
    }

    return s
  }, initialState)

  return {
    state,
    event: eventRef.current,
    dispatch,
  }
}

type State = string

interface IStateObj {
  to: string
  effect: (args?: any) => any
}

type Event = string

interface EventObj {
  type: Event
  payload?: any
}

type Action = EventObj | Event

interface IMachine {
  [state: string]: IEvent
}

interface IEvent {
  [event: string]: State | IStateObj
}

interface IRetVal {
  state: State
  event: Event
  dispatch: React.Dispatch<Action>
}

export default useMachine
