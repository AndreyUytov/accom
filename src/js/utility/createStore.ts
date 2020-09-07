export default function createStore (reducer: (state: any, action: {type:string, [propname:string]: any}) => any, preloadedState?: any) {
  let currentState = preloadedState || {}
  let currentReducer = reducer
  let listeners = new Set<()=>void>()

  function getState() {
    return currentState
  }

  function subscribe(listener:()=>void): () => void {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function dispatch(action: {type:string, [propname:string]: any}) {
    currentState = currentReducer(currentState, action)

    for (let listener of listeners.values()){
      listener()
    }
    return action
  }

  dispatch({type: 'INIT'})

  return {
    getState,
    subscribe,
    dispatch
  }

}