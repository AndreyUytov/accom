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
  Saturday,
}

export interface TaskInterface {
  taskId: number
  taskValue: string
  isDone: boolean
}

export interface ActionInterface {
  type: string
  [propname: string]: any
}

export interface StoreInterface {
  getState(): { [propname: string]: any }
  subscribe(cb: () => void): () => void
  dispatch(action: ActionInterface): ActionInterface
}

export type CheckBoxAction = (id: number, isDone: boolean) => void
export type RedactAction = (id: number, value: string) => void
export type RemoveAction = (id: number) => void

export type addTaskAction = (newTextValue: string) => void

export interface GUIFactory {
  header: HTMLElement
  headerTitle: HTMLElement
  headerSubTitle: HTMLElement

  main: HTMLElement

  taskCreatorSection: HTMLElement
  taskCreatorSectionWrapper: HTMLElement
  taskCreatorSectionLabel: HTMLLabelElement
  taskCreatorAddBtn: HTMLButtonElement
  taskCreatorSectionInput: HTMLInputElement

  taskSection: HTMLElement
  taskSectionTaskList: HTMLElement
  taskItem: HTMLLIElement
  taskLabel: HTMLLabelElement
  taskCheckBox: HTMLInputElement
  taskCheckBoxMarker: HTMLElement
  taskValue: HTMLElement
  taskRedactBtn: HTMLButtonElement
  taskDeleteBtn: HTMLButtonElement
  taskModalInput: HTMLInputElement

  footer: HTMLElement
  footerLeftSection: HTMLElement
  footerRightSection: HTMLElement
  footerLeftSectionWrapper: HTMLElement
  footerCompleteBtn: HTMLButtonElement
  footerRemoveCompleteBtn: HTMLButtonElement
  footerTotalTask: HTMLElement
  footerTotalCompleteTask: HTMLElement
}
