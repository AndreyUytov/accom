export function rootReducer(state: any = {}, action: {type: string, [propname:string]: any}) {
  switch (action.type) {
    case 'DELETE_TASK':
      console.log('work!')
      return {
        ...state, deleteTaskId: action.taskId
      }
    default:
      return state
  }
}