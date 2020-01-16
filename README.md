# useMachine

> A small finite-state machine helper hook

## Installation

```shell
$ npm i react-use-machine
```

## Usage

The following example demonstrates how to use the `useMachine` hook in an example button component that fetches data on click:

```jsx
import React from 'react'
import useMachine from 'react-use-machine'

const LoadingButton = () => {
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
```

## Development

To start local development, simply install npm dependencies (`npm i`) and run `npm run build:watch` to watch ts files in `src/`. Built files can be found in `dist/`.

## Demo

To run the demo, ensure you have run the build script and have a `dist` dir in your project root. Then run `npm run demo:setup` to copy these to the demo and `npm run demo` to start it locally.

## Contributing

This project is open to and encourages contributions! Feel free to discuss any bug fixes/features in the [issues](https://github.com/shwilliam/react-use-machine/issues). If you wish to work on this project:

1. Fork [this project](https://github.com/shwilliam/react-use-machine)
2. Create a branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/react-use-machine/pull/new/master)
