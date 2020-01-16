import {useReducer} from 'react'

// machine
// {
//   STATE: {
//     EVENT: NEXT_STATE
//   }
// }
const useMachine = (machine, initial) => {
  const [state, dispatch] = useReducer(
    (s, e) => (machine[s] && machine[s][e]) || s,
    initial,
  )

  return [state, dispatch]
}

export default useMachine
