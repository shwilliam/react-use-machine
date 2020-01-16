import {useReducer} from 'react'

const useMachine = (machine, initial) => {
  const [state, dispatch] = useReducer(
    (s, e) => (machine[s] && machine[s][e]) || s,
    initial,
  )

  return [state, dispatch]
}

export default useMachine
