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

export type CheckBoxAction = (id: number, isDone: boolean) => void
export type RedactAction = (id: number, value: string) => void
export type RemoveAction = (id: number) => void

export type addTaskAction = (newTextValue: string) => void

export interface GUIFactory {
  header: UniverseElement
  headerTitle: UniverseElement
  headerSubTitle: UniverseElement

  main: UniverseElement

  taskCreatorSection: UniverseElement
  taskCreatorSectionWrapper: UniverseElement
  taskCreatorSectionLabel: LabelElement
  taskCreatorSectionInput: InputElement

  taskSection: UniverseElement
  taskSectionTaskList: UniverseElement
  taskItem: LiElement
  taskLabel: LabelElement
  taskCheckBox: InputElement
  taskCheckBoxMarker: SpanElement
  taskValue: UniverseElement
  taskRedactBtn: ButtonElement
  taskDeleteBtn: ButtonElement
  taskModalInput: InputElement

  footer: UniverseElement
  footerLeftSection: UniverseElement
  footerRightSection: UniverseElement
  footerLeftSectionWrapper: UniverseElement
  footerCompleteBtn: ButtonElement
  footerRemoveCompleteBtn: ButtonElement
  footerTotalTask: UniverseElement
  footerTotalCompleteTask: UniverseElement
}

export interface UniverseElement {
  elem: HTMLElement
}

export interface InputElement {
  elem: HTMLInputElement
}

export interface LiElement {
  elem: HTMLLIElement
}

export interface LabelElement {
  elem: HTMLLabelElement
}

export interface SpanElement {
  elem: HTMLSpanElement
}

export interface ButtonElement {
  elem: HTMLButtonElement
}

