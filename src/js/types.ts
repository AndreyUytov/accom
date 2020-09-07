export interface HTMLProductsInterface {
  getElem(): HTMLElement
}

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export interface TaskInterface {
  taskId: number,
  taskValue: string,
  isDone: boolean
}

export interface ActionInterface {
  type: string,
  [propname:string]: any
}

export interface StoreInterface {
  getState(): {[propname: string]: any},
  subscribe(cb:()=>void): ()=>void,
  dispatch(action: ActionInterface): ActionInterface
}