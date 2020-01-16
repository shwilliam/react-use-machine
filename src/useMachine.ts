import {useReducer} from 'react'

const useMachine = (machine: IMachine, initialState: State): [State, React.Dispatch<State>] => {
  const [state, dispatch] = useReducer(
    (s: State, e: Event): State => (machine[s] && machine[s][e]) || s,
    initialState,
  )

  return [state, dispatch]
}

type State = string

type Event = string

interface IMachine {
  [state: string]: IEvent
}

interface IEvent {
  [event: string]: State
}

export default useMachine
