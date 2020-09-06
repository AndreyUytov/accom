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