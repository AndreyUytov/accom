import { TaskInterface, ActionInterface } from './../types'

function probaReducer(state: any = {}, action: {type: string, [propname:string]: any}) {
  switch (action.type) {
    case 'DELETE_TASK':
      return {
        ...state, deleteTaskId: action.taskId
      }
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
    probaReducer: probaReducer(state.probaReducer, action),
    tasks: tasks(state.tasks, action)
  }
}