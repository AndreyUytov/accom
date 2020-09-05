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

function tasksReducer (state: any = {}, action: {type: string, [propname:string]: any}) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state, AdedTaskId: action.taskId
      }
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