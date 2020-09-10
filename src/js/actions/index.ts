import { ActionInterface } from "../types"


export const checkTaskActionCreator = (id:number, isDone: boolean): ActionInterface => ({
  type: 'CHECK_TASK',
  id,
  isDone
})

export const removeTaskActionCreator = (id: number): ActionInterface => ({
  type: 'REMOVE_TASK',
  id
})

export const addTaskActionCreator = (id: number, taskValue: string): ActionInterface => ({
  type: 'ADD_NEW_TASK',
  taskValue,
  id
})

export const redactTaskActionCreator = (id: number, newValue: string): ActionInterface => ({
  type: 'REDACT_TASK',
  id,
  newValue
})

export const removeAllCompleteActionCreator = (): ActionInterface => ({
  type: 'REMOVE_COMPLETE_TASKS'
})

export const doAllTasksCompleteAction = (): ActionInterface => ({
  type: 'DO_ALL_TASKS_COMPLETE'
})