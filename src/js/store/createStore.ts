export default function createStore (reducer: (state: any, action: {type:string, [propname:string]: any}) => any, preloadedState?: any) {
  let currentState = preloadedState || {}
  let currentReducer = reducer
  let listeners = new Set<()=>void>()

  function getState() {
    return currentState
  }

  function subscribe(listener:()=>void) {
    listeners.add(listener)
  }

  function dispatch(action: {type:string, [propname:string]: any}) {
    currentState = currentReducer(currentState, action)

    for (let listener of listeners.values()){
      listener()
    }
  }

  dispatch({type: 'INIT'})

  return {
    getState,
    subscribe,
    dispatch
  }

}