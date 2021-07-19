import React from 'React'

// import { CountContext } from './Global'

export const CountContext = React.createContext(null)

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


const CountProvider = ({ children, innerHTML, ...props }) => {
  console.log('props', props)
  const [products, setProducts] = React.useState(props.products || [])
  // const [state, dispatch] = React.useReducer(countReducer, props)

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  return (
    <CountContext.Provider value={products}>
      {children}
    </CountContext.Provider>
  )
}


export default CountProvider
