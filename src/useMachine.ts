import {useReducer, useState} from 'react'

const useMachine = (machine: IMachine, initialState: State): IRetVal => {
  const [event, setEvent] = useState()
  const [state, dispatch] = useReducer(
    (s: State, e: Event): State => {
      if (machine[s] && machine[s][e]) {
        setEvent(e)
        return machine[s][e]
      }
      setEvent(null)
      return s
    },
    initialState,
  )

  return {
    state, event, dispatch
  }
}

type State = string

type Event = string

interface IMachine {
  [state: string]: IEvent
}

interface IEvent {
  [event: string]: State
}

interface IRetVal {
  state: State,
  event: Event,
  dispatch: React.Dispatch<State>
}

export default useMachine
