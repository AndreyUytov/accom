import { TaskInterface, ActionInterface } from './../types'

function counter(state: number = 0, action: {type: string, [propname:string]: any}) {
  switch (action.type) {
    case 'ADD_NEW_TASK':
     state++
     return state
    default:
      return state
  }
}

function tasks (state: TaskInterface [] = [], action: ActionInterface) {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return [...state, {
        taskId: action.id,
        taskValue: action.taskValue,
        isDone: false
      }]

    case 'CHECK_TASK':
      return state.reduce((result: TaskInterface[], elem) => {
        if (elem.taskId === action.id) {
          elem.isDone = action.isDone
          result.push(elem)
        } else result.push(elem)
        return result
      }, [])

    case 'REMOVE_TASK':
      return state.reduce((result: TaskInterface [], elem) => {
          if (elem.taskId !== action.id) {
            result.push(elem)
          }
          return result
        }, [])

    case 'REDACT_TASK':
      return state.reduce((result: TaskInterface [], elem) => {
        if (elem.taskId === action.id) {
          elem.taskValue = action.newValue
          result.push(elem)
        } else result.push(elem)
        return result
      }, [])

    case 'DO_ALL_TASKS_COMPLETE':
      return state.reduce((result: TaskInterface [], elem) => {
        if (elem.isDone !== true) {
          elem.isDone = true
          result.push(elem)
        } else result.push(elem)
        return result
      },[])

    case 'REMOVE_COMPLETE_TASKS':
      return state.reduce((result: TaskInterface [], elem) => {
        if (elem.isDone !== true) {
          result.push(elem)
        }
        return result
      }, [])

    default:
      return state
  }
}

export default function rootReducer (state: any = {}, action: ActionInterface) {
  return {
    counter: counter(state.counter, action),
    tasks: tasks(state.tasks, action)
  }
}