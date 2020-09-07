import { TaskInterface } from './../types'

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

function tasksReducer (state: any [] = [], action: {type: string, [propname:string]: any}) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state, AdedTaskId: action.taskId
      }
    case 'REMOVE_TASK':
      return state.reduce((result: TaskInterface [], elem: TaskInterface) => {
          if (elem.taskId !== action.taskId) {
            result.push(elem)
          }
          return result
        }, [])
    case 'DO_ALL_TASKS_COMPLETE':
      return state.reduce((result: TaskInterface [], elem: TaskInterface) => {
        if (elem.isDone !== true) {
          elem.isDone = true
          result.push(elem)
        } else result.push(elem)
        return result
      },[])
    case 'REMOVE_COMPLETE_TASKS':
      return state.reduce((result: TaskInterface [], elem: TaskInterface) => {
        if (elem.isDone !== true) {
          result.push(elem)
        }
        return result
      }, [])
    default:
      return state
  }
}

export default function rootReducer (state: any = {}, action: {type: string, [propname:string]: any}) {
  return {
    probaReducer: probaReducer(state.probaReducer, action),
    tasksReducer: tasksReducer(state.tasksReducer, action)
  }
}